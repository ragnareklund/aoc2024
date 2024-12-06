const fs = require('node:fs');
const readline = require('node:readline');

var input = [];
var maxY = 0;
var minY = 0;
var maxX = 0;
var minX = 0;

const N  = [0,1];
const NE = [1,1];
const E  = [1,0];
const SE = [1,-1];
const S  = [0,-1];
const SW = [-1,-1];
const W  = [-1,0];
const NW = [-1,1];


const directions = [NE,SE,SW,NW]

const rl = readline.createInterface({
  input: fs.createReadStream('day4/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  // console.log(`Line from file: ${line}`);
  input.push(line.split(""));
});

const outOfBounds = ([x, y]) => {
  return x < minX || y < minY || x >= maxX || y >= maxY;
}

const searcher = (x, y) => {
  let found = 0;
  if (input[y][x] !== 'A') return 0;
  
  let [neX, neY] = [(x + NE[0]), (y + NE[1])];
  let [seX, seY] = [(x + SE[0]), (y + SE[1])];
  let [swX, swY] = [(x + SW[0]), (y + SW[1])];
  let [nwX, nwY] = [(x + NW[0]), (y + NW[1])];

  if([[neX, neY], [seX, seY], [swX, swY], [nwX, nwY]].some(outOfBounds)) return 0;

  let w1 = input[neY][neX] + "A" + input[swY][swX];
  let w2 = input[seY][seX] + "A" + input[nwY][nwX];

  const ok = ['MAS', 'SAM'];

  if(ok.includes(w1) && ok.includes(w2)) found++;

  console.log(found);
  return found;
}

rl.on('close', () => {
  maxY = input.length;
  maxX = input[0].length;
  console.log(input);
  let found = 0;
  for(let y=0; y<input.length; y++) {
    for(let x=0; x<input[y].length; x++) {
      found += searcher(x, y);
    }
  }
  console.log(found);
});