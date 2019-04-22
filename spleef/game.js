// Creating variables
var socket = io();

var grid = [];
var players = [];
var isCon = [];
var cid;
var playerWidth = 14,playerHeight = 14,scope = 2*(playerWidth + playerHeight);

socket.on("id", function(id,g,p) {
    cid = id;
    grid = g;
    players = p;
});

socket.on("isCon", function(c) {
    isCon = c;
});

socket.on("moved", function(id, player) {
    players[id] = player;
});

socket.on("break", function(i, j) {
    grid[i][j] = 0;
});

var dx = 0, dy = 0;
var onFloor = false;

function update() {
    if(players[cid] == undefined){return;}
    dx = 0;
    if(isKeyPressed[65]){dx -= 3;}
    if(isKeyPressed[68]){dx += 3;}
    dy += 0.3;
    var flag = false;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 40; j++){
            if(grid[i][j] && areColliding(j*20, i*20+400,20,20, players[cid].x-playerWidth/2, players[cid].y - playerHeight/2 + dy, playerWidth, playerHeight)){
                if(dy > 0){
                    players[cid].y = i * 20 + 400 - playerHeight / 2 - 0.3;
                    flag = true;
                }else {
                    players[cid].y = i*20+400 + 27.3;
                    flag = true;
                }
                
                break;
            }
        }
    }
    if(dy > 0){onFloor = flag;}
    if(dy < 0){onFloor = 0;}
    if(flag){dy = 0;}
    players[cid].y += dy;

    var flag = false;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 40; j++){
            if(grid[i][j] && areColliding(j*20, i*20+400,20,20, players[cid].x-playerWidth/2 + dx, players[cid].y - playerHeight/2, playerWidth, playerHeight)){
                if(dx > 0){
                    players[cid].x = j * 20 - playerHeight / 2 - 0.3;
                    flag = true;
                }else {
                    players[cid].x = j*20 + 27.3;
                    flag = true;
                }
                
                break;
            }
        }
    }
    if(flag){dx=0;}
    players[cid].x += dx;

    socket.emit("moved", cid, players[cid]);

}

function draw() {
    if(players == undefined){return;}
    for(let i = 0; i < players.length; i++){
        if(isCon[i]){
            if(i == cid){
                context.fillStyle = "green";
            }
            else {
                context.fillStyle = "blue";
            }
            
            context.fillRect(players[i].x - playerWidth/2, players[i].y - playerHeight/2, playerWidth, playerHeight);
        }
    }
    if(grid[0] == undefined){return;}
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 40; j++){
            if(grid[i][j] == 1){
                context.fillStyle = "red";
                context.fillRect(j*20, i*20+400, 19, 19);
            }
        }
    }
}

function keydown(key) {
	if(key == 87 && onFloor){
        dy -= 5;
    }
}

function mouseInScope(){
    if((mouseX >= (players[cid].x - scope)) && (mouseX <= (players[cid].x + scope))
        && (mouseY >= (players[cid].y - scope)) && (mouseY <= (players[cid].y + scope))){
            return true;
        }
    return false;
}

function mouseup() {
    if(mouseInScope()){
        let i = Math.floor((mouseY - 400)/20);
        let j = Math.floor(mouseX/20);
        if(i>=0 && i<10 && j>=0 && j<40){
            grid[i][j] = 0;
            socket.emit("break", i ,j);
        }
    }
}
