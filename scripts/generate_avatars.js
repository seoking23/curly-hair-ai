const fs = require('fs');
const https = require('https');
const path = require('path');

const AVATAR_TYPES = [
  {
    name: 'curly_3b_avatar',
    seed: 'sarah-3b-curls',
    options: {
      hair: 'curly',
      hairColor: '6d4c41',
      backgroundColor: 'b2ebf2',
    },
  },
  {
    name: 'coily_4a_avatar',
    seed: 'michelle-4a-coils',
    options: {
      hair: 'coily',
      hairColor: '3e2723',
      backgroundColor: 'ffccbc',
    },
  },
  {
    name: 'curly_3c_avatar',
    seed: 'jessica-3c-curls',
    options: {
      hair: 'curly',
      hairColor: '4a2c1e',
      backgroundColor: 'e1bee7',
    },
  },
];

const AVATAR_SIZE = 96;
const OUTPUT_DIR = path.join(__dirname, '../src/assets/images/avatars');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {recursive: true});
}

// Generate avatars using DiceBear API
AVATAR_TYPES.forEach(avatar => {
  const optionsString = Object.entries(avatar.options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const url = `https://api.dicebear.com/7.x/personas/png?seed=${avatar.seed}&size=${AVATAR_SIZE}&${optionsString}`;
  const outputPath = path.join(OUTPUT_DIR, `${avatar.name}.jpg`);

  https
    .get(url, response => {
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        console.log(`Generated ${avatar.name}`);
        fileStream.close();
      });
    })
    .on('error', err => {
      console.error(`Error generating ${avatar.name}:`, err.message);
    });
});
