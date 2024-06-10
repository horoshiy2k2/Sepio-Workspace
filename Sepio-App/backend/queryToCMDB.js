
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// let serviceNowCredentials = {};

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = { serviceNowInstance, username, password };

//   try {
//     const response = await axios.get(`${serviceNowInstance}/api/now/table/incident`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       res.json({ success: true, message: 'Connection successful!' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// const getMacAddresses = async (macAddress) => {
//     const { username, password, serviceNowInstance } = serviceNowCredentials;

//     const auth = Buffer.from(`${username}:${password}`).toString('base64');

//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + auth
//         }
//     };

//     const body = {
//         mac: macAddress,
//         password: "Changecloud19",
//         username: "icloud",
//         endpoint: "sepio-hac-1-ng.sepiocyber.com"
//     };

//     try {
//         const response = await axios.post(`${serviceNowInstance}/api/x_sepsy_sepio_cmdb/sepio_cmdb_rest_api/mac`, body, config);
//         const macAddresses = response.data.result;
//         console.log('Filtered MAC addresses:', macAddresses); // Logging for debugging
//         return macAddresses;
//     } catch (error) {
//         console.error('Error fetching MAC addresses:', error);
//         return [];
//     }
// };

// app.post('/api/check-mac', async (req, res) => {
//     const { macAddress } = req.body;

//     try {
//         const result = await getMacAddresses(macAddress);
//         if (Array.isArray(result) && result.length > 0 && Array.isArray(result[1])) {
//             const tables = result[1]; // Assuming result[1] contains the table names
//             res.json({ success: true, message: `MAC address ${macAddress} was found.`, macAddress, tables });
//         } else {
//             res.json({ success: false, message: `MAC address ${macAddress} was not found.`, macAddress });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//     }
// });


// app.post('/receive-data', async (req, res) => {
//     const { macAddresses } = req.body;
//     console.log('Received MAC addresses:', macAddresses);

//     if (!Array.isArray(macAddresses) || macAddresses.length !== 5) {
//         return res.status(400).json({ success: false, message: 'Please provide exactly 5 MAC addresses' });
//     }

//     const foundMacAddresses = [];
//     const notFoundMacAddresses = [];

//     for (const mac of macAddresses) {
//         const result = await getMacAddresses(mac);
//         if (Array.isArray(result) && result.length > 0 && Array.isArray(result[1])) {
//             foundMacAddresses.push({ macAddress: mac, table: result[1] });
//         } else {
//             notFoundMacAddresses.push(mac);
//         }
//     }

//     res.json({
//         success: true,
//         foundMacAddresses,
//         notFoundMacAddresses
//     });
// });

// // Serve static files from the React build directory
// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


























const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
let serviceNowCredentials = {};


app.post('/check-connection', async (req, res) => {
  const { serviceNowInstance, username, password } = req.body;
  serviceNowCredentials = { serviceNowInstance, username, password };

  try {
    const response = await axios.get(`https://${serviceNowInstance}`, {
      auth: {
        username,
        password
      }
    });

    if (response.status === 200) {
      res.json({ success: true, message: 'Connection successful!' });
    } else {
      res.status(500).json({ success: false, message: 'Connection failed!' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
  }
});

const getMacAddresses = async (macAddress) => {

  console.log(macAddress);
  console.log(typeof (macAddress));
  const { username, password, serviceNowInstance } = serviceNowCredentials;

  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth
    }
  };

  try {
    let snQueryParms = [];
    let searchQuery = "";

    macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));
    searchQuery = snQueryParms.join("%5EOR");

    let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

    console.log(`endpoint > ${endpoint}`);

    const response = await axios.get(endpoint, config);

    const queryResults = response.data.result;

    console.log('Filtered MAC addresses:', queryResults); // Logging for debugging

    return queryResults;

  } catch (error) {
    console.error('Error fetching MAC addresses:', error);
    return [];
  }
};

app.post('/api/check-mac', async (req, res) => {

  const { macAddress } = req.body;

  try {

    const result = await getMacAddresses(macAddress);

    if (Array.isArray(result) && result.length > 0) {

      let responce = [];

      macAddress.forEach(function (singleMac) {

        let macAndTables = {
          "macAddress" : "",
          "tables" : []
        }

        macAndTables.macAddress = singleMac;

        result.forEach(function (assetWithCmdbInfo) {

          if (assetWithCmdbInfo.mac_address == singleMac && assetWithCmdbInfo.sys_class_name.indexOf("cmdb_ci") >= 0) {

            macAndTables.tables.push(assetWithCmdbInfo.sys_class_name);
          }


        });

        responce.push(macAndTables);
      });


      console.log("responce >" + responce);

      res.json(responce);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
  }
});

app.post('/receive-data', async (req, res) => {
  const { macAddresses } = req.body;
  console.log('Received MAC addresses:', macAddresses);

  if (!Array.isArray(macAddresses) || macAddresses.length !== 5) {
    return res.status(400).json({ success: false, message: 'Please provide exactly 5 MAC addresses' });
  }

  const foundMacAddresses = [];
  const notFoundMacAddresses = [];

  for (const mac of macAddresses) {
    const result = await getMacAddresses(mac);
    if (Array.isArray(result) && result.length > 0 && Array.isArray(result[1])) {
      foundMacAddresses.push({ macAddress: mac, table: result[1] });
    } else {
      notFoundMacAddresses.push(mac);
    }
  }

  res.json({
    success: true,
    foundMacAddresses,
    notFoundMacAddresses
  });
});

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});