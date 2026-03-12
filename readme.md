Spread Smile India Website
Project Overview

This project is a redesign of the Spread Smile India NGO website.
The previous version contained many pages, animations, and large amounts of text which the client did not prefer.

The goal of this rebuild is to create a simpler, cleaner, image-focused website that highlights the NGO’s work while keeping navigation minimal and clear.

Key philosophy:

Less text

More images

Minimal components

Simple navigation

Clean layout

Cost-effective hosting

The website will run on a single server architecture.

Tech Stack
Backend

Node.js

Express.js

Templating

EJS (Embedded JavaScript)

Used for:

reusable partials

layout components

Styling

Vanilla CSS

(Tailwind avoided for simplicity and long-term stability)

Media Storage

ImageKit (existing account)

Images will be manually copied from ImageKit folders and used directly via URLs.

Features

Dual Theme System (Light / Dark)

Simple client-side JS

Image-focused UI

Minimal scripts

Design Principles

Image-first design

Minimal text

Clean layout

Consistent components

Single page where possible

Avoid unnecessary pages

Focus on storytelling through visuals

Navigation Bar

Structure:

Left Section

NGO Logo

Organization Name
Spread Smile India

Center Section (Navigation Links)

Home

About

Programs

Education

Health

Nutrition

Computer Literacy

Celebrations

Impact

Impact

Our Story

Dignitaries

Right Section

Theme Toggle Button (Light/Dark)

Routes
/
Home Page

/about
About Page

/programs
Programs Page (single page with sections)

#program-education
#program-health
#program-nutrition
#program-computer
#program-celebrations

/impact
Impact Page

/dignitaries
Dignitaries Page

Programs dropdown links will navigate to sections inside the same page using anchor links.

Folder Structure
project-root
│
├── app.js
├── package.json
│
├── routes
│   ├── home.js
│   ├── about.js
│   ├── programs.js
│   ├── impact.js
│   └── dignitaries.js
│
├── views
│   ├── pages
│   │   ├── home.ejs
│   │   ├── about.ejs
│   │   ├── programs.ejs
│   │   ├── impact.ejs
│   │   └── dignitaries.ejs
│   │
│   └── partials
│       ├── navbar.ejs
│       ├── footer.ejs
│       ├── carousel.ejs
│       ├── imageCard.ejs
│       └── gallery.ejs
│
├── public
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   └── theme.js
│   │
│   └── assets
│
└── utils
Core Components
Navbar

Reusable component across the entire website.

Contains:

Logo

NGO name

Navigation links

Dropdown menus

Theme toggle button

Footer

Simple and clean footer.

Contains:

Contact Information

Address

Phone Number

Opening Time
Sunday – Saturday

Social Media Links

Facebook

Instagram

LinkedIn

YouTube

Footer Line:

© Spread Smile India
Homepage Structure
Section 1 — Carousel

Full width carousel.

Slides can contain:

Image OR

Video

Elements

Heading

Previous Button

Next Button

Dot Navigation

Video Slide Features

Sound Toggle Button

Button located at bottom left

Video muted by default

No buttons such as:

View More

Learn More

Program Link

Only visual storytelling + heading.

Section 2 — Image Cards

Simple card grid.

Card contains:

Image

Heading

No buttons.

Layout:

Grid layout with multiple cards.

Section 3 — Minimal Text Section

Contains:

NGO message

Short text

Full width image

Purpose:
Present mission in a simple visual format.

About Page
Section 1 — Video Carousel

Carousel with two videos.

Elements

Video

Heading

Navigation buttons

Section 2 — How We Are Different

Layout:

Text | Image

Left Side

Heading

Description

Right Side

Image

Section 3 — Our Story

Contains NGO story.

Inside this section:

Timeline Component

Timeline shows NGO journey:

Example:

2005 — NGO started
2008 — First education program
2012 — Health initiatives
etc.

Purpose:

Show organizational growth.

Programs Page

Programs page is a single page with multiple sections.

Client wanted to avoid multiple program pages.

Programs accessible through navbar dropdown links.

Programs Included

Education

Health

Nutrition

Computer Literacy

Celebrations

Program Section Layout

Each section contains:

Section Heading

Main Image

Image Gallery

Minimal text (optional)

Example layout

Program Title

Main Image

Image Grid / Gallery
Image Image Image
Image Image Image

Images are the main storytelling element.

Impact Page

Purpose:

Show NGO results and real-world change.

Content will include:

Impact numbers

Impact stories

Photo documentation

Social outcomes

Structure may include:

Image blocks

Impact statistics

Photo galleries

This page may evolve later depending on content.

Dignitaries Page

Simple structured layout.

Repeated sections.

Layout:

Image | Text
Image | Text
Image | Text

Grid style presentation.

Each dignitary section includes:

Photo

Name

Title

Description

Image Handling

All images are stored in:

ImageKit

Existing ImageKit account will be reused.

Approach:

Manual copy of image URLs from ImageKit folders.

Reason:

Simpler than writing scripts and avoids debugging complexity.

Color Palette (Base)

Light Theme Base Colors

Primary: #c8b6ff
Accent: #b8c0ff
Highlight: #bbd0ff
Background: #e7c6ff
Secondary: #ffd6ff

These colors are not final and may change depending on client feedback.

Dark Theme

Dark theme will be implemented using CSS variables.

Theme switching handled by:

theme.js

Navbar toggle button switches between:

Light Theme

Dark Theme

UI Components Needed

Main components required:

Navbar

Navigation system.

Footer

Site footer.

Carousel

Image/video slider.

Image Card

Used in homepage sections.

Image Gallery

Used in programs page.

Section Block

Reusable content section.

Timeline

Used in About → Our Story.

Image + Text Layout

Used in dignitaries page.

Performance Guidelines

Use optimized images

Lazy load galleries

Avoid heavy JS libraries

Keep CSS simple

Minimize server requests

Development Goal

Create a clean, visual, and lightweight NGO website that clearly communicates the mission of Spread Smile India while keeping the experience simple and intuitive.