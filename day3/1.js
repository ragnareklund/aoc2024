const fs = require('node:fs');
const readline = require('node:readline');

var input = ""

const rl = readline.createInterface({
  input: fs.createReadStream('day3/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  // console.log(`Line from file: ${line}`);
  input += line;
});

const findNumbers = (data) => {
    numbers = [...data.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)].map(v => [...v[0].matchAll(/\d+/g)]);
    let res = 0;
    for(v of numbers) {
      res += v[0] * v[1]
    }
    console.log(res);
}

rl.on('close', () => {
  findNumbers(input);
});