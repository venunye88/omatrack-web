// const express = require('express');
// const app = express();
// // Run the app by serving the static files
// // in the dist directory //
// // app.use(express.static(__dirname + '/dist'));
// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 8080);

const express = require('express');

const app = express();

app.use(express.static('./dist/omatrack'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/omatrack/' }),
);

app.listen(process.env.PORT || 8080);