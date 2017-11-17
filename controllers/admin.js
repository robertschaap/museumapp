//Declarations
const express = require('express');
const router = express.Router();
const db = require('../models');

// Admin Routes
router.get('/', (req, res) => {
    if (req.session.admin === undefined) {
        res.redirect('/admin/login');
    } else {
        db.queryAdmin()
        .then(query => res.render('admin', { museums: query[0], artworks: query[1], message: req.query.message }))
    }
});

router.get('/login', (req, res) => {
    res.render('login', { message: req.query.message });
});

router.post('/login', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    if (name === 'admin' && password === 'admin') {
        req.session.admin = 1;
        if (req.body.remember === 'on') {
            req.session.cookie.maxAge = 24 * 60 * 60000;
        }
        res.redirect('/admin');
    } else {
        res.redirect('/admin/login?message=Wrong%20username%20or%20password')
    }
});

router.get('/logout', (req, res) =>{
    req.session.destroy( () => {
        res.redirect('/');
    });
});

module.exports = router;
