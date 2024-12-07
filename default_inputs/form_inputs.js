var default_form_inputs = {
    "vuInfra": [
        {
            "form_input": "Servers ",
            "help_text": "Num of servers/VMs/hosts part of monitoring scopre",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Network Devices ",
            "help_text": "Num of network devices like routers, switches, firewalls, load balancers, WAF etc",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Storage Devices",
            "help_text": "Num of SAN Storage servers (ex: Dell, HP, NetApp etc)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Web Servers",
            "help_text": "Num of webservers (ex: Apache, NGINX, IIS, OHS)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Middleware ",
            "help_text": "Num of middleware container instances(ex: JBOSS, Tomcat, Weblogic, WebSphere)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "SQL Databases",
            "help_text": "Num of SQL databases in scope (ex: Oracle, MySQL, SQL Server, Postgres)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "NoSQL Databases",
            "help_text": "Num of NoSQL databases in scope (ex: MongoDB, Cassandra, Couchbase etc)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Netflow ",
            "help_text": "Number of hosts sending netflow data (note that netflow is always sampled after receiving on the pipelines)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Config Collections",
            "help_text": "Number of network devices from which configurations should be collected for change management",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Availability  - Links, Hosts, Services and URL",
            "help_text": "Number of endpoints to be monitored for Availability",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Synthetic Monitoring Journeys",
            "help_text": "Number of journeys in scope for Synthetic monitoring",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "API Monitoring",
            "help_text": "Number of other infra stack not listed above",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Polling Interval (Seconds)",
            "help_text": "Data fetching frequency (Seconds)",
            "data_type": "Numeric",
            "value": 180
        }
    ],
    "vuTraces": [
        {
            "form_input": "Transaction Volume per day",
            "help_text": "If vuTraces is needed for a transactional app like Banks/Fintech, we will size it for trace spans per transaction. Set it to zero if the app in scope is not a transactional app.",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Transaction Rate (TPS)",
            "help_text": "Transactions per sec (TPS)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Non Transactional JVMs/Instances",
            "help_text": "Number of application instances in scope which are not related to any transaction workflow. Use this field if vuTraces are required for generic applications or application instances. Do not set this if only the transactional app is in scope for vuTraces",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Transaction Touchpoints",
            "help_text": "Number of touchpoints on a transactional App. This will be used to rougly estimate the complexity of the app and num trace spans expected to receive on our system. No need to set this if vuTraces scope is only on non-transactional apps.",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Real User Monitoring - Concurrent Users",
            "help_text": "Num of RUM Concurrent user base",
            "data_type": "Numeric ",
            "value": 0.0
        }
    ],
    "vuLogx": [
        {
            "form_input": "Syslog Size per day(GB)",
            "help_text": "Approximate total size of parsed syslog metrics to be monitored per day",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "App Logs Size per day(GB)",
            "help_text": "Approximate total size of parsed application logs to be monitored per day",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Raw Logs storage",
            "help_text": "Should we need to store raw logs?",
            "data_type": "Boolean",
            "value": "TRUE"
        }
    ],
    "vuBJM": [
        {
            "form_input": "Daily Transaction Volume",
            "help_text": "Number of monitored transactions per day ",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Transaction Rate (TPS)",
            "help_text": "Peak transactions / sec ",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Transaction Touchpoints",
            "help_text": "Number of touchpoints from where transaction logs will be collected to stitch a transaction",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Ingest touchpoint data ?",
            "help_text": "If touchpoint data should also be ingested in the database in addition to consolidated transaction documents",
            "data_type": "Boolean",
            "value": "FALSE"
        }
    ],
    "vuCoreML": [
        {
            "form_input": "Num of Signals",
            "help_text": "Indicates number of unique usecases on which ML analytics are used (For example, Transaction Monitoring usecase is a signal, Server-Health usecase is a signal, Weblogic monitoring is a signal)",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Approx Num dimensions per signal",
            "help_text": "Indicates the dimensions on each signal (for example if the signal is txn monitoring, and if txn type has 4 values and if there are 100 banks and if we need ML analytics for each bank's performance by txn type, then the num dimensions are 4x100=400). Give about 200 if you dont know.",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "Num Fields Per Signal",
            "help_text": "Avg Number of fields used for ML analytics per signal (Ex: CPU, memory are fields for server-health, TAT, Txn Status are some of the fields for txn monitoring). You can give 10 if you do not know this.",
            "data_type": "Numeric",
            "value": 0.0
        },
        {
            "form_input": "LLM based Analytics",
            "help_text": "LLM analytics needed based on historical data ? This will introduce additional infra requirement with GPU",
            "data_type": "Boolean",
            "value": "TRUE"
        }
    ],
    "GeneralInputs": [
        {
            "form_input": "High Availability ?",
            "help_text": "High Availability Required ?",
            "data_type": "Boolean",
            "value": "TRUE"
        },
        {
            "form_input":"Num of environments (DC/DR)",
            "help_text":"Num of additonal replicted environments where vuSmartMaps should be setup",
            "data_type":"Hidden",
            "value": 0.0
        },
        {
            "form_input": "Num of vuSmartMaps users",
            "help_text": "Total users expected to use the platform",
            "data_type": "Numeric",
            "value": 0
        },
        {
            "form_input": "Num Alerts",
            "help_text": "Total Alerts Expected ",
            "data_type": "Numeric",
            "value": 0
        }
    ],
    "DataRetention": [
        {
            "form_input": "Hot Search (Days)",
            "data_type": "Numeric",
            "value": 10
        },
        {
            "form_input": "Warm Search (Days)",
            "data_type": "Numeric",
            "value": 10
        },
        {
            "form_input": "Cold Search (Days)",
            "data_type": "Numeric",
            "value": 10
        },
        {
            "form_input": "Summarized Data Retention (Days)",
            "data_type": "Numeric",
            "value": 10
        }
    ]
}


var default_form_status = {
    "vuCoreML": "false",
    "vuLogx": "false",
    "vuBJM": "false",
    "vuTraces": "false",
    "vuInfra": "false",
    "GeneralInputs": "false",
    "DataRetention": "false"
}


module.exports = {
    default_form_inputs,
    default_form_status
}