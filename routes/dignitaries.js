const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/dignitaries', { title: 'Dignitaries | Spread Smile India' });
});

module.exports = router;
