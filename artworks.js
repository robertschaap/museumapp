//Declarations
const express = require('express');
const router = express.Router();
const db = require('./database.js');

// Artworks Routes
router.get('/', function(req, res) {
    db.Artworks.findAll()
    .then(db.makeMap)
    .then(query => res.render('artworks', { query: query }))
});

router.get('/:id', function(req, res) {
    db.Artworks.findById(req.params.id)
    .then(query => res.render('artwork', { query: query }))
});

router.post('/', function(req, res) {
    db.Artworks.create({ name: req.body.name, artist: req.body.artist, museumId: req.body.location })
    .then(() => { res.redirect('/admin')})
    .catch((error) => {
        res.redirect('/admin?message=' + encodeURIComponent(error.name))
    })
});

module.exports = router;
