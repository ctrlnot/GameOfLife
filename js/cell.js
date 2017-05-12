function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.curr = 0;
    this.prev = 0;
}

Cell.prototype.generate = function() {
    // Save previous state
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y].prev = grid[x][y].curr;
        }
    }

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let g = grid[x][y];
            let neighbors = 0;

            neighbors -= g.prev; // Minus the current cell's state

            // Rules of life
            if (g.state === 1 && neighbors < 2) g.state = 0;            // Dies because of loneliness :(
            else if (g.state === 1 && neighbors > 3) g.state = 0;       // Dies because of overpopulation :(
            else if (g.state === 0 && neighbors === 3) g.state = 1;     // Reproduce
        }
        
    }
}

Cell.prototype.hover = function(mx, my) {
    var tmx = floor(mx / w);
    var tmy = floor(my / w);

    if(tmx === this.x && tmy === this.y) {
        stroke(255, 255, 0);
    } else {
        stroke(255, 50);
    }
}

Cell.prototype.show = function() {
    if (this.curr === 1) fill(255, 255, 0, 210); else noFill();
    rect(this.x * w, this.y * w, w, w);
}