//Declarations
const express = require('express');
const router = express.Router();
const db = require('../models');

// Museums Routes
router.get('/', (req, res) => {
  db.allMuseums()
    .then(query => res.render('museums', { query: query }));
});

router.get('/:id', (req, res) => {
  db.oneMuseum(req.params.id)
    .then(query => res.render('museum', { query: query }));
});

router.post('/', (req, res) => {
  db.Museums.create({ name: req.body.name, location: req.body.location })
    .then(() => { res.redirect('/admin');})
    .catch((error) => {
      res.redirect('/admin?message=' + encodeURIComponent(error.name));
    });
});

module.exports = router;
