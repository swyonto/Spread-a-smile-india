# Spread Smile India — Build Plan

---

## ✅ Step 1 — Project Setup & Folder Structure (DONE)

### Files Created
- [x] `package.json` — Project config, dependencies (express, ejs, dotenv, nodemon)
- [x] `app.js` — Express server, view engine setup, routes wired, 404 handler
- [x] `.env` — ImageKit keys (already existed)

### Routes
- [x] `routes/home.js`
- [x] `routes/about.js`
- [x] `routes/programs.js`
- [x] `routes/impact.js`
- [x] `routes/dignitaries.js`

### EJS Pages (scaffold only — no real content yet)
- [x] `views/pages/home.ejs`
- [x] `views/pages/about.ejs`
- [x] `views/pages/programs.ejs`
- [x] `views/pages/impact.ejs`
- [x] `views/pages/dignitaries.ejs`
- [x] `views/pages/404.ejs`

### EJS Partials (scaffold only — no real styling yet)
- [x] `views/partials/navbar.ejs`
- [x] `views/partials/footer.ejs`
- [x] `views/partials/carousel.ejs`
- [x] `views/partials/imageCard.ejs`
- [x] `views/partials/gallery.ejs`

### CSS Files (empty scaffold — headers only)
- [x] `public/css/base.css`
- [x] `public/css/theme.css`
- [x] `public/css/navbar.css`
- [x] `public/css/footer.css`
- [x] `public/css/carousel.css`
- [x] `public/css/cards.css`
- [x] `public/css/gallery.css`
- [x] `public/css/home.css`
- [x] `public/css/about.css`
- [x] `public/css/programs.css`
- [x] `public/css/impact.css`
- [x] `public/css/dignitaries.css`

### JS Files (empty scaffold — headers only)
- [x] `public/js/theme.js`
- [x] `public/js/carousel.js`

### Dependencies
- [x] `npm install` — all packages installed

---

## ✅ Step 2 — Base CSS + Theme System (DONE)

### Files to fill in
- [ ] `public/css/base.css`
  - CSS reset (margin/padding zero, box-sizing border-box)
  - Base font family, font sizes, line height
  - Global `a`, `img`, `ul`, `button` resets
  - Container / section padding utilities

- [ ] `public/css/theme.css`
  - Light theme CSS variables (colors from README palette)
    - `--color-primary: #c8b6ff`
    - `--color-accent: #b8c0ff`
    - `--color-highlight: #bbd0ff`
    - `--color-bg: #e7c6ff`
    - `--color-secondary: #ffd6ff`
    - Text colors, border colors, shadow colors
  - Dark theme CSS variables (on `[data-theme="dark"]`)
    - Dark background, light text, adjusted accent tones

- [ ] `public/js/theme.js`
  - Read saved theme from `localStorage` on page load
  - Apply `data-theme` attribute to `<html>`
  - Toggle button switches between light / dark
  - Save preference to `localStorage`
  - Update toggle button icon (☀️ / 🌙)

---

## ⬜ Step 3 — Navbar Component

### Files to build
- [ ] `views/partials/navbar.ejs` — finalize markup
  - Logo image slot
  - NGO name
  - Nav links: Home, About, Programs (dropdown), Impact (dropdown)
  - Theme toggle button
  - Hamburger button for mobile
- [ ] `public/css/navbar.css`
  - Navbar layout (flexbox: left / center / right)
  - Logo + name sizing
  - Nav link styles, hover states
  - Dropdown menu styles (show on hover)
  - Theme toggle button style
  - Hamburger button + mobile menu (slide-in)
  - Responsive breakpoints

---

## ⬜ Step 4 — Footer Component

### Files to build
- [ ] `views/partials/footer.ejs` — finalize markup
  - Contact info column
  - Social media links column
  - Copyright line
- [ ] `public/css/footer.css`
  - Footer layout (flexbox / grid)
  - Column spacing
  - Social links style
  - Copyright bar
  - Responsive layout

---

## ⬜ Step 5 — Carousel Component

### Files to build
- [ ] `views/partials/carousel.ejs` — finalize markup
  - Image slides with heading overlay
  - Video slide with muted default + sound toggle button
  - Prev / Next buttons
  - Dot navigation
