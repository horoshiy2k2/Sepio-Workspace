// const express = require('express');
// const axios = require('axios');
// const path = require('path');
// const app = express();
// const port = 3000;

// // ServiceNow API credentials and URL
// const serviceNowInstance = 'https://ven05878.service-now.com';
// const username = 'forRestApi';
// const password = '934275@Ll';

// app.use(express.json());

// // Function to get MAC addresses from ServiceNow
// const getMacAddresses = async (macAddress) => {
//     const auth = Buffer.from(`${username}:${password}`).toString('base64');

//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + auth
//         }
//     };

//     const body = {
//         "mac": macAddress,
//         "password": "Changecloud19",
//         "username": "icloud",
//         "endpoint": "sepio-hac-1-ng.sepiocyber.com"
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

// // Endpoint to fetch and serve MAC addresses
// app.get('/api/mac-addresses', async (req, res) => {
//     const macAddresses = await getMacAddresses();
//     res.json(macAddresses);
// });

// // Endpoint to handle POST request
// app.post('/api/mac-addresses', async (req, res) => {
//     const { macAddress } = req.body;
//     const macAddresses = await getMacAddresses(macAddress);
//     res.json(macAddresses);
// });

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'front-end/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'front-end/build/index.html'));
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
import axios from 'axios';
const path = require('path');
const app = express();
const port = 3000;

// ServiceNow API credentials and URL
const serviceNowInstance = 'https://ven05878.service-now.com';
const username = 'forRestApi';
const password = '934275@Ll';

app.use(express.json());

// Function to get MAC addresses from ServiceNow
const getMacAddresses = async (macAddress) => {
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + auth
        }
    };

    const body = {
        "mac": macAddress,
        "password": "Changecloud19",
        "username": "icloud",
        "endpoint": "sepio-hac-1-ng.sepiocyber.com"
    };

    try {
        const response = await axios.post(`${serviceNowInstance}/api/x_sepsy_sepio_cmdb/sepio_cmdb_rest_api/mac`, body, config);
        const macAddresses = response.data.result;
        console.log('Filtered MAC addresses:', macAddresses); // Logging for debugging
        return macAddresses;
    } catch (error) {
        console.error('Error fetching MAC addresses:', error);
        return [];
    }
};

// Endpoint to fetch and serve MAC addresses
app.get('/api/mac-addresses', async (req, res) => {
    const macAddresses = await getMacAddresses();
    res.json(macAddresses);
});

// Endpoint to handle POST request
app.post('/api/mac-addresses', async (req, res) => {
    const { macAddress } = req.body;
    const macAddresses = await getMacAddresses(macAddress);
    res.json(macAddresses);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../front-end/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
