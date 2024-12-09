const fs = require('node:fs');
const readline = require('node:readline');

var rules = {};
var pages = [];

const rl = readline.createInterface({
  input: fs.createReadStream('day5/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  if (line.includes('|')) {
    let [rule, page] = line.split('|');
    rules[rule] = rules[rule] ?? []
    rules[rule].push(page);
  }

  if(line.includes(',')) {
    pages.push(line.split(','));
  }
});

const applyRule = (pageSet) => {
  for(let i = 0; i<pageSet.length; i++) {
    let page = pageSet[i];
    for(let j=i+1; j<pageSet.length; j++) {
      let otherPage = pageSet[j];
      let rule = rules[otherPage] || [];
      if (rule.includes(page)) return [i, j];
    }
  }
  return true;
}

function swap(array, a, b){
  let tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

const fixOrder = (pageSet) => {
  let res = applyRule(pageSet);
  if (res === true) return 0;
  while(res !== true) {
    swap(pageSet, res[0], res[1]);
    res = applyRule(pageSet);
  }

  return +pageSet[Math.floor(pageSet.length/2)];
}


rl.on('close', () => {
  let sum = 0;
  for(let pageSet of pages) {
    sum += fixOrder(pageSet);
  }
  console.log(sum);
});