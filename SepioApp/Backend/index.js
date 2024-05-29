const express = require('express');
const app = express();

app.get('/', (req, resp)=>{
    resp.send('Sepio preperation');
});

app.listen(5001);