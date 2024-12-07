const form_data = {
    "vuInfra": {
        "Servers ": "0",
        "Network Devices ": "0",
        "Storage Devices": "0",
        "Web Servers": "0",
        "Middleware ": "0",
        "SQL Databases": "0",
        "NoSQL Databases": "0",
        "Netflow ": "0",
        "Config Collections": "0",
        "Availability  - Links, Hosts, Services and URL": "0",
        "Synthetic Monitoring Journeys": "0",
        "API Monitoring": "0",
        "Polling Interval (Seconds)": "180"
    },
    "vuTraces": {
        "Transaction Volume per day": "0",
        "Transaction Rate (TPS)": "0",
        "Non Transactional JVMs/Instances": "0",
        "Transaction Touchpoints": "0",
        "Real User Monitoring - Concurrent Users": "0"
    },
    "vuLogx": {
        "Syslog Size per day(GB)": "0",
        "App Logs Size per day(GB)": "0",
        "Raw Logs storage": false
    },
    "vuBJM": {
        "Daily Transaction Volume": "0",
        "Transaction Rate (TPS)": "0",
        "Transaction Touchpoints": "0",
        "Ingest touchpoint data ?": false
    },
    "vuCoreML": {
        "Num of Signals": "0",
        "Approx Num dimensions per signal": "0",
        "Num Fields Per Signal": "0",
        "LLM based Analytics": false
    },
    "GeneralInputs": {
        "High Availability ?": false,
        "Num of environments (DC/DR)": "0",
        "Num of vuSmartMaps users": "0",
        "Num Alerts": "0"
    },
    "DataRetention": {
        "Hot Search (Days)": "10",
        "Warm Search (Days)": "10",
        "Cold Search (Days)": "10",
        "Summarized Data Retention (Days)": "10"
    }
}
const createTable = (data) => {
    let table = '<table border="1">';
    for (const category in data) {
        table += `<tr><th colspan="2">${category}</th></tr>`;
        for (const key in data[category]) {
            table += `<tr><td>${key}</td><td>${data[category][key]}</td></tr>`;
        }
    }
    table += '</table>';
    return table;
};

const tableHTML = createTable(form_data);
console.log(tableHTML);