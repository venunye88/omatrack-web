// const express = require('express');
// const app = express();
// // Run the app by serving the static files
// // in the dist directory //
// // app.use(express.static(__dirname + '/dist'));
// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 8080);

var express = require('express');
var app = express();
const path = require('path');
var PORT = process.env.PORT || 5000;
var app_path = '/dist/omatrac';

app.use('/', express.static(path.join(__dirname, app_path)))
    .get('*', (req, res) => res.sendFile(path.join(__dirname, app_path, +'/index.html')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));