const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email : String,
    spreadsheet_id : String,
    spredsheet_name : String,
    template_data :[
        {
            template_name : String,
            template_data : String,
            timestamp : String
        }
    ]
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;