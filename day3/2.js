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

const parseMul = (val) => {
  let vals = [...val.matchAll(/\d+/g)];
  console.log(vals);
  return vals[0] * vals[1];
}

const findNumbers = (data) => {
    numbers = [...data.matchAll(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g)].map(v => v[0]);
    let res = 0;
    let active = true
    for(v of numbers) {
      if(v.includes('mul') && active)
        res += parseMul(v);
      if(v.includes('do()'))
        active = true;
      if(v.includes("don't()"))
        active = false;
    }
    console.log(res);
}

rl.on('close', () => {
  findNumbers(input);
});