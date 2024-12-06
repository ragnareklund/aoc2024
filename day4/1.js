const fs = require('node:fs');
const readline = require('node:readline');

var input = [];
const N  = [[0,1],[0,2],[0,3]];
const NE = [[1,1],[2,2],[3,3]];
const E  = [[1,0],[2,0],[3,0]];
const SE = [[1,-1],[2,-2],[3,-3]];
const S  = [[0,-1],[0,-2],[0,-3]];
const SW = [[-1,-1],[-2,-2],[-3,-3]];
const W  = [[-1,0],[-2,0],[-3,0]];
const NW = [[-1,1],[-2,2],[-3,3]];
const directions = [N,NE,E,SE,S,SW,W,NW]

const rl = readline.createInterface({
  input: fs.createReadStream('day4/input.txt'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  // console.log(`Line from file: ${line}`);
  input.push(line.split(""));
});

const searcher = (x, y) => {
  let found = 0;
  if (input[y][x] !== 'X') return 0;

  for(let direction of directions) {
    let word = "X"
    for(let mod of direction) {
      let [modX, modY] = [mod[0] + x, mod[1] + y];
      if (modX < 0 || modY < 0 || modX >= input[y].length || modY >= input.length) continue;
      word += input[modY][modX];
    }
    if (word === 'XMAS') found++
  }
  console.log(found);
  return found;
}

rl.on('close', () => {
  console.log(input);
  let found = 0;
  for(let y=0; y<input.length; y++) {
    for(let x=0; x<input[y].length; x++) {
      found += searcher(x, y);
    }
  }
  console.log(found);
});