- [ ] `public/css/carousel.css`
  - Full-width layout
  - Slide transition (CSS transform + transition)
  - Caption overlay positioning
  - Prev / Next button styles
  - Dot styles + active state
  - Sound toggle button (bottom-left of video slide)
  - Responsive sizing
- [ ] `public/js/carousel.js`
  - Track current slide index
  - Move to next / prev slide
  - Dot click navigation
  - Auto-play with pause on hover
  - Sound toggle for video slide (mute/unmute)
  - Play video when slide is active, pause when not

---

## ⬜ Step 6 — Image Card + Gallery Components

### Files to build
- [ ] `views/partials/imageCard.ejs` — finalize markup
  - Image
  - Heading below image
- [ ] `public/css/cards.css`
  - Card container (border radius, overflow hidden, shadow)
  - Image fill + aspect ratio
  - Heading typography and spacing
  - Hover effect (subtle scale)

- [ ] `views/partials/gallery.ejs` — finalize markup
  - Loop over images array
  - Each item: image with lazy load
- [ ] `public/css/gallery.css`
  - CSS grid layout (3 columns)
  - Gap between items
  - Image fill + aspect ratio
  - Hover zoom effect
  - Responsive (2 col → 1 col on mobile)

---

## ⬜ Step 7 — Home Page

### Files to build
- [ ] `views/pages/home.ejs` — finalize page sections
  - Section 1: Hero Carousel (full width)
  - Section 2: Image Cards grid (Education, Skill Dev, Community, Health)
  - Section 3: Mission text + full-width image
- [ ] `public/css/home.css`
  - Section spacing / padding
  - Cards grid layout
  - Mission section: text + image side-by-side
  - Responsive layout adjustments

---

## ⬜ Step 8 — About Page

### Files to build
- [ ] `views/pages/about.ejs` — finalize page sections
  - Section 1: Video Carousel (2 videos)
  - Section 2: How We Are Different — text left / image right
  - Section 3: Our Story — Timeline component
- [ ] `public/css/about.css`
  - How We Are Different layout (2-col grid)
  - Timeline styles (vertical line, year markers, description)
  - Responsive layout

---

## ⬜ Step 9 — Programs Page

### Files to build
- [ ] `views/pages/programs.ejs` — finalize all 5 program sections
  - `#program-education`
  - `#program-health`
  - `#program-nutrition`
  - `#program-computer`
  - `#program-celebrations`
  - Each section: heading + main image + image gallery
- [ ] `public/css/programs.css`
  - Section spacing + anchor offset (for navbar clearance)
  - Main image full-width style
  - Section dividers
  - Responsive layout

---

## ⬜ Step 10 — Impact Page

### Files to build
- [ ] `views/pages/impact.ejs` — finalize sections
  - Stats section (numbers grid)
  - Transformation section (before/after image pairs)
  - Stories section (image + text cards)
- [ ] `public/css/impact.css`
  - Stats grid layout
  - Large stat number typography
  - Transformation image pair layout
  - Stories grid
  - Responsive layout

---

## ⬜ Step 11 — Dignitaries Page

### Files to build
- [ ] `views/pages/dignitaries.ejs` — finalize layout
  - Repeated sections: image left / text right
  - Each dignitary: photo, name, title, description
- [ ] `public/css/dignitaries.css`
  - Alternating image-text layout
  - Photo sizing + border radius
  - Name + title typography
  - Responsive (stack on mobile)

---

## ⬜ Step 12 — Final Polish & Testing

- [x] Logo URL set — `https://ik.imagekit.io/l15cczdgu/Assets/logo.webp?updatedAt=1761388991377`
- [ ] Test all routes in browser
- [ ] Test light / dark theme toggle
- [ ] Test carousel on all pages
- [ ] Test mobile responsive layout (navbar hamburger, all pages)
- [ ] Check all ImageKit image URLs load correctly
- [ ] Verify all dropdown nav links scroll to correct program sections
- [ ] Performance: confirm lazy loading on all images
- [ ] Final review of all CSS variable usage (no hardcoded colors)

---

## Notes
- Images: All sourced from existing ImageKit account — URLs copied manually
- No external CSS frameworks (no Tailwind, no Bootstrap)
- No heavy JS libraries (vanilla JS only)
- Single server architecture (Node.js + Express)
- Hosting: cost-effective single server
