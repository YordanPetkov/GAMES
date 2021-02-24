var grid;
var rows = 6;
var cols = 7;
var w = 20;

function setup() {
    createCanvas(400, 400);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i * w, j * w, w);
        }
    }
}

function draw() {
    background(0);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function make2DArray(cols, rows) {
    var arr = new Array(cols);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

