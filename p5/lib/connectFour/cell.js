function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.player = 0;
    this.revealed = false;

}

Cell.prototype.show = function () {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if (this.revealed) {
        if (this.player == 1) {
            fill(255, 0, 0);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }
        else if (this.player == 2) {
            fill(255, 255, 0);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }
    }

}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function (player) {
    if (this.revealed == true) {
        return false;
    }
    if (this.j < rows - 1 && grid[this.i][this.j + 1].revealed == false) {
        return false;
    }
    this.player = player;
    this.revealed = true;
    return true;
}