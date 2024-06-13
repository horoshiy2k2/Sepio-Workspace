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

// MySQL User DB connection
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to MySQL');
//     // Create a user at the start of the application
//     User.findOrCreate({
//       where: { username: 'User' },
//       defaults: { password: 'Password123' }
//     }).then(([user, created]) => {
//       if (created) {
//         console.log('User created successfully.');
//       } else {
//         console.log('User already exists.');
//       }
//     }).catch(err => {
//       console.error('Error creating user:', err);
//     });
//   })
//   .catch((err) => console.error('Error connecting to MySQL:', err));

// Routes
let serviceNowCredentials = {};
let sepioCredentials = {};
let sepioCredentialsAvailable = false;

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.get('/get-source', async (req, res) => {

  console.log("we are here > /get-source + " + serviceNowCredentials.toString());

  res.json(serviceNowCredentials);
  //return serviceNowCredentials;
});

app.get('/get-sepio-source', async (req, res) => {

  console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

  res.json(sepioCredentials);
  //return serviceNowCredentials;
});

//************************************
//*********** Sepio creds ************
//************************************ 
// var sepioLogin = "icloud";
// var sepioPassword = "Changecloud19";
// var sepioEndpoint = "sepio-hac-1-ng.sepiocyber.com";

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

app.post('/check-sepio-connection', async (req, res) => {
  let { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
  sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };
  sepioCredentialsAvailable = true;

  console.log("sepioEndpoint > " + sepioEndpoint);

  console.log("username > " + sepioUsername);
  console.log("password > " + sepioPassword);
  var requestBody = {
    "username": sepioUsername,
    "password": sepioPassword
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

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
  let { username, password, serviceNowInstance } = serviceNowCredentials;

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

    console.log(`endpoint > ${snQueryParms}`);

    searchQuery = snQueryParms.join("%5EOR");

    console.log(`endpoint > ${searchQuery}`);

    let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

    console.log(`endpoint > ${endpoint}`);

    const response = await axios.get(endpoint, config);

    const queryResults = response.data.result;

    console.log('Filtered MAC addresses:', queryResults);

    return queryResults;

  } catch (error) {
    console.error('Error fetching MAC addresses:', error);
    return [];
  }
};

const getSepioToken = async () => {

  console.log("TOKEN: we are here!");

  let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

  var requestBody = {
    "username": sepioUsername,
    "password": sepioPassword
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

    console.log(response.data.token);

    return response.data.token;
  } catch (error) {
    console.error('Error getting token from Sepio:', error);
    throw error;
  }
};

const addTagsToSepioElements = async (elementSpecifier, tagsList, token) => {

  let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

  console.log("SEPIO TAG: we are here!");

  var tagsNames = [];

  var tagsNames = tagsList.map(item => item);

  const generalToken = tagsNames.length == 0 ? "not_incmdb" : "in_cmdb";

  tagsNames.push(generalToken);

  var requestBody = {
    "tagNames": tagsNames,
    "elementKeys": [elementSpecifier],
    "function": 0,
    "processChildren": false
  };



  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  try {
    const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

    console.log("response.status > " + response.status);

    return response;

  } catch (error) {

    console.error('Error adding tags to Sepio elements:', error);
    throw error;
  }
};

app.post('/api/check-mac', async (req, res) => {

  const { macAddress } = req.body;

  try {

    const result = await getMacAddresses(macAddress);

    if (Array.isArray(result)) {

      if (result.length > 0) {

        let responce = [];

        if (sepioCredentialsAvailable) {
          const token = await getSepioToken();
        }



        for (const singleMac of macAddress) {

          let macAndTables = {
            "macAddress": "",
            "tables": []
          }

          for (const assetWithCmdbInfo of result) {

            if (assetWithCmdbInfo.mac_address == singleMac && assetWithCmdbInfo.sys_class_name.indexOf("cmdb_ci") >= 0) {

              macAndTables.tables.push(assetWithCmdbInfo.sys_class_name);
            }

          }

          if (macAndTables.tables.length == 0) {

            macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
          } else {

            macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
          }

          console.log("singleMac > " + singleMac);
          console.log("macAndTables.tables > " + macAndTables.tables);

          if (sepioCredentialsAvailable) {
            const responceFromTagAPI = await addTagsToSepioElements(singleMac, macAndTables.tables, token);
          }

          responce.push(macAndTables);

          console.log("macAndTables > " + macAndTables);
        };

        console.log("responce >" + responce);

        res.json(responce);

      } else {

        let responce = [];

        macAddress.forEach(function (singleMac) {

          let macAndTables = {
            "macAddress": "",
            "tables": []
          }

          macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;

          responce.push(macAndTables);
        });

        res.json(responce);
      }
    } else {
      let responce = [];

      let macAndTables = {
        "error": "Unexpected error"
      }
      responce.push(macAndTables);

      res.json(responce);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
  }
});

// app.post('/receive-data', async (req, res) => {

//   const { macAddresses } = req.body;
//   console.log('Received MAC addresses:', macAddresses);

//   if (!Array.isArray(macAddresses) || macAddresses.length !== 5) {
//     return res.status(400).json({ success: false, message: 'Please provide exactly 5 MAC addresses' });
//   }

//   const foundMacAddresses = [];
//   const notFoundMacAddresses = [];

//   for (const mac of macAddresses) {
//     const result = await getMacAddresses(mac);
//     if (Array.isArray(result) && result.length > 0 && Array.isArray(result[1])) {
//       foundMacAddresses.push({ macAddress: mac, table: result[1] });
//     } else {
//       notFoundMacAddresses.push(mac);
//     }
//   }

//   res.json({
//     success: true,
//     foundMacAddresses,
//     notFoundMacAddresses
//   });
// });

// Serve static files from the React build directory 
app.use(express.static(path.join(__dirname, '../front-end/build')));

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const getMacAddressesPost = async (macAddresses, targetEndpoint, userlogin, password) => {
  //const { username, password, serviceNowInstance } = serviceNowCredentials;
  const auth = Buffer.from(`${userlogin}:${password}`).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth
    }
  };

  const queries = macAddresses.map(mac => `mac_addressLIKE${mac}`).join('^OR');
  const endpoint = `https://${targetEndpoint}/api/now/table/cmdb_ci?sysparm_query=${queries}&sysparm_fields=mac_address,sys_class_name,sys_id`;

  try {
    const response = await axios.get(endpoint, config);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching MAC addresses:', error);
    return [];
  }
};

app.post('/receive-data', async (req, res) => {
  const { macAddresses } = req.body;
  const { targetEndpoint } = req.body;
  const { userlogin } = req.body;
  const { password } = req.body;
  console.log('Received MAC addresses:', macAddresses);

  const foundMacAddresses = [];
  const notFoundMacAddresses = [];

  const results = await getMacAddressesPost(macAddresses, targetEndpoint, userlogin, password);

  macAddresses.forEach(mac => {
    const matchingResults = results.filter(result => result.mac_address === mac);
    if (matchingResults.length > 0) {
      foundMacAddresses.push({
        macAddress: mac,
        tables: matchingResults.map(result => ({
          table: result.sys_class_name,
          sys_id: result.sys_id
        }))
      });
    } else {
      notFoundMacAddresses.push(mac);
    }
  });

  res.json({
    success: true,
    foundMacAddresses,
    notFoundMacAddresses
  });
});
