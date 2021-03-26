const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./Extract/characteristic_reviews.csv');
const writeStream = fs.createWriteStream('./Transformed/charReviews-transformed.csv');

const rl = readline.createInterface({
  input: readStream,
  output: writeStream
})

rl.on('line', (line) => {
  let checkedCharReview = checkCharReview(line);
  if (checkedCharReview) {
    rl.output.write(`${checkedCharReview}\n`);
  }
})

let checkCharReview = (line) => {
  let columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  let charReviewId = columns[0];
  let characteristicId = columns[1];
  let reviewId = columns[2];
  let rating = columns[3];

  if (Number.isNaN(charReviewId)) {
    return false;
  }
  if (Number.isNaN(characteristicId)) {
    return false;
  }
  if (Number.isNaN(reviewId)) {
    return false;
  }
  if (Number.isNaN(charReviewId) || rating < 0 || rating > 5) {
    return false;
  }
  return columns;
}