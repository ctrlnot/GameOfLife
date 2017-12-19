const w = 10; // Width of each cell
/*
      C O L U M N S
    R 
    O
    W
    S
*/
var rows, cols;
var grid = [];
var start = false;

function setup() {
  // createCanvas(1300, 650);
  createCanvas(600, 600);

  rows = floor(height / w);
  cols = floor(width / w);

  for (let x = 0; x < cols; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = new Cell(x, y);
    }
  }

  frameRate(30);

  // console.log((0 + (-1) + 10) % 10);
}

function draw() {
  background(51);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (start) grid[x][y].generate();
      grid[x][y].hover(mouseX, mouseY);
      grid[x][y].show();
    }
  }

  // console.log(start);
}

function mousePressed() {
  if (mouseX <= width && mouseY <= height) {
    let g = grid[floor(mouseX / w)][floor(mouseY / w)];
    if (g.curr === 1) {
      g.prev = g.curr;
      g.curr = 0;
    } else {
      g.prev = g.curr;
      g.curr = 1;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    start ? start = false : start = true;
  }
}