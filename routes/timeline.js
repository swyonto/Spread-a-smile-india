const express = require('express');
const router = express.Router();

// Static data structure for years since 2005
const timelineData = {
  '2005-2006': {
    badge: 'Founding Year',
    title: 'Humble Beginnings on the Street',
    desc: 'Sangita Mehra began her journey on the pavements of Delhi. Distressed by seeing children begging at traffic signals, she started teaching a small group of children in the open air, bringing hope and dignity into their lives.',
    highlights: [
      'Started teaching 5 street children at a Delhi traffic signal',
      'Distributed basic stationery and educational charts',
      'Built trust with street families and community elders'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/image%209.jpg',
        caption: 'First class session on the streets of Delhi, 2005.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/image.png?updatedAt=1773397384285',
        caption: 'Sangita Mehra introducing basic alphabet writing to street children.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/education/education%201.jpeg',
        caption: 'Gathering children under trees to build a learning routine.',
        aspect: 'tall'
      }
    ]
  },
  '2007-2008': {
    badge: 'New Path',
    title: 'First Open-Air Classrooms',
    desc: 'We organized pavements into structured open-air learning sites. With support from local volunteers, we turned parts of public parks and street corners into spaces of learning.',
    highlights: [
      'Grew to serve over 35 children regularly across 2 signals',
      'Introduced basic uniforms and identification badges',
      'Conducted first cultural and performance day for street kids'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/image%208.jpg',
        caption: 'First batch of students sitting in order in our park classroom, 2008.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/celebrations/image%205.jpg',
        caption: 'National holiday celebrations under an open sky.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/education/education%202.jpeg',
        caption: 'Volunteers helping children with reading skills.',
        aspect: 'square'
      }
    ]
  },
  '2009-2010': {
    badge: 'More Trust',
    title: 'Integrating Nutrition & Basic Support',
    desc: 'Recognizing that hunger is a major barrier to learning, we introduced daily nutritional meals. This significantly improved classroom attendance and children’s energy levels.',
    highlights: [
      'Launched the daily breakfast program (fruits, milk, and eggs)',
      'Organized regular clean water facilities at learning spots',
      'Attendance stabilized to over 85% throughout the year'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/nutrition%20card%20image?updatedAt=1773393015064',
        caption: 'Serving morning meals to students before classes.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/nutrition/image%202.jpg',
        caption: 'Weekly fresh fruit distribution drive.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/nutrition/nutrition-1767865195461_zdhiieEsx.jpg',
        caption: 'Lunch session with high-nutrient pulses and rice.',
        aspect: 'wide'
      }
    ]
  },
  '2011-2012': {
    badge: 'Holistic Care',
    title: 'Holistic Health & Medical Checkups',
    desc: 'We started regular doctor visits and medical checkups for children. Setting up health cards helped us monitor height, weight, and key physical parameters.',
    highlights: [
      'Introduced monthly pediatric medical camps',
      'Created individual child health logs to track malnutrition',
      'Provided emergency medicines and vision screenings'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/timeline/2012.JPG',
        caption: 'Our team member reviewing health records during a general camp.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health-1767865132657_RW9g8QISfn.jpg',
        caption: 'Doctors conducting eye screenings for primary students.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/image%201.jpg',
        caption: 'Regular diagnostic checks in the temporary health booth.',
        aspect: 'square'
      }
    ]
  },
  '2013-2014': {
    badge: 'Community Bridge',
    title: 'Community Empowerment & Enrollment Drives',
    desc: 'We worked directly with parents to prevent school dropouts. Our team started aiding in formal government school admissions for street children, bridging pavements to institutional classrooms.',
    highlights: [
      'Formally enrolled 50+ children into government primary schools',
      'Held regular monthly counseling workshops for street mothers',
      'Distributed school uniforms and official textbooks'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/20250419_170209.jpg',
        caption: 'Mothers gathering for our monthly awareness session on education.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/education/academic/20251230_165344_-qE_5qeNe.jpg',
        caption: 'Formal school students showing their brand new textbook kits.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/education/academic/20251230_164855_eLpGfyFg0.jpg',
        caption: 'Primary school student focusing on math homework.',
        aspect: 'square'
      }
    ]
  },
  '2015-2016': {
    badge: '10 Years of Celebration',
    title: 'Launching the Tailoring & Skill Unit',
    desc: 'To support financial independence for mothers and older girls, we launched the Tailoring Unit. This provided vocational skills that could earn them livelihood without having to leave home.',
    highlights: [
      'Installed our first 5 professional sewing machines',
      'Enrolled 20 women in the first basic stitching certification course',
      'Started selling handcrafted bags and kurtas at local exhibitions'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/timeline/2015.JPG',
        caption: 'Our first batch of tailoring graduates learning dress designs.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/women%20Empowerment%20slide%20inage',
        caption: 'A student working on modern tailoring pattern cutting.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/education/skill/20250502_153536_2qk1Ls_Ci.jpg',
        caption: 'Mothers sharing ideas for festival embroidery designs.',
        aspect: 'square'
      }
    ]
  },
  '2017-2018': {
    badge: 'Expanding Footprint',
    title: 'Building a Strong Signal Community',
    desc: 'Spread Smile India grew its footprint to reach 5+ traffic signals across Delhi, ensuring that kids begging at ITO, Munirka, and AIIMS junctions were brought into education channels.',
    highlights: [
      'Expanded operation reach to 5 traffic signals in Delhi NCR',
      'Grew active student enrollment base to over 150 children',
      'Secured regular donation partners to ensure programmatic funding'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/timeline/2024.jpg?updatedAt=1773477013527',
        caption: 'Group photo of our extended street community at a signal, 2018.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/transformation/story1.jpg',
        caption: 'A child begging at a signal, before joining our learning ranks.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/transformation/story1.1.jpg',
        caption: 'The same child attending primary class and smiling, showing hope.',
        aspect: 'square'
      }
    ]
  },
  '2019-2020': {
    badge: 'Great Achievement',
    title: 'Pandemic Response & Relief Operations',
    desc: 'As COVID-19 shut down the city, our classrooms shifted to survival mode. We distributed dry rations, masks, and sanitizers, supporting hundreds of families through job losses and health crises.',
    highlights: [
      'Delivered dry rations and grocery kits to over 800 slum families',
      'Distributed 2,500+ hygiene and safety mask packages',
      'Arranged emergency medical checkups and sanitizer distribution drives'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/nutrition/nutrition-1767865195461_zdhiieEsx.jpg',
        caption: 'Frontline relief dry ration distribution lines in Delhi slums.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/image%203.jpg',
        caption: 'Checking temperatures and providing medical-grade safety masks.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/image%201.jpg',
        caption: 'Organizing vaccine registration camps in our local center.',
        aspect: 'square'
      }
    ]
  },
  '2021-2022': {
    badge: 'Digital Leap',
    title: 'Setting up the Digital Literacy Lab',
    desc: 'We inaugurated our Computer Literacy Lab to equip children with modern digital capabilities. This expanded educational outcomes, introducing computers to first-generation learners.',
    highlights: [
      'Setup a physical lab with computer systems and accessories',
      'Enrolled 40+ middle school children in computer basic course',
      'Introduced typing software, graphic design, and basic MS Office'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/computer%20unit/image%200.jpg',
        caption: 'Opening day of the digital learning center, 2021.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/computer%20unit/image%203.jpg',
        caption: 'Students practicing typing layout on computer systems.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/computer%20unit/image%201.jpg',
        caption: 'MS PowerPoint presentations built by our students.',
        aspect: 'square'
      }
    ]
  },
  '2023-2024': {
    badge: 'High Recognition',
    title: 'High Recognition & Growing Impact',
    desc: 'Our work was recognized by ministers and international ambassadors, validating our grassroots model. Today, we run daily programs spanning education, health, and skill units.',
    highlights: [
      'Visited by H.E. Ambassador of Guatemala and other dignitaries',
      'Recognized formally for transforming street-begging kids into learners',
      'Expanded our signal reach to 7+ signals in Delhi and NCR'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/timeline/IMG20240204174640.heic',
        caption: 'H.E. Ambassador Omar Lisandro visiting and playing with our students, 2024.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'assets/ambassadors/ambassador1.jpeg',
        caption: 'Shri Kiren Rijiju interacting with Sangita Mehra.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'assets/ambassadors/ambassador3.jpeg',
        caption: 'With H.E. Pattarat Hongtong, Ambassador of Thailand.',
        aspect: 'square'
      }
    ]
  },
  '2025-2026': {
    badge: 'Future Horizons',
    title: 'Looking Forward: Expanding Horizons',
    desc: 'Entering a new era of growth. We are expanding our Candle Unit, initiating Spoken English modules, and introducing structured sports days and field outings to give kids a rich, celebrated childhood.',
    highlights: [
      'Total children under daily care increased to 200+',
      'Launched Candle Unit and Spoken English modules',
      'Conducted educational field trips to National Zoo Park'
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/timeline/2025.jpg',
        caption: 'Children smiling during their class at the Munirka center, 2025.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/celebrations/zoo%20park.jpg',
        caption: 'Field trip outing group photo at the National Zoo Park.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/8.jpg?updatedAt=1773396969419',
        caption: 'Students showcasing candle making creations.',
        aspect: 'square'
      }
    ]
  }
};

// GET /timeline page
router.get('/', (req, res) => {
  res.render('pages/timeline', { 
    title: 'Timeline | Spread Smile India', 
    description: 'Explore the journey and milestones of Spread Smile India NGO from 2005 onwards, detailing our growth, community impacts, and celebrations.',
    urlPath: '/timeline',
    timelineData 
  });
});

// GET /api/timeline/:year
router.get('/api/:year', (req, res) => {
  const year = req.params.year;
  if (timelineData[year]) {
    res.json(timelineData[year]);
  } else {
    res.status(404).json({ error: 'Year data not found' });
  }
});

module.exports = router;
