const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./Extract/reviews_photos.csv');
const writeStream = fs.createWriteStream('./Transformed/photos-transformed.csv');

const rl = readline.createInterface({
  input: readStream,
  output: writeStream
})

rl.on('line', (line) => {
  let checkedPhoto = checkPhoto(line);
  if (checkedPhoto) {
    rl.output.write(`${checkedPhoto}\n`);
  }
})

let checkPhoto = (line) => {
  let columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  let photoId = columns[0];
  let reviewId = columns[1];
  let photoURL = columns[2];

  if (Number.isNaN(photoId)) {
    return false;
  }
  if (Number.isNaN(reviewId)) {
    return false;
  }
  if (typeof photoURL !== 'string') {
    return false;
  }
  return columns;
}