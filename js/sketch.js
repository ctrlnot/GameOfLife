const CELL_SIZE = 10;
const ROWS = 60; // i
const COLS = 60; // j

let grid = [];
let start = true;

function setup() {
  createCanvas(ROWS * CELL_SIZE, COLS * CELL_SIZE);

  // create 2d array of cells
  for(let i = 0; i < COLS; i++) {
    grid[i] = [];
    for(let j = 0; j < ROWS; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  frameRate(20);
}

function draw() {
  background(51);

  // simulate
  for(let i = 0; i < COLS; i++) {
    for(let j = 0; j < ROWS; j++) {
      if(start) grid[i][j].run();
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    start ? start = false : start = true;
  }
}
