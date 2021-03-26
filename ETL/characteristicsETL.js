const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./Extract/characteristics.csv');
const writeStream = fs.createWriteStream('./Transformed/characteristics-transformed.csv');

const rl = readline.createInterface({
  input: readStream,
  output: writeStream
})

rl.on('line', (line) => {
  let checkedCharacteristic = checkCharacteristic(line);
  if (checkedCharacteristic) {
    rl.output.write(`${checkedCharacteristic}\n`);
  }
})

let checkCharacteristic = (line) => {
  let columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  let characteristicId = columns[0];
  let productId = columns[1];
  let characteristic = columns[2];

  if (Number.isNaN(characteristicId)) {
    return false;
  }
  if (Number.isNaN(productId)) {
    return false;
  }
  if (typeof characteristic !== 'string') {
    return false;
  }
  return columns;
}