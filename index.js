// All Imports 
// Libraries
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
// Functions
const {authorizeClient,listSpreadsheets , batchUpdateSheet ,getSheetData, deleteSpreadsheets , makeCopyOfSheet , batchGetSheetData} = require('./google_sheets/sheet_ops');
const {getFormDataValues, prepareDataForSheets, prepareGeneralInputDataForSheets, getDataForSheetWithForm , transform_form_data_in_template_data} = require('./helper');

// File Imports
const User = require('./models/userModel');
const default_inputs = require('./default_inputs/form_inputs');


// Initialize Express and MongoDB
const app = express();
const port = 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const mongourl = process.env.MONGO_DB_URI

// Top Level Configurations
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.set("strictQuery", false);
mongoose.connect(mongourl);
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Database Connected"));



app.get('/', (req, res) => {
    res.redirect('/internal/home');
})


app.get('/internal/home', (req, res) => {
    page_info = {
        title: 'Home',
        content: 'This is the home page'
    }
    res.render('index');
})


// Set up session
app.use(session({
    secret: 'the_secret_is_secret',  // Use a secure secret key
    resave: false,
    saveUninitialized: true
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth 2.0 strategy with Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    // Storing the user's profile data (e.g., email)
    return done(null, profile);
  }
));

// Serialize and deserialize user (for session handling)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// API to initiate Google Sign-In
app.get('/internal/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// API to handle Google Sign-In callback
app.get('/internal/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            const email = req.user.emails[0].value;
            const name = req.user.displayName;

            // Check if user already exists
            let existingUser = await User.findOne({ email: email });

            if (!existingUser) {
                // If user does not exist, create a new user
                const newUser = new User({
                    email: email,
                    name: name,
                    spreadsheet_id: null
                });
                await newUser.save();
            }

            // On successful sign-in, store the user's email in a cookie or session
            res.cookie('user_email', email);
            res.cookie('user_name', name);
            res.redirect('/');  // Redirect the user to home page or wherever you want
        } catch (error) {
            console.error('Error during authentication callback:', error);
            res.redirect('/');
        }
    }
);



// Route to log out
app.get('/internal/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.clearCookie('user_email'); // Clear the cookie on logout
        res.redirect('/');
    });
});;



// Now the real logic of your application can go here

// Create Templates 
/**
 * The logic will be like
 * First Check is there any spreadsheet id 
 * If not then create a new spreadsheet and store the id in the user model
 * and create a template if the name is not unique return a error message
 * Now in the user model we will have a array of templates
 * in array templates we need to store template_name and template_data
 * template_data string will be a json string
 */


app.post('/internal/create_template', async (req, res) => {
    const { template_name, user_email } = req.body;
    console.log(req.body);
    email = user_email;
    console.log(`Received request to create template with name: ${template_name} for email: ${email}`);
    
    const user_data = await User.findOne({ email: email });
    if (!user_data) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' ,status:400});
    }

    if (user_data.spreadsheet_id === null) {
        // Create a new spreadsheet
        const sheet_name = `Copy_for_${email}`;
        const { driveService } = await authorizeClient();
        const spreadsheet_id = await makeCopyOfSheet(driveService, sheet_name);
        user_data.spreadsheet_id = spreadsheet_id;
        user_data.spredsheet_name = sheet_name;
        await user_data.save();
        console.log(`Created new spreadsheet with ID: ${spreadsheet_id} for user: ${email}`);
    }

    const template_data = user_data.template_data || [];
    const templateExists = template_data.some(template => template.template_name === template_name);

    if (templateExists) {
        console.log('Template name already exists');
        return res.status(400).json({ message: 'Template name already exists' ,status:400});
    }

    const new_template_data = {
        "form_status": default_inputs.default_form_status,
        "form_inputs": default_inputs.default_form_inputs,
    };

    // If template name does not exist, add the new template
    template_data.push({ template_name: template_name, template_data: JSON.stringify(new_template_data), timestamp: new Date().toISOString() });
    user_data.template_data = template_data;
    await user_data.save();
    console.log(`Template ${template_name} created successfully for user: ${email}`);
    return res.status(200).json({ message: 'Template created successfully' ,status:200});
});

// Get Templates
app.get('/internal/get_user_assets/:email', async (req, res) => {
    const email = req.params.email;
    console.log(`Received request to get user assets for email: ${email}`);
    const user = await User.findOne({ email: email });
    if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
    }

    const template_data = user.template_data || [];
    
    if (template_data.length === 0) {
        console.log('No templates exist');
        return res.status(200).json({ message: 'No templates exist', template_data: [] });
    }

    const templates = template_data
        .map(template => ({
            template_name: template.template_name,
            timestamp: template.timestamp
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    console.log('Templates found');
    return res.status(200).json({ message: 'Templates found', template_data: templates });
    })

// Delete Template

app.get('/internal/delete_template/:email/:template_name', async (req, res) => {
    const { template_name, email } = req.params;
    console.log(`Received request to delete template with name: ${template_name} for email: ${email}`);
    const user_data = await User.findOne({ email: email });
    if (!user_data) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
    }
    const template_data = user_data.template_data || [];
    const templateIndex = template_data.findIndex(template => template.template_name === template_name);
    if (templateIndex === -1) {
        console.log('Template not found');
        return res.status(400).json({ message: 'Template not found' });
    }
    template_data.splice(templateIndex, 1);
    user_data.template_data = template_data;
    await user_data.save();
    console.log(`Template ${template_name} deleted successfully for user: ${email}`);
    return res.status(200).json({ message: 'Template deleted successfully',status:'success'});
})

app.get('/internal/template/:template_name' , async (req,res)=>
{
    const { template_name } = req.params;
    return res.render('template',{ message: 'Template found', template_name:template_name});
})


app.get('/internal/get_template_data/:email/:template_name', async (req, res) => {
    const { template_name, email } = req.params;
    console.log(`Received request to get template with name: ${template_name} for email: ${email}`);
    const user_data = await User.findOne({ email: email });
    if (!user_data) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
    }
    const template_data = user_data.template_data || [];
    const template = template_data.find(template => template.template_name === template_name);
    if (!template) {
        console.log('Template not found');
        return res.status(400).json({ message: 'Template not found' });
    }
    console.log(`Template ${template_name} found for user: ${email}`);
    return res.status(200).json({ message: 'Template found', template_data: JSON.parse(template.template_data) });
});



