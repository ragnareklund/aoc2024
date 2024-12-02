const fs = require('node:fs');
const readline = require('node:readline');

const firstCol = []
const secondCol = []

const rl = readline.createInterface({
  input: fs.createReadStream('day1/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  // console.log(`Line from file: ${line}`);
  let first, second;
  [first, second] = line.split(/\s+/)
  firstCol.push(+first);
  secondCol.push(+second);
});

const cmp = (a, b) => a - b;

const getDistance = (a, b) => {
  return Math.abs(a - b);
}

rl.on('close', () => {
  firstCol.sort(cmp);
  secondCol.sort(cmp);
  console.log(firstCol);

  let sum = 0;

  for(let i = 0; i<firstCol.length; i++) {
    sum += getDistance(firstCol[i], secondCol[i]);
  }

  console.log(`Sum: ${sum}`)
});

