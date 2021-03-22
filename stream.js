const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./Extract_SampleData/reviews10.csv'),
  
})