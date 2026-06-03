const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/covid', { 
    title: 'COVID-19 Relief Operations | Spread Smile India',
    description: 'Explore Spread Smile India\'s frontline humanitarian relief efforts, dry ration distributions, vaccination support, and hygiene aids during the COVID-19 pandemic.',
    urlPath: '/covid'
  });
});

module.exports = router;
