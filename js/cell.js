class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j

    this.state = this.random()
    this.prevState = this.state
  }

  random() {
    // 10% chance of being alive initially
    return random(1) < 0.1 ? 1 : 0
  }

  calculateNeighbors() {
    let total = 0

    // calculate neighbors that the edges is included as the other side neighbors (wut?)
    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        const g = grid[(this.i + i + COLS) % COLS][(this.j + j + ROWS) % ROWS]
        total += g.prevState
      }
    }

    // minus itself
    total -= this.prevState

    return total
  }

  preservePreviousState() {
    this.prevState = this.state
  }

  nextGeneration() {
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
    if(start) this.nextGeneration()
  }
}
