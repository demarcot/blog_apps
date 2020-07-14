const https = require('https');
const path = require('path');
const express = require('express');
const app = express();

app.use('/static', express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'builds')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ssr/index.html'));
});

app.listen(8000, () => {
    console.log("Listening on 8000...");
});