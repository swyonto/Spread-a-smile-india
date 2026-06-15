const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/about', { 
    title: 'About Us | Spread Smile India',
    description: 'Learn about the history, vision, founders, and trustees of Spread Smile India NGO, dedicated to educating and empowering street children since 2005.',
    urlPath: '/about'
  });
});

module.exports = router;
