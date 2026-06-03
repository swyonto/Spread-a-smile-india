const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/skills', { 
    title: 'Skill Development | Spread Smile India',
    description: 'Learn about Spread Smile India\'s vocational and creative training programs, including Tailoring, Candle Making, Spoken English, Singing, and Arts.',
    urlPath: '/skill-development'
  });
});

module.exports = router;
