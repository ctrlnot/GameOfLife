class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j

    this.state = floor(random(2))
    this.prevState = this.state
  }

  calculateNeighbors() {
    let total = 0

    // calculate neighbors as in
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        total += grid[(this.i + i + COLS) % COLS][(this.j + j + ROWS) % ROWS].prevState
      }
    }

    // minus itself
    total -= this.prevState

    return total
  }

  nextGeneration() {
    this.prevState = this.state // update the previous state
    const neighbors = this.calculateNeighbors()

    // if cell is dead but has 3 neighbors.. make it alive!
    if(this.state === 0 && neighbors === 3) {
      this.state = 1
    } 

    // if < 2 neighbors.. it dies of loneliness :(
    // if > 3 neighbors.. it dies of overpopulation
    if(this.state === 1 && (neighbors < 2 || neighbors > 3)) {
      this.state = 0
    }
  }

  show() {
    let x = this.i * CELL_SIZE
    let y = this.j * CELL_SIZE

    if(this.state) {
      fill(255)
      stroke(51)
      rect(x, y, CELL_SIZE - 1, CELL_SIZE - 1)
    }
  }

  run() {
    this.show()
    this.nextGeneration()
  }
}
