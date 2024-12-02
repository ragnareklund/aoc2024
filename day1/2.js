const fs = require('node:fs');
const readline = require('node:readline');

const firstCol = []
const secondCol = []
const secondMap = {}

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
  secondMap[+second] = secondMap[+second] ? secondMap[+second] += 1 : 1;
});

const cmp = (a, b) => a - b;

const getSimilarity = (a, map) => {
  return a * (map[a] || 0);
}

rl.on('close', () => {
  firstCol.sort(cmp);
  secondCol.sort(cmp);
  console.log(firstCol);

  let sum = 0;

  for(let i = 0; i<firstCol.length; i++) {
    sum += getSimilarity(firstCol[i], secondMap);
  }

  console.log(`Sum: ${sum}`)
});

