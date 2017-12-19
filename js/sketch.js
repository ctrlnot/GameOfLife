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

  frameRate(15);
}

function draw() {
  background(51);

  // preserve the previous state of a cell
  for(let i = 0; i < COLS; i++) {
    for(let j = 0; j < ROWS; j++) {
      grid[i][j].preservePreviousState();
    }
  }

  // simulate
  for(let i = 0; i < COLS; i++) {
    for(let j = 0; j < ROWS; j++) {
      grid[i][j].run();
    }
  }
}

function mousePressed() {
  if (mouseX <= width && mouseY <= height) {
    const g = grid[floor(mouseX / CELL_SIZE)][floor(mouseY / CELL_SIZE)];
    if (g.state === 1) {
      g.prevState = g.state;
      g.state = 0;
    } else {
      g.prevState = g.state;
      g.state = 1;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    start ? start = false : start = true;
  }
}
