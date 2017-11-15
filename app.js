// Declarations
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database.js');
const app = express();
const myport = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(myport, function() { console.log(`Now listening on port ${myport}`); });
app.use(session({ secret: "schaap", saveUnitialized: true, resave: false }));


// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.use('/admin', require('./admin.js'));
app.use('/museums', require('./museums.js'));
app.use('/artworks', require('./artworks.js'));
