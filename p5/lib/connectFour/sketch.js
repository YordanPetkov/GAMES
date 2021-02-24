var grid;
var rows = 6;
var cols = 7;
var w = 50;
var player = 1;
var ai = 2;
var human = 1;

function setup() {
    createCanvas(w * (cols + 1), w * (rows + 1));
    makeGrid();
}

function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    var winner = gameover();
    if (winner == 1) {
        fill(255, 0, 0);
        ellipse(0 + w * 0.5, rows * w + w * 0.5, w * 0.5);
        textSize(w * 0.5);
        text("Red is the winner", 1 * w + w * 0.25, rows * w + w * 0.25, (cols - 1) * w, (cols - 1) * w);
    }
    else if (winner == 2) {
        fill(255, 255, 0);
        ellipse(0 + w * 0.5, rows * w + w * 0.5, w * 0.5);
        textSize(w * 0.5);
        text("Yellow is the winner", 1 * w + w * 0.25, rows * w + w * 0.25, (cols - 1) * w, (cols - 1) * w);
    }

    else if (winner == 0) {
        if (player == ai) {
            moveAiTurn();
        }
    }
    
}

function mousePressed() {
    if (gameover() != 0) {
        makeGrid();
        return;
    }
    var flagBreak = false;
    for (var i = 0; i < cols; i++) {
        for (var j = rows - 1; j >= 0; j--) {
            if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].reveal(player) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
        if (flagBreak) {
            return;
        }
    }
}

function makeGrid() {
    grid = make2DArray(cols, rows);
    firstPlayer = true;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
}

function moveAiTurn() {
    var flagBreak = false;
    for (var i = 0; i < cols; i++) {
        for (var j = rows - 1; j >= 0; j--) {
            if (canWin(ai, i, j) && grid[i][j].reveal(ai) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = rows - 1; j >= 0; j--) {
            if (canWin(human, i, j) && grid[i][j].reveal(ai) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = rows - 1; j >= 0; j--) {
            if (grid[i][j].reveal(player) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
    }
}

function canWin(playerOnTurn, i, j) {
    if (i > 2) {
        if (grid[i - 3][j].player == playerOnTurn && grid[i - 2][j].player == playerOnTurn && grid[i - 1][j].player == playerOnTurn) {
            return true;
        }
    }
    if (j > 2) {
        if (grid[i][j - 3].player == playerOnTurn && grid[i][j - 2].player == playerOnTurn && grid[i][j - 1].player == playerOnTurn) {
            return true;
        }
    }
    if (i > 2 && j > 2) {
        if (grid[i - 3][j - 3].player == playerOnTurn && grid[i - 2][j - 2].player == playerOnTurn && grid[i - 1][j - 1].player == playerOnTurn) {
            return true;
        }
    } if (i < cols - 4 && j > 2) {
        if (grid[i + 3][j - 3].player == playerOnTurn && grid[i + 2][j - 2].player == playerOnTurn && grid[i + 1][j - 1].player == playerOnTurn) {
            return true;
        }
    }

    return false;
}

function gameover() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (i > 2) {
                if (grid[i - 3][j].player == 1 && grid[i - 2][j].player == 1 && grid[i - 1][j].player == 1 && grid[i][j].player == 1) {
                    return 1;
                }
                if (grid[i - 3][j].player == 2 && grid[i - 2][j].player == 2 && grid[i - 1][j].player == 2 && grid[i][j].player == 2) {
                    return 2;
                }
            }
            if (j > 2) {
                if (grid[i][j - 3].player == 1 && grid[i][j - 2].player == 1 && grid[i][j - 1].player == 1 && grid[i][j].player == 1) {
                    return 1;
                }
                if (grid[i][j - 3].player == 2 && grid[i][j - 2].player == 2 && grid[i][j - 1].player == 2 && grid[i][j].player == 2) {
                    return 2;
                }
            }
            if (i > 2 && j > 2) {
                if (grid[i - 3][j - 3].player == 1 && grid[i - 2][j - 2].player == 1 && grid[i - 1][j - 1].player == 1 && grid[i][j].player == 1) {
                    return 1;
                }
                if (grid[i - 3][j - 3].player == 2 && grid[i - 2][j - 2].player == 2 && grid[i - 1][j - 1].player == 2 && grid[i][j].player == 2) {
                    return 2;
                }
            } if (i < cols - 4 && j > 2) {
                if (grid[i + 3][j - 3].player == 1 && grid[i + 2][j - 2].player == 1 && grid[i + 1][j - 1].player == 1 && grid[i][j].player == 1) {
                    return 1;
                }
                if (grid[i + 3][j - 3].player == 2 && grid[i + 2][j - 2].player == 2 && grid[i + 1][j - 1].player == 2 && grid[i][j].player == 2) {
                    return 2;
                }
            }
        }
    }
    return 0;
}


function make2DArray(cols, rows) {
    var arr = new Array(cols);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

