# Google Indexing & Dual Domain Setup Log

This document records the investigation, changes, and troubleshooting steps taken to resolve the Google search results drop for Spread a Smile India.

## 📅 Log Entry: June 22, 2026

### 1. The Core Issues Identified
*   **The Server Suspension Block:** Approximately 14 days ago, the server was suspended for 48 hours. During this suspension, the hosting provider (Render) served a temporary page with a `robots.txt` containing `Disallow: /` (26 bytes). Google cached this block, causing the website to drop out of search results.
*   **Google Search Console Caching & Sync Errors:** When the server was resumed, Googlebot was unable to update its cache, returning "Recrawl request failed: Unknown error" in Search Console, keeping the site de-indexed.
*   **Canonical Tag Conflict for `.com`:** The `.com` domain was not appearing in search results because the EJS views had hardcoded canonical links pointing to `https://spreadasmileindia.org`. This instructed Googlebot to ignore the `.com` domain entirely.

---

### 2. Actions Taken & Code Changes

To resolve these issues and allow **both `.com` and `.org` to rank separately**, we implemented a dynamic domain configuration so the site dynamically adapts to whichever domain Googlebot or users are visiting.

#### File 1: Modified [app.js](file:///d:/1.%20PROGRAMING%20WORKSPACE/19.Spread%20a%20smile%20india/app.js)
Added express routes to intercept sitemaps/robots.txt and serve them dynamically, and added a middleware to pass the active domain to all views.
```javascript
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
```

#### File 2: Modified [head.ejs](file:///d:/1.%20PROGRAMING%20WORKSPACE/19.Spread%20a%20smile%20india/views/partials/head.ejs)
Updated canonical tags and Facebook Open Graph tags to use the dynamic `<%= currentDomain %>` variable.
```html
<!-- Open Graph / Facebook -->
<meta property="og:url" content="<%= currentDomain %><%= typeof urlPath !== 'undefined' ? urlPath : '' %>" />

<!-- Canonical Tag -->
<link rel="canonical" href="<%= currentDomain %><%= typeof urlPath !== 'undefined' ? urlPath : '' %>" />
```

#### Deployment:
All changes were staged, committed, and pushed to the main repository branch (`cb0bed2` -> `origin main`) to trigger the build on Render.

---

### 3. Current Verification Status (End of Day June 22)
*   **`.org` domain:** The Robots.txt report shows the file has been successfully fetched. Validation for page indexing is currently in progress.
*   **`.com` domain:** The Google Search Console **Live Test** successfully passed with all green checkmarks: **"URL is available to Google"** and **"Page can be indexed"**. Indexing was manually requested.

---

## 🔍 Diagnostics Checklist (If issues persist in 2 Days)

If the websites are still not appearing on Google after 48 hours, follow these diagnostics:

### Step 1: Verify robots.txt Cache Size
*   Go to **Google Search Console > Settings > Robots.txt**.
*   Select the property you are verifying.
*   Check the **Size** of the cached file. It should be **76 or 77 bytes** (which is our dynamic open sitemap). If it is still **26 bytes**, Google has not refreshed its cache. Click **Request Recrawl**.

### Step 2: Test Live URL again
*   Go to **Google Search Console > URL Inspection**.
*   Test the live URL for both `.com` and `.org`.
*   Ensure both return **"URL is available to Google"** with no robots.txt warning.

### Step 3: Check Cloudflare WAF Block
If you still see the red "Recrawl request failed: Unknown error" or "Blocked by robots.txt" in GSC during the Live Test:
*   Log into **Cloudflare**.
*   Go to **Security > Events**.
*   Check if there are blocked requests where the User Agent contains `Googlebot` or `Google-InspectionTool`.
*   If blocked, go to **Security > Bots** and set **"Verified Bots"** to **Allow**.
