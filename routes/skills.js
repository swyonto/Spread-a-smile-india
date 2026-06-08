const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sections = [
    {
      id: 'skill-tailoring',
      title: 'Tailoring Unit',
      intro: 'Empowering women and adolescent girls with professional stitching and handloom design skills.',
      main: {
        tag: 'Vocational Training',
        heading: 'Sewing dreams into reality',
        text: 'Our tailoring unit provides vocational training in fabric cutting, machine operations, garment stitching, and traditional embroidery. It enables participants to start home micro-enterprises or secure stable employment in apparel design.',
        image: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg?tr=q-80',
        alt: 'Tailoring classes',
        points: ['Pattern drafting and garment tailoring', 'Sewing machine maintenance and operation', 'Exhibiting custom-made apparel']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_3.jpg',
          alt: 'Tailoring pattern cutting'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_4.jpg',
          alt: 'Embroidery class'
        }
      ]
    },
    {
      id: 'skill-candle',
      title: 'Candle Unit',
      intro: 'A creative workshop for crafting decorative, scented, and organic wax products.',
      main: {
        tag: 'Creative Entrepreneurship',
        heading: 'Handcrafted light and opportunity',
        text: 'Participants learn the science of wax chemistry, fragrance blending, and molding. During festivals, these candles are sold locally, teaching students marketing and direct income creation.',
        image: 'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg?tr=q-80',
        alt: 'Candle making training',
        points: ['Scented, decorative, and gel candle making', 'Raw materials management & color theory', 'Festive sales and product packaging']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/candle/candle_2.jpg',
          alt: 'Diwali candles'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/candle/candle_3.jpg',
          alt: 'Packaging materials'
        }
      ]
    },
    {
      id: 'skill-english',
      title: 'Spoken English Unit',
      intro: 'Language classes designed to build conversational confidence, pronunciation, and basic vocabulary.',
      main: {
        tag: 'Language Skills',
        heading: 'Breaking language barriers',
        text: 'Classes focus on breaking communication barriers. Through interactive conversation games, reading circles, and group discussion drills, students develop language fluency and interview readiness.',
        image: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg?tr=q-80',
        alt: 'English class',
        points: ['Everyday conversational grammar', 'Public speaking and pronunciation labs', 'Confidence building and interactive skits']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_2.jpg',
          alt: 'Reading practice'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_3.jpg',
          alt: 'Speaking lab'
        }
      ]
    },
    {
      id: 'skill-dance',
      title: 'Dance Workshop',
      intro: 'Connecting children to rhythm, physical fitness, and cultural expressions.',
      main: {
        tag: 'Cultural Activity',
        heading: 'Joy in rhythm and expression',
        text: 'Dance classes offer a joyful physical outlet, building teamwork, coordination, and creative presence. Children learn classical and contemporary folk routines, boosting their stage confidence.',
        image: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg?tr=q-80',
        alt: 'Dance workshop',
        points: ['Classical and folk dance choreography', 'Rhythmic timing and stage expression', 'Cooperative group performance skills']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg',
          alt: 'Stage performance'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/programs/celebrations/zoo%20park.jpg',
          alt: 'Outdoor group dance'
        }
      ]
    },
    {
      id: 'skill-singing',
      title: 'Singing Unit',
      intro: 'Vocal coaching classes to help children discover pitch control and chorus coordination.',
      main: {
        tag: 'Musical Training',
        heading: 'Nurturing vocal talent',
        text: 'Music offers a therapeutic and healing medium. Children practice vocal scales, group chorus harmonies, and cultural melodies, helping them build stage presence and musical appreciation.',
        image: 'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/image%207.jpg?updatedAt=1773644101961',
        alt: 'Singing classes',
        points: ['Basic vocal exercise and scales', 'Chorus singing and pitch coordination', 'Solo and performance coaching']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/programs/nutrition/image%202.jpg',
          alt: 'Chorus practice'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/programs/celebrations/movie%20party.jpg',
          alt: 'Solo performance'
        }
      ]
    },
    {
      id: 'skill-arts',
      title: 'Arts & Crafts',
      intro: 'Unleashing kids\' creative imagination through sketching, painting, and recycling crafts.',
      main: {
        tag: 'Creative Arts',
        heading: 'Painting a brighter future',
        text: 'Children explore drawing, painting, origami, and crafting products out of waste materials. It promotes spatial skills, fine motor coordination, and provides a peaceful medium for visual self-expression.',
        image: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
        alt: 'Arts & crafts workshop',
        points: ['Sketching, drawing & color mixing', 'Origami & decorative paper crafting', 'Recycled material art creations']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
          alt: 'Painting session'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/transformation/transformation1.jpg',
          alt: 'Craft exhibition'
        }
      ]
    }
  ];

  res.render('pages/skills', { 
    title: 'Skill Development | Spread Smile India',
    description: 'Learn about Spread Smile India\'s vocational and creative training programs, including Tailoring, Candle Making, Spoken English, Singing, and Arts.',
    urlPath: '/skill-development',
    sections
  });
});

module.exports = router;
