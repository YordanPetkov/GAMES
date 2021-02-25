var grid;
var rows = 6;
var cols = 7;
var w = 15;
var player = 1;
var ai = 1;
var human = 2;
var maxDepth = 4;

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
    var winner = gameover(grid);
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
    if (gameover(grid) != 0) {
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
            if (makeThreeNeighbours(grid, human, i, j) && grid[i][j].reveal(ai) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = rows - 1; j >= 0; j--) {
            if (makeThreeNeighbours(grid, ai, i, j) && grid[i][j].reveal(ai) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
    }

    var bestResult = -Infinity;
    var bestMove = { i : 0, j : 0 };

    var i = floor(cols / 2);
    while (i > 0 && i < cols) {
        for (var j = rows - 1; j >= 0; j--) {
            let minimaxResult = minimax(grid, true, 0, i, j)
            if (minimaxResult > bestResult && grid[i][j].player == 0) {
                if ((j < rows - 1)) {
                    console.log(j + 1);
                    if (grid[i][j + 1].player == 0) {
                        bestResult = minimaxResult;
                        bestMove.i = i;
                        bestMove.j = j;
                    }
                }
                else if (j == rows - 1) {
                    bestResult = minimaxResult;
                    bestMove.i = i;
                    bestMove.j = j;
                }
            }
            console.log(bestMove, bestResult);
        }
        if (cols - 1 - i < i) {
            i = cols - 1 - i;
        }
        else {
            i = cols - 1 - i + 1;
        }
    }

    if (grid[bestMove.i][bestMove.j].reveal(ai) == true) {
        if (player == 1) player = 2;
        else if (player == 2) player = 1;
        console.log(bestResult);
        return;
    }


    for (var j = rows - 1; j >= 0; j--) {
        if (grid[floor(cols/2)][j].reveal(ai) == true) {
            if (player == 1) player = 2;
            else if (player == 2) player = 1;
            flagBraak = true;
            return;
        }
    }

    var i = floor(cols / 2);
    while(i > 0 && i < cols) {
        for (var j = rows - 1; j >= 0; j--) {
            if (grid[i][j].reveal(player) == true) {
                if (player == 1) player = 2;
                else if (player == 2) player = 1;
                flagBraak = true;
                return;
            }
        }
        if (cols - 1 - i < i) {
            i = cols - 1 - i;
        }
        else {
            i = cols - 1- i + 1;
        }
    }
}

function canWin(playerOnTurn, i, j) {
    if (grid[i][j].player != 0) {
        return false;
    }

    grid[i][j].player = playerOnTurn;
    if (gameover(grid) == playerOnTurn) {
        grid[i][j].player = 0;
        return true;
    }

    grid[i][j].player = 0;
    return false;
}

function gameover(grid) {
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

function minimax(gridCopy, maximizing, depth, x = 0, y = 0) {
    if (gridCopy[x][y].player != 0) {
        return -3;
    }

    if (depth == 0) {
        gridCopy[x][y].player = ai;
        var result = minimax(gridCopy, !maximizing, depth + 1);
        gridCopy[x][y].player = 0;
        return result;
    }
    if (depth > maxDepth) {
        return 0;
    }

    var bestResult;
    if (maximizing) bestResult = Infinity;
    else bestResult = Infinity;

    var i = floor(cols / 2);
    while (i > 0 && i < cols) {
        for (var j = rows - 1; j >= 0; j--) {
            if (gridCopy[i][j].player != 0) continue;
            if (j < rows - 1 && gridCopy[i][j + 1].player == 0) continue;
            if (maximizing) gridCopy[i][j].player = ai;
            else gridCopy[i][j].player = human;

            if (gameover(gridCopy) == human) {
                gridCopy[i][j].player = 0;
                console.log(i, j);
                return -2;
            }
            if (gameover(gridCopy) == ai) {
                gridCopy[i][j].player = 0;
                return 2;
            }
            gridCopy[i][j].player = 0;

            if (maximizing && makeThreeNeighbours(gridCopy, ai, i, j)) {
                return 1;
            }
            if (!maximizing && makeThreeNeighbours(gridCopy, human, i, j)) {
                return -1;
            }

            if (maximizing) gridCopy[i][j].player = ai;
            else gridCopy[i][j].player = human;

            let resultMinMax = minimax(gridCopy, !maximizing, depth + 1);
            if (maximizing) {
                if (resultMinMax < bestResult) {
                    bestResult = resultMinMax;
                }
            }
            if (!maximizing) {
                if (resultMinMax < bestResult) {
                    bestResult = resultMinMax;
                }
            }
            gridCopy[i][j].player = 0;

        }
        if (cols - 1 - i < i) {
            i = cols - 1 - i;
        }
        else {
            i = cols - 1 - i + 1;
        }
    }

    return bestResult;
}

function makeThreeNeighbours(grid,playerOnTurn, x, y) {
    if (grid[x][y].player != 0) {
        return false;
    }

    grid[x][y].player = playerOnTurn;

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (i > 2 && i < cols - 1) {
                if (grid[i - 3][j].player == 0 && grid[i - 2][j].player == playerOnTurn && grid[i - 1][j].player == playerOnTurn && grid[i][j].player == playerOnTurn && grid[i + 1][j].player == 0) {
                    grid[x][y].player = 0;
                    return true;
                }
            }
        }
    }

    grid[x][y].player = 0;
    return false;
}


function make2DArray(cols, rows) {
    var arr = new Array(cols);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

