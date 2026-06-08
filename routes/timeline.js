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
        src: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_2.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_3.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_4.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_2.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_3.jpg',
        caption: 'Humble Beginnings on the Street - community outreach session.',
        aspect: 'square'
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
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_3.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_4.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_5.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_6.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_7.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_8.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/women/women_1.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_1.jpg',
        caption: 'First Open-Air Classrooms - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_10.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_11.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_12.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_13.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_14.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_15.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_16.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_17.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_18.jpg',
        caption: 'Integrating Nutrition & Basic Support - community outreach session.',
        aspect: 'square'
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_19.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_2.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_20.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_21.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_22.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_23.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_24.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_25.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_26.jpg',
        caption: 'Holistic Health & Medical Checkups - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_27.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_28.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_29.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_3.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_30.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_4.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_5.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_6.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_7.jpg',
        caption: 'Community Empowerment & Enrollment Drives - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_8.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_9.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_1.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_2.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_3.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_4.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_5.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_6.jpg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/ambassadors/ambassador1.jpeg',
        caption: 'Launching the Tailoring & Skill Unit - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/ambassadors/ambassador2.jpeg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/ambassadors/ambassador3.jpeg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/ambassadors/ambassador4.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/ambassadors/letter4.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_2.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_3.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_4.jpg',
        caption: 'Building a Strong Signal Community - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_2.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_3.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_3.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_4.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_5.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_6.jpg',
        caption: 'Pandemic Response & Relief Operations - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_7.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_8.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/women/women_1.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_1.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_10.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_11.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_12.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_13.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_14.jpg',
        caption: 'Setting up the Digital Literacy Lab - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_15.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_16.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_17.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_18.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_19.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_2.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_20.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_21.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/covid/covid_19_22.jpg',
        caption: 'High Recognition & Growing Impact - community outreach session.',
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
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_1.jpg',
        caption: 'Health screening and checkup camp.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_2.jpg',
        caption: 'Frontline child diagnostic checks.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/programs/health/health_3.jpg',
        caption: 'Pediatric care and consultation camps.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg',
        caption: 'Students practicing dress designs in the tailoring lab.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_3.jpg',
        caption: 'Mothers drafting custom garment pattern cuttings.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg',
        caption: 'Showcasing decorative wax candles and gel molds.',
        aspect: 'square'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg',
        caption: 'Spoken English group interaction games.',
        aspect: 'wide'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg',
        caption: 'Joyful cultural folk dance practice session.',
        aspect: 'tall'
      },
      {
        type: 'image',
        src: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
        caption: 'Painting classes and origami creations.',
        aspect: 'square'
      }
    ]
  }
};;;;

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
