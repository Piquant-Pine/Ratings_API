const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./Extract/reviews.csv');
const writeStream = fs.createWriteStream('./Transformed/reviews-transformed.csv')

const rl = readline.createInterface({
  input: readStream,
  output: writeStream
});

rl.on('line', (line) => {
  let checkedReview = checkReview(line);
  if (checkedReview) {
    rl.output.write(`${checkedReview}\n`);
  }
})


let checkReview = (line) => {
  let columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  let reviewId = columns[0];
  let productId = columns[1];
  let rating = columns[2];
  let date = columns[3];
  let summary = columns[4];
  let body = columns[5];
  let recommend = columns[6];
  let reported = columns[7];
  let reviewerName = columns[8];
  let reviewerEmail = columns[9];
  let response = columns[10];
  let helpfulness = columns[11];

  if (Number.isNaN(reviewId)) {
    return false;
  }
  if (Number.isNaN(productId)) {
    return false;
  }
  if (Number.isNaN(rating) || rating < 0 || rating > 5) {
    return false;
  }
  if (typeof date !== 'string') {
    return false;
  }
  if (typeof summary !== 'string') {
    return false;
  }
  if (typeof body !== 'string') {
    return false;
  }
  if (recommend === true) {
    recommend = 1;
  } else {
    recommend = 0;
  }
  if (reported === true) {
    reported = 1;
  } else {
    reported = 0;
  }
  if (typeof reviewerName !== 'string') {
    return false;
  }
  if (typeof reviewerEmail !== 'string') {
    return false;
  }
  if (Number.isNaN(helpfulness)) {
    return false;
  }
  return columns;
}