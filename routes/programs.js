const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/programs', { 
    title: 'NGO Programs & Interventions | Spread Smile India',
    description: 'Explore our impactful programs spanning Education, health checkups, nutritional food, computer literacy, and COVID-19 relief operations for street children.',
    urlPath: '/programs'
  });
});

module.exports = router;
