const https = require('https');
const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, 'build/')));

app.get('**', (req, res) => {
    returnFile = path.join(__dirname, 'build/index.html');
    res.sendFile(returnFile);
});

app.listen(4200, () => {
    console.log("Listening on 4200...");
});