const http = require('https');

const pathsToTest = [
  // Underscore skill_development path
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/candle/candle_1.jpg',
  
  // Hyphen skill-development path
  'https://ik.imagekit.io/l15cczdgu/programs/skill-development/tailoring/tailoring_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/programs/skill-development/candle/candle_1.jpg',
  
  // Direct folder path at root
  'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_1.heic',
  'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg',
  
  // Lowercase/Uppercase variations
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_1.HEIC',
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/tailoring/tailoring_1.heic',
  
  // Check active uploaded-assets.json content folder
  'https://ik.imagekit.io/l15cczdgu/programs/skill_development/spoken_english/spoken_english_1.jpg'
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

Promise.all(pathsToTest.map(checkUrl)).then((results) => {
  console.log('\n--- PATH VARIATION RESULTS ---');
  results.forEach((r) => {
    console.log(`${r.status === 200 ? '✅' : '❌'} [${r.status}] ${r.url}`);
  });
  console.log('-------------------------------\n');
});
