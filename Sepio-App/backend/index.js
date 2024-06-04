
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// ServiceNow API credentials and URL
const serviceNowInstance = 'https://dev245426.service-now.com/';
const tableName = 'cmdb_ci_server';
const username = 'Test123';
const password = 'N(}Dm[1AKCtRi04)]sFj(YdVKKp:ie';
;


// Function to get MAC addresses from ServiceNow
const getMacAddresses = async () => {
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    try {
        const response = await axios.get(`${serviceNowInstance}/api/now/table/${tableName}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json'
            }
        });
        const macAddresses = response.data.result
        .map(record => record.mac_address)
        .filter(mac => mac && mac.trim() !== '');

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'front-end/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});