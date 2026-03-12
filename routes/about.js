const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/about', { title: 'About | Spread Smile India' });
});

module.exports = router;
