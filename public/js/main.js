// template_data = {
//     "form_status": {
//         "vuCoreML": false,
//         "vuLogx": false,
//         "vuBJM": false,
//         "vuTraces": false,
//         "vuInfra": false,
//         "GeneralInputs": false,
//         "DataRetention": false
//     },
//     "form_inputs": {
//         "vuCoreML": [
//             {
//                 "form_input": "Num of Signals",
//                 "help_text": "Indicates number of unique usecases on which ML analytics are used (For example, Transaction Monitoring usecase is a signal, Server-Health usecase is a signal, Weblogic monitoring is a signal)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Approx Num dimensions per signal",
//                 "help_text": "Indicates the dimensions on each signal (for example if the signal is txn monitoring, and if txn type has 4 values and if there are 100 banks and if we need ML analytics for each bank's performance by txn type, then the num dimensions are 4x100=400). Give about 200 if you dont know.",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Num Fields Per Signal",
//                 "help_text": "Avg Number of fields used for ML analytics per signal (Ex: CPU, memory are fields for server-health, TAT, Txn Status are some of the fields for txn monitoring). You can give 10 if you do not know this.",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "LLM based Analytics",
//                 "help_text": "LLM analytics needed based on historical data ? This will introduce additional infra requirement with GPU",
//                 "data_type": "Boolean",
//                 "value": "TRUE"
//             }
//         ],
//         "vuLogx": [
//             {
//                 "form_input": "Syslog Size per day(GB)",
//                 "help_text": "Approximate total size of parsed syslog metrics to be monitored per day",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "App Logs Size per day(GB)",
//                 "help_text": "Approximate total size of parsed application logs to be monitored per day",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Raw Logs storage",
//                 "help_text": "Should we need to store raw logs?",
//                 "data_type": "Boolean",
//                 "value": "TRUE"
//             }
//         ],
//         "vuBJM": [
//             {
//                 "form_input": "Daily Transaction Volume",
//                 "help_text": "Number of monitored transactions per day ",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Transaction Rate (TPS)",
//                 "help_text": "Peak transactions / sec ",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Transaction Touchpoints",
//                 "help_text": "Number of touchpoints from where transaction logs will be collected to stitch a transaction",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Ingest touchpoint data ?",
//                 "help_text": "If touchpoint data should also be ingested in the database in addition to consolidated transaction documents",
//                 "data_type": "Boolean",
//                 "value": "FALSE"
//             }
//         ],
//         "vuTraces": [
//             {
//                 "form_input": "Transaction Volume per day",
//                 "help_text": "If vuTraces is needed for a transactional app like Banks/Fintech, we will size it for trace spans per transaction. Set it to zero if the app in scope is not a transactional app.",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Transaction Rate (TPS)",
//                 "help_text": "Transactions per sec (TPS)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Non Transactional JVMs/Instances",
//                 "help_text": "Number of application instances in scope which are not related to any transaction workflow. Use this field if vuTraces are required for generic applications or application instances. Do not set this if only the transactional app is in scope for vuTraces",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Transaction Touchpoints",
//                 "help_text": "Number of touchpoints on a transactional App. This will be used to rougly estimate the complexity of the app and num trace spans expected to receive on our system. No need to set this if vuTraces scope is only on non-transactional apps.",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Real User Monitoring - Concurrent Users",
//                 "help_text": "Num of RUM Concurrent user base",
//                 "data_type": "Numeric ",
//                 "value": 0
//             }
//         ],
//         "vuInfra": [
//             {
//                 "form_input": "Servers ",
//                 "help_text": "Num of servers/VMs/hosts part of monitoring scopre",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Network Devices ",
//                 "help_text": "Num of network devices like routers, switches, firewalls, load balancers, WAF etc",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Storage Devices",
//                 "help_text": "Num of SAN Storage servers (ex: Dell, HP, NetApp etc)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Web Servers",
//                 "help_text": "Num of webservers (ex: Apache, NGINX, IIS, OHS)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Middleware ",
//                 "help_text": "Num of middleware container instances(ex: JBOSS, Tomcat, Weblogic, WebSphere)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "SQL Databases",
//                 "help_text": "Num of SQL databases in scope (ex: Oracle, MySQL, SQL Server, Postgres)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "NoSQL Databases",
//                 "help_text": "Num of NoSQL databases in scope (ex: MongoDB, Cassandra, Couchbase etc)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Netflow ",
//                 "help_text": "Number of hosts sending netflow data (note that netflow is always sampled after receiving on the pipelines)",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Config Collections",
//                 "help_text": "Number of network devices from which configurations should be collected for change management",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Availability  - Links, Hosts, Services and URL",
//                 "help_text": "Number of endpoints to be monitored for Availability",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Synthetic Monitoring Journeys",
//                 "help_text": "Number of journeys in scope for Synthetic monitoring",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "API Monitoring",
//                 "help_text": "Number of other infra stack not listed above",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Polling Interval (Seconds)",
//                 "help_text": "Data fetching frequency (Seconds)",
//                 "data_type": "Numeric",
//                 "value": 180
//             }
//         ],
//         "GeneralInputs": [
//             {
//                 "form_input": "High Availability ?",
//                 "help_text": "High Availability Required ?",
//                 "data_type": "Boolean",
//                 "value": "TRUE"
//             },
//             {
//                 "form_input": "Num of environments (DC/DR)",
//                 "help_text": "Num of additonal replicted environments where vuSmartMaps should be setup",
//                 "data_type": "Hidden",
//                 "value": 0
//             },
//             {
//                 "form_input": "Num of vuSmartMaps users",
//                 "help_text": "Total users expected to use the platform",
//                 "data_type": "Numeric",
//                 "value": 0
//             },
//             {
//                 "form_input": "Num Alerts",
//                 "help_text": "Total Alerts Expected ",
//                 "data_type": "Numeric",
//                 "value": 0
//             }
//         ],
//         "DataRetention": [
//             {
//                 "form_input": "Hot Search (Days)",
//                 "data_type": "Numeric",
//                 "value": 10
//             },
//             {
//                 "form_input": "Warm Search (Days)",
//                 "data_type": "Numeric",
//                 "value": 10
//             },
//             {
//                 "form_input": "Cold Search (Days)",
//                 "data_type": "Numeric",
//                 "value": 10
//             },
//             {
//                 "form_input": "Summarized Data Retention (Days)",
//                 "data_type": "Numeric",
//                 "value": 10
//             }
//         ]
//     }
// }



