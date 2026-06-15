const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/home', { 
    title: 'Spread Smile India NGO - Transforming Lives of Street Children',
    description: 'Spread Smile India is a registered NGO dedicated to educating, feeding, and providing health & vocational support to underprivileged street children in Delhi.',
    urlPath: '/'
  });
});

module.exports = router;
