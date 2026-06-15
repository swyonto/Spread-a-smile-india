const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/dignitaries', { 
    title: 'Distinguished Visitors & Dignitaries | Spread Smile India',
    description: 'See the distinguished visitors, government ministers, and international ambassadors who have visited our learning centres and endorsed our work.',
    urlPath: '/dignitaries'
  });
});

module.exports = router;
