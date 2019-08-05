// Declarations
const express = require('express');
const router = express.Router();

// Routes
router.use('/admin', require('./admin.js'));
router.use('/museums', require('./museums.js'));
router.use('/artworks', require('./artworks.js'));

router.get('/', (req, res) => {
  res.render('index');
});

// Error Handler
router.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

module.exports = router;
