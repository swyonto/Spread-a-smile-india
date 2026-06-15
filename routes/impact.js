const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/impact', { 
    title: 'Our Impact & Key NGO Metrics | Spread Smile India',
    description: 'See the tangible impact of our work: hundreds of children admitted to formal schools, daily hot meals, computer literacy certifications, and community support.',
    urlPath: '/impact'
  });
});

module.exports = router;