app.post('/internal/calculate',async (req,res)=>
{
    try{
         const {sheetsService} = await authorizeClient();
         const {email , form_data , form_status} = req.body;
         const user_data = await User.findOne({ email: email });
         if (!user_data) {
                console.log('User not found');
                return res.status(400).json({ message: 'User not found' }); 
         }
         const spreadsheet_id = user_data.spreadsheet_id
         if (!spreadsheet_id) {
                console.log('Spreadsheet not found');
                return res.status(400).json({ message: 'Spreadsheet not found' });
         }
         const data = getDataForSheetWithForm(form_data);

         await batchUpdateSheet(sheetsService,spreadsheet_id,data);

         const over_all_result = await get_over_all_result(spreadsheet_id);
         return res.status(200).json({ message: 'Calculation started' ,data:over_all_result});
    }
    catch(e)
    {
        console.log(e);
    }
})


async function get_over_all_result(spreadsheet_id) {
    const { sheetsService } = await authorizeClient(); // Await the authorization
    // Assuming data_coming_from_frontend.form_data is the data you want to send
    
    const data = await batchGetSheetData(sheetsService,'15Zr-YE2_W7s0RcMI9KkDWIUXE0hmzJ47cuJzS9i0YYs', ['Service Level Sizing!A1:F36', 'FINAL SIZING SUMMARY!A2:K29']);
    const Service_Level_Sizing = data["'Service Level Sizing'"];
    const Final_Sizing_Summary = data["'FINAL SIZING SUMMARY'"];
    const service_level_headers = Service_Level_Sizing[0];
    const service_level_rows = Service_Level_Sizing.slice(1);
    const final_sizing_header_1 = Final_Sizing_Summary[1].slice(0, 7);
    const final_sizing_rows_1 = Final_Sizing_Summary.slice(2, 9).map(row => row.slice(0, 7));
    const final_sizing_header_2 = Final_Sizing_Summary[11].slice(0, 8);
    const final_sizing_rows_2 = Final_Sizing_Summary.slice(12, 21).map(row => row.slice(0, 8));
    const aws_cost = Final_Sizing_Summary[12][10] || 0;  // Assuming the AWS cost is in cell K14
    const is_mini = Final_Sizing_Summary[21][1]
    const is_mini_table_header = Final_Sizing_Summary[23].slice(0, 7);
    const is_mini_table_rows = Final_Sizing_Summary.slice(24, 29).map(row => row.slice(0, 7));
    const table_data = {
        "service_level_headers": service_level_headers,
        "service_level_rows": service_level_rows,
        "final_sizing_header_1": final_sizing_header_1,
        "final_sizing_rows_1": final_sizing_rows_1,
        "final_sizing_header_2": final_sizing_header_2,
        "final_sizing_rows_2": final_sizing_rows_2,
        "aws_cost": aws_cost ,
        "is_mini": is_mini,
        "mini_table_headers": is_mini_table_header,
        "mini_table_rows": is_mini_table_rows
    };
    const page_info = {
        "title": "vuSizing Calc",
        "description": "Template page",
        "user_info": {
            "user_personal_info": "Not available",
            "template_name": "Not available",
        },
        "table_data": table_data
    };
    const filePath = path.join(__dirname, 'views', 'over_all_sizing.ejs');
    return ejs.renderFile(filePath, {page_info: page_info});
}


app.post('/internal/save_inputs', async (req, res) => {
    const { form_data, form_status, email,template_name } = req.body;
    console.log(`Received request to save inputs for email: ${email}`);
    const user_data = await User.findOne({email: email});
    if (!user_data) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
    }
    const user_templates = user_data.template_data || [];
    if (user_templates.length === 0) {
        console.log('No templates exist');
        return res.status(400).json({ message: 'No templates exist' });
    }
    const template = user_templates.find(template => template.template_name === template_name);
    if (!template) {
        console.log('Template not found');
        return res.status(400).json({ message: 'Template not found' });
    }
    console.log(`Inputs received for template: ${template_name}`);

    const template_data = JSON.parse(template.template_data);

    const new_template_data = transform_form_data_in_template_data(form_data, template_data.form_inputs);

    template_data.form_inputs = new_template_data;
    template_data.form_status = form_status;
    template.template_data = JSON.stringify(template_data);
    template.timestamp = new Date().toISOString();
    await user_data.save();
    console.log(`Inputs saved successfully for template: ${template_name}`);
    return res.status(200).json({ message: 'Inputs saved successfully' ,template_data:new_template_data });
});



app.get('/get_sheet_data', async (req, res) => {
    const { sheetsService } = await authorizeClient(); // Await the authorization
    // Assuming data_coming_from_frontend.form_data is the data you want to send
    const data = await getSheetData(sheetsService, '15Zr-YE2_W7s0RcMI9KkDWIUXE0hmzJ47cuJzS9i0YYs' ,'FINAL SIZING SUMMARY');
    return res.status(200).json({ message: 'Data retrieved successfully', data: data });
});


app.listen(port, () => {
        console.log(`Server running at port ${port}`);
})


