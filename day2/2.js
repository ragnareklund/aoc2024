const fs = require('node:fs');
const readline = require('node:readline');

const list = []

const rl = readline.createInterface({
  input: fs.createReadStream('day2/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  // console.log(`Line from file: ${line}`);
  let splitLine = line.split(/\s+/).map((n) => +n)
  list.push(splitLine);
});

const cmp = (a, b) => a - b;

const incDec = (a, b) => {
    let res = a - b;
    if (Math.abs(res) > 3) return 'unsafe';
    if (res < 0) return 'inc';
    if (res > 0) return 'dec';
    return 'unsafe'
}

const isSafe = (line) => {
  if (line.length == 1) return true;
  let state = incDec(line[0], line[1]);
  for(let i = 1; i<(line.length -1); i++) {
    let newState = incDec(line[i], line[i+1]);
    if(newState === 'unsafe' || state !== newState) return false;
    state = newState;
  }
  console.log(line);
  return true;
}

const mutatedArray = (line, indexToRemove) => {
  let ret = []
  for(let i in line) {
    if (i === indexToRemove) continue;
    ret.push(line[i]);
  }
  return ret;
}

rl.on('close', () => {
  let sum = 0;

  for(let v of list) {
    for(let i in v) {
      if (isSafe(mutatedArray(v, i))) {
        sum++;
        break;
      }
    }
  }

  console.log(`Sum: ${sum}`)
});