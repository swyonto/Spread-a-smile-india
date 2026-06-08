const http = require('https');

const urls = [
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_1.heic',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_4.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/candle/candle_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/candle/candle_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/candle/candle_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/spoken_english/spoken_english_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/spoken_english/spoken_english_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/spoken_english/spoken_english_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/dance/dance_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/celebrations/zoo%20park.jpg',
  'https://ik.imagekit.io/l15cczdgu/Landing%20page/carouselSlides/image%207.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/nutrition/image%202.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/celebrations/movie%20party.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/arts/art_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/transformation/transformation1.jpg'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = http.request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 'ERROR: ' + err.message });
    });
    req.end();
  });
}

Promise.all(urls.map(checkUrl)).then((results) => {
  console.log('\n--- DIAGNOSTIC RESULTS ---');
  results.forEach((r) => {
    console.log(`${r.status === 200 ? '✅' : '❌'} [${r.status}] ${r.url}`);
  });
  console.log('---------------------------\n');
});
