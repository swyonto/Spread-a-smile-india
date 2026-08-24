const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sections = [
    {
      id: 'skill-tailoring',
      title: 'Tailoring & Livelihood',
      intro: 'We help women and young girls learn tailoring and stitching skills that can give them a way to earn, support their families, and become more financially independent.',
      main: {
        tag: 'LEARNING TO EARN',
        heading: 'A Skill, A Chance, A New Beginning',
        text: 'At Spread A Smile India, women learn practical skills such as cutting, stitching, embroidery, and sewing. With these skills, they can take up work, stitch for others, or start earning from home.',
        image: 'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg?tr=q-80',
        alt: 'Tailoring classes',
        points: [
          'Tailoring and stitching skills',
          'Sewing machine training',
          'Cutting, pattern making, and embroidery',
          'Creating clothes and products for sale',
          'Skills that can lead to income and independence'
        ]
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
      title: 'Candle Making',
      intro: 'At Spread A Smile India, women learn to make beautiful scented and decorative candles right here at our centre. What starts as a skill becomes an opportunity to create, earn, and become more financially independent.',
      main: {
        tag: 'LEARNING TO CREATE',
        heading: 'Made by Hand, Made with Purpose',
        text: 'Our women learn candle making from the basics, experimenting with colours, fragrances, shapes, and designs. The candles they create are used for celebrations and special occasions, giving them a chance to turn their skills into an income.',
        image: 'https://ik.imagekit.io/l15cczdgu/candle/%7BCBC32225-57F7-4CE1-B478-907231FF8783%7D.png',
        alt: 'Candle making training',
        points: [
          'Scented and decorative candle making',
          'Learning colours, fragrances, and different designs',
          'Making candles for festivals and special occasions',
          'Packaging and preparing candles for sale',
          'Creating opportunities to earn from their skills'
        ]
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/candle/%7BBD51088A-7175-431B-B358-3FEF2249D11D%7D.png',
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
      title: 'Spoken English',
      intro: 'For many children, speaking English can feel difficult and intimidating. At Spread A Smile India, we help them practise, speak, ask questions, and express themselves without fear. With regular classes and encouragement, they slowly gain the confidence to use English in school and in everyday life.',
      main: {
        tag: 'LEARNING TO SPEAK WITH CONFIDENCE',
        heading: 'From Hesitant Words to Confident Voices',
        text: 'Our classes focus on everyday English, conversation, reading, pronunciation, and speaking. Children learn by talking, practising, and taking part in activities rather than simply memorising lessons.',
        image: 'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg?tr=q-80',
        alt: 'English class',
        points: [
          'Everyday English and conversation',
          'Reading and pronunciation',
          'Speaking and expressing ideas',
          'Confidence through practice'
        ]
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
      intro: 'Dance gives children a chance to express themselves, stay active, discover their talents, and simply enjoy being children. At Spread A Smile India, our dance sessions give them a space to learn, practise, perform, and grow in confidence.',
      main: {
        tag: 'DANCE & EXPRESSION',
        heading: 'A Place to Dance, Play & Shine',
        text: 'Children learn different forms of dance, from classical and folk to contemporary styles. More than learning steps, the sessions help them come out of their comfort zone, work together, and enjoy the confidence that comes from performing.',
        image: 'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg?tr=q-80',
        alt: 'Dance workshop',
        points: [
          'Classical, folk, and contemporary dance',
          'Regular practice and choreography',
          'Group performances and celebrations',
          'Building confidence through performance'
        ]
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/dance/IMG-20231014-WA0323.jpg?updatedAt=1784187892440',
          alt: 'Stage performance'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/dance/IMG_20220704_173138.jpg?updatedAt=1784187901814',
          alt: 'Outdoor group dance'
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
        image: 'https://ik.imagekit.io/l15cczdgu/art/IMG-20240614-WA0114.jpg',
        alt: 'Arts & crafts workshop',
        points: ['Sketching, drawing & color mixing', 'Origami & decorative paper crafting', 'Recycled material art creations']
      },
      cards: [
        {
          image: 'https://ik.imagekit.io/l15cczdgu/art/art_1.jpg',
          alt: 'Painting session'
        },
        {
          image: 'https://ik.imagekit.io/l15cczdgu/art/IMG_20180915_182506.jpg',
          alt: 'Craft exhibition'
        }
      ]
    }
  ];

  res.render('pages/skills', {
    title: 'Skill Development | Spread Smile India',
    description: 'Learn about Spread Smile India\'s vocational and creative training programs, including Tailoring, Candle Making, Spoken English, and Arts.',
    urlPath: '/skill-development',
    sections
  });
});

module.exports = router;
