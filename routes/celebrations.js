const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/celebrations', {
    title: 'Joyful Celebrations & Festivals | Spread Smile India',
    description: 'Explore how Spread Smile India celebrates festivals like Diwali, Christmas, and Holi, and organizes sports days, movie nights, and birthdays for street children.',
    urlPath: '/celebrations'
  });
});

module.exports = router;
