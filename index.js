const https = require('https');
const path = require('path');
const express = require('express');
const app = express();

app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/blog-ng', express.static(path.join(__dirname, 'builds/blog-ng')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ssr/index.html'));
});

app.get('**', (req, res) => {
    let returnFile = path.join(__dirname, 'ssr/index.html');
    if(req.url.split('blog-ng').length > 1)
    {
        returnFile = path.join(__dirname, 'builds/blog-ng/index.html');
        res.sendFile(returnFile);
    } else 
    {
        //res.sendFile(returnFile);
        console.log("Unknown path...");
        res.sendStatus(404);
    }
});

app.listen(8000, () => {
    console.log("Listening on 8000...");
});