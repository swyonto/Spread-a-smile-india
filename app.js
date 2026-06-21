require('dotenv').config();
const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const programsRouter = require('./routes/programs');
const impactRouter = require('./routes/impact');
const dignitariesRouter = require('./routes/dignitaries');
const skillsRouter = require('./routes/skills');
const celebrationsRouter = require('./routes/celebrations');
const timelineRouter = require('./routes/timeline');

const app = express();
const PORT = process.env.PORT || 3000;

// ImageKit optimization helper
app.locals.getOptimizedImg = function(url, tr) {
  if (!url) return '';
  if (!url.includes('ik.imagekit.io')) return url; // Keep non-ImageKit URLs as is
  
  const hasQuery = url.includes('?');
  if (hasQuery) {
    if (url.includes('tr=')) {
      return url.replace(/tr=[^&]+/, 'tr=' + tr);
    } else {
      return url + '&tr=' + tr;
    }
  } else {
    return url + '?tr=' + tr;
  }
};

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Trust proxy settings (essential for correct protocol/host behind Cloudflare/Render)
app.enable('trust proxy');

// Dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  const host = req.get('host');
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *\nDisallow:\n\nSitemap: https://${host}/sitemap.xml\n`);
});

// Dynamic sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const fs = require('fs');
  const filePath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading sitemap');
    }
    const host = req.get('host');
    const dynamicSitemap = data.replace(/spreadasmileindia\.com/g, host).replace(/spreadasmileindia\.org/g, host);
    res.header('Content-Type', 'application/xml');
    res.send(dynamicSitemap);
  });
});

// Middleware to set domain dynamically for views
app.use((req, res, next) => {
  res.locals.currentDomain = `https://${req.get('host')}`;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRouter);
app.use('/about', aboutRouter);
app.use('/programs', programsRouter);
app.use('/impact', impactRouter);
app.use('/dignitaries', dignitariesRouter);
app.use('/skill-development', skillsRouter);
app.use('/celebrations', celebrationsRouter);
app.use('/timeline', timelineRouter);
app.get('/timezone', (req, res) => res.redirect('/timeline'));
app.get('/covid', (req, res) => res.redirect(301, '/programs#program-covid')); // permanent redirect to covid section

// 404 handler
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 - Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Spread Smile India running at http://localhost:${PORT}`);
});
