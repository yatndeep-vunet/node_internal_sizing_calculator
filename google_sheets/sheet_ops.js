const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Define the scope for Google Sheets API and Google Drive API
const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
];

// Path to your JSON credentials file
const credsPath = './credentials/google_cred.json';
const auth = new google.auth.GoogleAuth({
    keyFile: credsPath,
    scopes,
});

// Authorize and create clients
async function authorizeClient() {
    const authClient = await auth.getClient();
    const driveService = google.drive({ version: 'v3', auth: authClient });
    const sheetsService = google.sheets({ version: 'v4', auth: authClient });
    return { driveService, sheetsService };
}

// Copy a sheet for the user
async function makeCopyOfSheet(driveService, sheet_name) {
    const fileMetadata = {
        name: sheet_name,
        mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const masterSpreadsheetId = process.env.MASTER_SPREADSHEET_ID;

    const fileCopy = await driveService.files.copy({
        fileId: masterSpreadsheetId,
        requestBody: fileMetadata,
    });
    return fileCopy.data.id;
}

// Update an existing sheet
async function updateExistingSheet(sheetsService, spreadsheetId, rangeName, values, sheetId) {
    try {
        const response = await sheetsService.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetId}!${rangeName}`,
            valueInputOption: 'RAW',
            requestBody: { values },
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error updating sheet:', error);
        return null;
    }
}

// Retrieve sheet names
async function getSheets(sheetsService, spreadsheetId) {
    try {
        const response = await sheetsService.spreadsheets.get({ spreadsheetId });
        return response.data.sheets.map(sheet => sheet.properties.title);
    } catch (error) {
        console.error('Error retrieving sheets:', error);
        return null;
    }
}

// Get all data from a sheet by its name
async function getSheetData(sheetsService, spreadsheetId, sheetName) {
    try {
        const range = `${sheetName}`;
        const response = await sheetsService.spreadsheets.values.get({ spreadsheetId, range });
        return response.data.values;
    } catch (error) {
        console.error(`Error retrieving data from sheet '${sheetName}':`, error);
        return null;
    }
}

// Retrieve column names from a specified sheet
async function getColumnNames(sheetsService, spreadsheetId, sheetName) {
    try {
        const range = `${sheetName}!A1:Z1`;
        const response = await sheetsService.spreadsheets.values.get({ spreadsheetId, range });
        return response.data.values ? response.data.values[0] : [];
    } catch (error) {
        console.error('Error retrieving column names:', error);
        return [];
    }
}

// Retrieve data from a specific column by column name
async function getInputColumnData(sheetsService, spreadsheetId, sheetName, columnName) {
    try {
        const headers = await getColumnNames(sheetsService, spreadsheetId, sheetName);
        const columnIndex = headers.indexOf(columnName);
        if (columnIndex === -1) {
            console.error(`Column '${columnName}' does not exist in the sheet.`);
            return null;
        }

        const range = `${sheetName}!${String.fromCharCode(65 + columnIndex)}2:${String.fromCharCode(65 + columnIndex)}`;
        const response = await sheetsService.spreadsheets.values.get({ spreadsheetId, range });
        return response.data.values ? response.data.values.flat() : [];
    } catch (error) {
        console.error('Error retrieving column data:', error);
        return null;
    }
}

// Retrieve form details and convert to JSON
async function getFormDetails(sheetsService, spreadsheetId, productSheetName) {
    try {
        const columnNames = await getColumnNames(sheetsService, spreadsheetId, productSheetName);
        if (columnNames.length < 3) {
            throw new Error('Insufficient columns in the sheet.');
        }

        const formInputs = await getInputColumnData(sheetsService, spreadsheetId, productSheetName, columnNames[0]);
        const helpText = await getInputColumnData(sheetsService, spreadsheetId, productSheetName, columnNames[1]);
        const dataType = await getInputColumnData(sheetsService, spreadsheetId, productSheetName, columnNames[2]);

        if (!formInputs || !helpText || !dataType) {
            throw new Error('Failed to retrieve necessary data columns.');
        }

        const tableData = formInputs.map((input, index) => ({
            form_input: input,
            help_text: helpText[index] || '',
            data_type: dataType[index] || ''
        }));
        
        return JSON.stringify(tableData, null, 4);
    } catch (error) {
        console.error('Error processing form details:', error);
        return null;
    }
}

// Batch update sheets
async function batchUpdateSheet(sheetsService, spreadsheetId, data) {
    const requestBody = {
        valueInputOption: 'RAW',
        data,
    };
    try {
        const response = await sheetsService.spreadsheets.values.batchUpdate({
            spreadsheetId,
            requestBody,
        });
        console.log(`${response.data.totalUpdatedCells} cells updated.`);
        return response.data.totalUpdatedCells;
    } catch (error) {
        console.error('Error updating sheet:', error);
        return null;
    }
}


async function deleteSpreadsheets(driveService, spreadsheetIds) {
    for (const spreadsheetId of spreadsheetIds) {
        try {
            await driveService.files.delete({
                fileId: spreadsheetId
            });
            console.log(`Spreadsheet with ID ${spreadsheetId} deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting spreadsheet with ID ${spreadsheetId}: ${error.message}`);
            continue;
        }
    }
}

async function listSpreadsheets(driveService) {
    try {
        // Query to list only Google Sheets files
        const query = "mimeType='application/vnd.google-apps.spreadsheet'";
        const response = await driveService.files.list({
            q: query,
            fields: 'files(id, name, createdTime)' // Specify the fields to return, including createdTime
        });

        const items = response.data.files;

        // Format the createdTime to a more readable format
        const formattedItems = items.map(item => ({
            ...item,
            createdTime: new Date(item.createdTime).toLocaleString()
        }));

        // Create an array of spreadsheet objects with name, id, and createdTime
        const spreadsheets = formattedItems.map(item => ({
            name: item.name,
            id: item.id,
            createdTime: item.createdTime
        }));

        return spreadsheets;
    } catch (error) {
        console.error(`Error listing spreadsheets: ${error.message}`);
        return [];
    }
}

async function batchGetSheetData(authClient, spreadsheetId, sheetRanges) {
    try {
        // Initialize the Sheets API client
        const sheets = authClient

        // Call batchGet API to retrieve data for the given ranges
        const response = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: spreadsheetId,
            ranges: sheetRanges,
            valueRenderOption: "UNFORMATTED_VALUE" // Retrieve raw values
        });

        // Extract data from the response and organize it by sheet name
        const sheetData = {};
        response.data.valueRanges.forEach(valueRange => {
            const sheetName = valueRange.range.split('!')[0];
            sheetData[sheetName] = valueRange.values || [];
        });

        return sheetData;
    } catch (error) {
        console.error(`Error retrieving data from specified sheet ranges '${sheetRanges}':`, error);
        return null;
    }
}

module.exports = {
    authorizeClient,
    makeCopyOfSheet,
    updateExistingSheet,
    getSheets,
    getSheetData,
    getColumnNames,
    getInputColumnData,
    getFormDetails,
    batchUpdateSheet,
    deleteSpreadsheets,
    listSpreadsheets,
    batchGetSheetData
};
