require('dotenv').config();
const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const programsRouter = require('./routes/programs');
const impactRouter = require('./routes/impact');
const dignitariesRouter = require('./routes/dignitaries');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/programs', programsRouter);
app.use('/impact', impactRouter);
app.use('/dignitaries', dignitariesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Spread Smile India running at http://localhost:${PORT}`);
});
