//Declarations
const express = require('express');
const router = express.Router();
const db = require('../models');

// Artworks Routes
router.get('/', (req, res) => {
  db.allArtworks()
    .then(query => res.render('artworks', { query: query }));
});

router.get('/:id', (req, res) => {
  db.oneArtwork(req.params.id)
    .then(query => res.render('artwork', { query: query }));
});

router.post('/', (req, res) => {
  db.addArtwork(req.body.name, req.body.artist, req.body.location)
    .then(() => res.redirect('/admin'))
    .catch((error) => {
      res.redirect('/admin?message=' + encodeURIComponent(error.name));
    });
});

module.exports = router;
