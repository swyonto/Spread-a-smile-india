const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/impact', { title: 'Impact | Spread Smile India' });
});

module.exports = router;
