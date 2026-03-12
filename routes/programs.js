const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/programs', { title: 'Programs | Spread Smile India' });
});

module.exports = router;
