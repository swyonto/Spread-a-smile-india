const http = require('https');

const urls = [
  'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/tailoring/tailoring_4.jpg',
  'https://ik.imagekit.io/l15cczdgu/candle/candle_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/candle/candle_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/candle/candle_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_2.jpg',
  'https://ik.imagekit.io/l15cczdgu/spoken_english/spoken_english_3.jpg',
  'https://ik.imagekit.io/l15cczdgu/dance/dance_1.jpg',
  'https://ik.imagekit.io/l15cczdgu/arts/art_1.jpg'
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
  console.log('\n--- ROOT PATH DIAGNOSTIC RESULTS ---');
  results.forEach((r) => {
    console.log(`${r.status === 200 ? '✅' : '❌'} [${r.status}] ${r.url}`);
  });
  console.log('-------------------------------------\n');
});