// data_coming_from_frontend ={
//     vuCoreML: {
//       'Num of Signals': '0',
//       'Approx Num dimensions per signal': '0',
//       'Num Fields Per Signal': '0',
//       'LLM based Analytics': 'false'
//     },
//     vuLogx: {
//       'Syslog Size per day(GB)': '0',
//       'App Logs Size per day(GB)': '0',
//       'Raw Logs storage': 'false'
//     },
//     vuBJM: {
//       'Daily Transaction Volume': '0',
//       'Transaction Rate (TPS)': '0',
//       'Transaction Touchpoints': '0',
//       'Ingest touchpoint data ?': 'false'
//     },
//     vuTraces: {
//       'Transaction Volume per day': '0',
//       'Transaction Rate (TPS)': '0',
//       'Non Transactional JVMs/Instances': '0',
//       'Transaction Touchpoints': '0',
//       'Real User Monitoring - Concurrent Users': '0'
//     },
//     vuInfra: {
//       'Servers ': '0',
//       'Network Devices ': '0',
//       'Storage Devices': '0',
//       'Web Servers': '0',
//       'Middleware ': '0',
//       'SQL Databases': '0',
//       'NoSQL Databases': '0',
//       'Netflow ': '0',
//       'Config Collections': '0',
//       'Availability  - Links, Hosts, Services and URL': '0',
//       'Synthetic Monitoring Journeys': '0',
//       'API Monitoring': '0',
//       'Polling Interval (Seconds)': '180'
//     },
//     GeneralInputs: {
//       'High Availability ?': 'false',
//       'Num of environments (DC/DR)': '0',
//       'Num of vuSmartMaps users': '0',
//       'Num Alerts': '0'
//     },
//     DataRetention: {
//       'Hot Search (Days)': '10',
//       'Warm Search (Days)': '10',
//       'Cold Search (Days)': '10',
//       'Summarized Data Retention (Days)': '10'
//     }
//   }



