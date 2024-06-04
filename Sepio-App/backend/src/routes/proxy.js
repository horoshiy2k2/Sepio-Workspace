const express = require('express');
const router = express.Router();

router.post('/send-request', (req, res) => {
   
    const requestData = req.body;

//Додати Обробник пост запиту!
    res.json({ message: 'Request received and processed successfully' });
});

module.exports = router;
