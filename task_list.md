# Spread Smile India - Pending Tasks & Asset Checklist

This document tracks pending tasks, content assets to gather, and technical implementation steps left to complete the website project.

---

## 📋 Content & Asset Checklist (Action Required)

Please gather the following files and content blocks from the respective team members:

### 1. 📝 From Maddy Sir (Impact Stories)
- [ ] **Real-Life Stories**: Collect 2–3 additional narrative descriptions for the Impact Page stories slider.
  * *Format*: Title, name of the beneficiary, brief background (1-2 sentences), and the outcome/transformation (1-2 sentences).

### 2. 📷 From Vicky Sir (High-Resolution Images)
- [ ] **Timeline Images**: High-quality photographs to replace the current placeholder links for each timeline range (from 2005 through 2026).
- [ ] **Dignitaries Images**: Original pictures of ambassadors and ministers visiting the centers.
- [ ] **Skill Development Images**: Classroom and session photos for the vocational modules (Tailoring, Candle Making, Spoken English, Dance, Singing, Arts).
- [ ] **COVID-19 Relief Images**: High-quality landscape photos of relief operations (food drives, health camps, study kits, sanitizers) to feed into the bottom seamless grid.

### 3. ✉️ From Sangita Mam (Recommendation Letters)
- [ ] **Original Letter Scans**: High-resolution scans or clean photographs of the recommendation letters written by Thai, French, Swedish, Norwegian, Australian, and Guatemalan ambassadors.
  * *Purpose*: These will be fed directly into the click-to-zoom Lightbox on the Dignitaries page to ensure readability.

---

## 🛠️ Remaining Development Work

Here is the list of technical work left to finalize the deployment-ready website:

### 1. Content Integration
- [ ] **Update Media Assets**: Swap the currently mock/external URLs in EJS pages and data routers with the newly gathered high-resolution images.
- [ ] **Update Beneficiary Carousel**: Insert the final stories received from Maddy Sir into `views/pages/impact.ejs`.

### 2. Form Submissions & Email Hooks
- [ ] **Contact Form Actions**: Hook the Contact forms on the homepage and about page to a backend mailing controller (using `nodemailer` with SMTP configuration or a service like Formspree / SendGrid) to route inquiries directly to the NGO's official inbox.
- [ ] **Volunteer & Donation Buttons**: Link the call-to-action buttons to payment gateways or volunteer registration pipelines.

### 3. Analytics & SEO Optimization
- [ ] **Tracking Scripts**: Insert Google Analytics tracking IDs or Meta Pixel tags in the header partial `views/partials/head.ejs` to track visitors and donor conversion metrics.
- [ ] **Sitemap Validation**: Re-verify and submit `public/sitemap.xml` to Google Search Console once the official domain is pointed.

### 4. Deployment & Launch
- [ ] **Configure Production Port**: Verify that `PORT` environment variables match hosting service parameters.
- [ ] **SSL Configuration**: Force HTTPS redirection at the application or DNS proxy (e.g. Cloudflare) level to secure donation transactions.
- [ ] **Host Node Application**: Deploy code to production servers (Vercel, Render, Heroku, or AWS EC2).