function create_form(template_data) {
     var SAVE_INPUT_FLAG = true;
     var section_status = template_data.form_status;
     // The logic will be depending on the section status the section will be opened or closed
     const form_sections = template_data.form_inputs
     const form_section_bars = Object.keys(form_sections);
     const submit_button = document.createElement('button');
     submit_button.innerHTML = "Submit";
     submit_button.classList.add('w-full', 'px-5', 'py-2', 'my-4', 'rounded', 'bg-blue-500','hover:bg-blue-700', 'text-white', 'font-bold', 'text-center');
     submit_button.id = 'submit';

     const save_inputs_button = document.createElement('button');
     save_inputs_button.innerHTML = "Save Inputs";
     save_inputs_button.classList.add('bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'w-full', 'my-1', 'text-center', 'text-center');
     save_inputs_button.id = 'save_inputs';
     for (section_bars in form_section_bars) {
          const section_bar = document.createElement('div');
          section_bar.classList.add('flex', 'flex-col', 'mb-4');
          var section_bar_name;
          if (form_section_bars[section_bars] == 'vuTraces') {
               section_bar_name = 'vuApp360'
          }
          else if (form_section_bars[section_bars] == 'GeneralInputs') {
               section_bar_name = 'General Input'
          }
          else if (form_section_bars[section_bars] == 'DataRetention') {
               section_bar_name = 'Data Retention'
          }
          else {
               section_bar_name = form_section_bars[section_bars]
          }
          section_bar.innerHTML = `
          <div class="border border-gray-200 p-2 bg-blue-600 text-white font-bold rounded cursor-pointer" id='${form_section_bars[section_bars]}_section'>
               <div class="flex justify-between items-center section-bars cursor-pointer" data-section="${form_section_bars[section_bars]}">
                   <p> ${section_bar_name} </p>
                   <i class="fa fa-caret-down text-2xl" id='arrow-${form_section_bars[section_bars]}'></i>
               </div>
          </div>
     `
          // section_bar.onclick = update_section_status(form_section_bars[section_bars]);
          document.getElementById('form_section').appendChild(section_bar);

          const section_body = document.createElement('fieldset');
          section_body.classList.add('border', 'border-gray-200', 'p-2', 'flex', 'flex-col');
          // I need to create inputs 
          // what will be the in input -------> input type , input name, input value ....

          for (section_inputs in form_sections[form_section_bars[section_bars]]) {
               const input = document.createElement('input');
               const label_div = document.createElement('div');
               const label = document.createElement('label');
               const help_text = document.createElement('p');
               help_text.innerHTML = `
                    <span class="tooltip">
                    <div class="">
                         <img src="/images/icons8-info-50.png" class="h-5 w-5">
                    </div>
                    <span class="tooltiptext min-w-[20vw] max-w-[50vw]"><small>
                         ${form_sections[form_section_bars[section_bars]][section_inputs].help_text}
                         </small></span>
                </span>
               `
               label_div.classList.add('flex', 'space-x-6', 'items-center');
               label.innerHTML = form_sections[form_section_bars[section_bars]][section_inputs].form_input;
               label.htmlFor = form_sections[form_section_bars[section_bars]][section_inputs].form_input;
               label.classList.add('block', 'text-gray-700', 'text-sm', 'font-bold', 'mb-2');

               if (form_sections[form_section_bars[section_bars]][section_inputs].data_type == "Numeric") {
                    input.type = 'number';
                    input.classList.add('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'mb-4');
                    input.value = form_sections[form_section_bars[section_bars]][section_inputs].value;
                    input.min = 0;
               } else if (form_sections[form_section_bars[section_bars]][section_inputs].data_type == "Boolean") {
                    input.type = 'checkbox';
                    if (form_sections[form_section_bars[section_bars]][section_inputs].value == "true") {
                         input.checked = true;
                    }
                    else {
                         input.checked = false;
                    }
               }
               else {
                    input.type = 'text';
                    input.classList.add('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'mb-4');
                    input.value = form_sections[form_section_bars[section_bars]][section_inputs].value;
               }

               input.name = form_sections[form_section_bars[section_bars]][section_inputs].form_input;
               input.id = form_sections[form_section_bars[section_bars]][section_inputs].form_input;
               const inputWrapper = document.createElement('div');
               inputWrapper.classList.add('mb-4');
               label_div.appendChild(label);
               label_div.appendChild(help_text);
               inputWrapper.appendChild(label_div);
               inputWrapper.appendChild(input);
               section_body.appendChild(inputWrapper);
          }

          section_body.id = form_section_bars[section_bars] + "_body";
          document.getElementById('form_section').appendChild(section_body);
          form_section.appendChild(submit_button);
          form_section.appendChild(save_inputs_button);
     }
     document.querySelectorAll('.section-bars').forEach(el => {
          el.addEventListener('click', () => {
               const section = el.dataset.section; // Store section info in a data attribute
               section_status[section] = section_status[section] === "true" ? "false" : "true";
               toggle_sections();
          });
     });
     function toggle_sections() {
          for (section in section_status) {
               if (section_status[section] == "true") {
                    document.getElementById(section + "_body").style.display = "block";
                    document.getElementById("arrow-" + section).classList.add('fa-caret-up');
               }
               else {
                    document.getElementById(section + "_body").style.display = "none";
                    document.getElementById("arrow-" + section).classList.remove('fa-caret-up');
               }
          }
          // checkSubmitButton();
     }
     toggle_sections();


     function gatherFormData() {
          const formValues = {};
          const fieldsets = document.querySelectorAll('fieldset');
          fieldsets.forEach((fieldset) => {
               const fieldsetId = fieldset.id.replace('_body', ''); // Get the section ID
               formValues[fieldsetId] = {};

               const inputs = fieldset.querySelectorAll('input');
               inputs.forEach((input) => {
                    if (input.type === 'checkbox') {
                         formValues[fieldsetId][input.name] = input.checked; // For checkboxes, store true/false
                    } else {
                         formValues[fieldsetId][input.name] = input.value; // For other inputs, store the value
                    }
               });
          });
          const tableHTML = createTable(formValues);
          document.getElementById('user_inputs').innerHTML = tableHTML;
          return formValues;
     }

     const createTable = (data) => {
          let table = '<table border="1" id="user_inputs" class="hidden">';
          for (const category in data) {
               table += `<tr><th colspan="2">${category}</th></tr>`;
               for (const key in data[category]) {
                    table += `<tr><td>${key}</td><td>${data[category][key]}</td></tr>`;
               }
          }
          table += '</table>';
          return table;
     };

     // function checkSubmitButton() {
     //      const button = document.getElementById("submit");
     //      const save_inputs_button = document.getElementById("save_inputs");
     //      //const input_check = document.querySelectorAll('#dataForm [data-error="true"]').length === 0;
     //      const form_status_flag = Object.values(section_status).some(flag => flag === "true");
     //      button.disabled = !form_status_flag;
     //      SAVE_INPUT_FLAG = form_status_flag;
     //      button.className = button.disabled
     //           ? "w-full px-5 py-2 my-4 rounded btn-disabled" // Disabled state styling
     //           : "w-full px-5 py-2 my-4 rounded btn-enabled"; // Enabled state styling

     //      save_inputs_button.className = button.disabled
     //           ? "bg-gray-400 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded w-full my-1 text-center cursor-not-allowed" // Disabled state styling
     //           : "bg-green-500 hover:bg-green-700 text-white  font-bold py-2 px-4 rounded w-full my-1 text-center"; // Enabled state styling
     // }


     $('#form_section').submit(function (e) {
          $('#loader').fadeIn('fast');
          e.preventDefault();
          payload = {
               form_data: gatherFormData(),
               form_status: section_status,
               email: userEmail,
               template_name: template_name
          }
          $.ajax({
               type: "POST",
               url: "/internal/calculate",
               data: payload,
               dataType: "json",
               success: function (data) {
                    $('#result').empty();
                    $('#result').html(data.data);
                    $('#loader').fadeOut('slow');
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
               },
               failure: function (errMsg) {
                    console.log(errMsg);
                    $('#loader').fadeOut('slow');
               }
          });
     });
     $('#save_inputs').click(function (e) {
          e.preventDefault();
          if (SAVE_INPUT_FLAG) {
               $('#loader').fadeIn('fast');
               payload = {
                    form_data: gatherFormData(),
                    form_status: section_status,
                    email: userEmail,
                    template_name: template_name
               }
               $.ajax({
                    type: "POST",
                    url: "/internal/save_inputs",
                    data: payload,
                    dataType: "json",
                    success: function (data) {
                         $('#loader').fadeOut('slow');
                         Swal.fire({
                              title: 'Inputs Saved',
                              text: 'Inputs are saved successfully',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    },
                    failure: function (errMsg) {
                         console.log(errMsg);
                         $('#loader').fadeOut('slow');
                         alert("Inputs not saved");
                    }
               })
          }
     })
}




