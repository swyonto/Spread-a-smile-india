# Spread Smile India - Pending Tasks & Asset Checklist

This document tracks pending tasks, content assets to gather, and technical implementation steps left to complete the website project.

---

## ✅ Completed Tasks

- [x] **Home Page — Carousel Slide 2 Subheading**: Updated the "Women Empowerment" carousel slide subheading text (`views/pages/home.ejs`).
- [x] **Programs Page — Health Section Heading**: Renamed "Healthcare & Wellness" → "Health" (`views/pages/programs.ejs`).
- [x] **COVID Page → Programs Section**: Moved all COVID-19 pandemic content (6 gallery cards, featured video, 9 photo logs, 10-video reel grid, 8-image seamless grid) into `programs.ejs` as the `#program-covid` section — identical layout to the old standalone page.
- [x] **Celebrations Program → Dedicated Route**: Replaced the old Celebrations program section in Programs with the COVID section; Celebrations is now a standalone page at `/celebrations` with festival tabs (Diwali, Christmas, Holi, Independence Day, Dussehra) + special events cards.
- [x] **Navbar Updated**: COVID top-level link replaced with Celebrations (`/celebrations`); Programs dropdown Celebrations entry replaced with COVID-19 Relief (`#program-covid`).
- [x] **Sitemap Updated**: `/covid` removed, `/celebrations` added with today's date.
- [x] **`/covid` Redirect**: Old URL permanently redirects (301) to `/programs#program-covid` — semantically correct, no broken links.
- [x] **PDF Generator**: Added Playwright script (`scratch/generate-pdf.js`) to capture all 8 pages as 16:9 landscape PDFs — run with `npm run pdf`.

## 🔲 In Progress / Pending Dev Tasks

- [ ] **Fix Timeline Page Headings**: Review and correct year headings on the Timeline page that are misaligned or incorrect.
- [ ] **Celebrations Page — Scroll-Spy Sidebar**: Complete the celebrations page JS (`public/js/celebrations.js`) for the scroll-spy sidebar (sticky left on desktop, horizontal foldable strip on mobile) — festival sections scroll into view and active nav item updates automatically.
- [ ] **Celebrations Page — Real Images**: Replace placeholder images in `views/pages/celebrations.ejs` with actual year-specific festival photos (Diwali 2022/23/24, Holi, Dussehra etc.) once received from Vicky Sir.

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

