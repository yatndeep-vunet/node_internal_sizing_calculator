const {batchUpdateSheet , authorizeClient , batchGetSheetData}  = require('./google_sheets/sheet_ops')


// Retrieve the values of formData for a given sheet name
function getFormDataValues(sheetName, data) {
    // Check if the sheet name exists in data
    if (data[sheetName]) {
        const sheetData = data[sheetName]; // Access the sheet-specific data object

        // Process each key-value pair in the sheet data
        return Object.values(sheetData).map((value) => {
            if (value === 'true' || value === 'TRUE') return true; // Convert string 'true' to boolean true
            if (value === 'false' || value === 'FALSE') return false; // Convert string 'false' to boolean false
            if (!isNaN(value)) return parseFloat(value); // Convert to number if possible
            return value; // Otherwise, keep as-is
        });
    }
    return null; // Return null if sheet name does not exist
}

// Prepare data for each sheet
function prepareDataForSheets(sheetName, data) {
    const valueColumn = 'D';
    const sheetData = data[sheetName];
    
    if (!sheetData) {
        return {
            range: `${sheetName}!${valueColumn}3:${valueColumn}3`,
            values: [[]], // Empty range and values if the sheet data does not exist
        };
    }

    const length = Object.keys(sheetData).length; // Count the number of keys in the sheet data
    const startRange = `${valueColumn}3`;
    const endRange = `${valueColumn}${length + 2}`; // Adjust range length based on the number of keys

    // Retrieve form data values
    const values = getFormDataValues(sheetName, data);

    return {
        range: `${sheetName}!${startRange}:${endRange}`,
        values: values ? values.map((value) => [value]) : [[]], // Transform into a list of lists
    };
}


function prepareGeneralInputDataForSheets(data) {
    // Retrieve GeneralInputs and DataRetention data
    const generalInputData = getFormDataValues('GeneralInputs', data) || [];
    let dataRetentionData = getFormDataValues('DataRetention', data) || [];

    // If either dataset is empty, return empty arrays
    if (generalInputData.length === 0 && dataRetentionData.length === 0) {
        return [
            { range: 'General Inputs!C3:C6', values: [[]] },
            { range: 'General Inputs!B10:E10', values: [[]] }
        ];
    }

    // Ensure DataRetention data is formatted and enforces minimum value of 10
    dataRetentionData = dataRetentionData.map((item) => (parseFloat(item) >= 10 ? parseFloat(item) : 10));

    // Define ranges for Google Sheets API
    const generalInputRange = 'General Inputs!C3:C6';
    const dataRetentionRange = 'General Inputs!B11:E11';

    // Format General Inputs data to spread across different columns (C3 to C6)
    const generalInputsFormatted = [
        [generalInputData[0]], // C3
        [generalInputData[1]], // C4
        [generalInputData[2]], // C5
        [generalInputData[3]]  // C6
    ];

    // Return formatted data for Google Sheets
    return [
        { range: generalInputRange, values: generalInputsFormatted }, // Each value in a separate row, different columns
        { range: dataRetentionRange, values: [dataRetentionData] } // Single row of Data Retention
    ];
}



// Collect data for all sheets, excluding General Inputs and Data Retention
function getDataForSheetWithForm(data) {
    const sheetsData = [];

    Object.keys(data).forEach((sheetName) => {
        if (!['DataRetention', 'GeneralInputs'].includes(sheetName)) {
            sheetsData.push(prepareDataForSheets(sheetName, data));
        }
    });

    const [generalInputSheetData, dataRetentionSheetData] = prepareGeneralInputDataForSheets(data);
    sheetsData.push(generalInputSheetData);
    sheetsData.push(dataRetentionSheetData);

    return sheetsData;
}




// const data_coming_from_frontend = {
//     form_data: {
//       vuCoreML: {
//         'Num of Signals': '0',
//         'Approx Num dimensions per signal': '0',
//         'Num Fields Per Signal': '0',
//         'LLM based Analytics': 'false'
//       },
//       vuLogx: {
//         'Syslog Size per day(GB)': '0',
//         'App Logs Size per day(GB)': '0',
//         'Raw Logs storage': 'false'
//       },
//       vuBJM: {
//         'Daily Transaction Volume': '0',
//         'Transaction Rate (TPS)': '0',
//         'Transaction Touchpoints': '0',
//         'Ingest touchpoint data ?': 'false'
//       },
//       vuTraces: {
//         'Transaction Volume per day': '0',
//         'Transaction Rate (TPS)': '0',
//         'Non Transactional JVMs/Instances': '0',
//         'Transaction Touchpoints': '0',
//         'Real User Monitoring - Concurrent Users': '0'
//       },
//       vuInfra: {
//         'Servers ': '0',
//         'Network Devices ': '0',
//         'Storage Devices': '0',
//         'Web Servers': '0',
//         'Middleware ': '0',
//         'SQL Databases': '0',
//         'NoSQL Databases': '0',
//         'Netflow ': '0',
//         'Config Collections': '0',
//         'Availability  - Links, Hosts, Services and URL': '0',
//         'Synthetic Monitoring Journeys': '0',
//         'API Monitoring': '0',
//         'Polling Interval (Seconds)': '180'
//       },
//       GeneralInputs: {
//         'High Availability ?': 'false',
//         'Num of environments (DC/DR)': '0',
//         'Num of vuSmartMaps users': '0',
//         'Num Alerts': '0'
//       },
//       DataRetention: {
//         'Hot Search (Days)': '10',
//         'Warm Search (Days)': '10',
//         'Cold Search (Days)': '10',
//         'Summarized Data Retention (Days)': '10'
//       }
//     },
//     form_status: {
//       vuCoreML: 'false',
//       vuLogx: 'false',
//       vuBJM: 'false',
//       vuTraces: 'false',
//       vuInfra: 'false',
//       GeneralInputs: 'false',
//       DataRetention: 'false'
//     }
//   }




//console.log(getDataForSheetWithForm(data_coming_from_frontend.form_data));



//Define an async function to handle the asynchronous operations


// async function run() {
//     try {
//         const { sheetsService } = await authorizeClient(); // Await the authorization

//         const spreadsheetId = '1nWA74qBAlTtgCU1cipl_X93pzJaxEhxZlU7meyF6jWA';
        
//         // Assuming data_coming_from_frontend.form_data is the data you want to send
//         const data = await batchGetSheetData(sheetsService,spreadsheetId,['Service Level Sizing!A1:F30', 'FINAL SIZING SUMMARY!A2:H18']);

//         console.log(data);
//     } catch (error) {
//         console.error('Error in run function:', error);
//     }
// }

// // Call the async function
// run();

function transform_form_data_in_template_data(form_data, form_inputs) {
    // form_data the data coming from the frontend
    // form_inputs is the data template_data form_inputs
    const formData = form_data;
    const formInputs = form_inputs;

    for (const section in formData) {
      if (formInputs[section]) {
        formInputs[section].forEach(input => {
          const key = input.form_input;
          if (formData[section][key] !== undefined) {
            input.value = formData[section][key];
          }
        });
      }
    }
    return formInputs;
  }


module.exports = {
    getFormDataValues,
    prepareDataForSheets,
    prepareGeneralInputDataForSheets,
    getDataForSheetWithForm,
    transform_form_data_in_template_data
}