//Declarations
const express = require('express');
const router = express.Router();
const db = require('./database.js');

// Museums Routes
router.get('/', function(req, res) {
    db.Museums.findAll()
    .then(db.makeMap)
    .then(query => res.render('museums', { query: query }))
});

router.get('/:id', function(req, res) {
    db.Museums.findAll({
        include: [{ model: db.Artworks, where: { museumId: req.params.id } }]
    })
    .then(db.makeMap)
    .then(query => {
        console.log(query)
        res.render('museum', { query: query })
    });
});

router.post('/', function(req, res) {
    db.Museums.create({ name: req.body.name, location: req.body.location })
    .then(() => { res.redirect('/admin')})
    .catch((error) => {
        res.redirect('/admin?message=' + encodeURIComponent(error.name))
    })
});

module.exports = router;
