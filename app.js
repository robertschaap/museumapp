// Declarations
const express = require('express');
const app = express();
const myport = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    store: new SequelizeStore({
        db: db.sequelize,
        checkExpirationInterval: 15 * 60000,
        expiration: 60 * 60000
    }),
    secret: '38-38-40-40-37-39-37-39-66-65-13',
    saveUninitialized: false,
    resave: false,
}));

app.use(require('./controllers'));

app.listen(myport, () => console.log(`Now listening on port ${myport}`) );
