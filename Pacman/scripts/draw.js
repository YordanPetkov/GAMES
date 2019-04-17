function drawBall(ctx,ballToDraw){
		
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    var x = ballToDraw.x + ballToDraw.size / 2;
    var y = ballToDraw.y + ballToDraw.size / 2;
    var size = ballToDraw.size / 2 ;
    ctx.arc(x, y, size,0,2*Math.PI);
    ctx.fill();
}

function drawPacman(){
    ctxPacman.beginPath();
    ctxPacman.fillStyle = "yellow";
    if(isMouthOpen){
        var deltaRadians = pacman.dir * Math.PI / 2;
        var x = pacman.x + pacman.size / 2;
        var y = pacman.y + pacman.size / 2;
        var size = pacman.size / 2;
        ctxPacman.arc(x, y, size,deltaRadians + Math.PI / 4,deltaRadians +  7 * Math.PI / 4);
        ctxPacman.lineTo(x,y);
        ctxPacman.fill();
    }
    else {
        drawBall(ctxPacman, pacman);
        //ctxPacman.arc(pacman.x, pacman.y, pacman.size,0,2*Math.PI);
    }
    
}

function drawGhosts(){
    ctxGhost.beginPath();
    /*var redFile = document.getElementById("redGhostImage"),
        blueFile = document.getElementById("blueGhostImage"),
        purpleFile = document.getElementById("purpleGhostImage"),
        orangeFile = document.getElementById("orangeGhostImage");*/
        for(var ghost in ghosts){
            ctxGhost.drawImage(ghosts[ghost].file, ghosts[ghost].x , ghosts[ghost].y, ghosts[ghost].size, ghosts[ghost].size);
        }

    /*ctxGhost.drawImage(blueFile, ghosts.blue.x , ghosts.blue.y, ghosts.blue.size, ghosts.blue.size);
    ctxGhost.drawImage(purpleFile, ghosts.purple.x , ghosts.purple.y, ghosts.purple.size, ghosts.purple.size);
    ctxGhost.drawImage(orangeFile, ghosts.orange.x , ghosts.orange.y, ghosts.orange.size, ghosts.orange.size);
    ctxGhost.drawImage(redFile, ghosts.red.x , ghosts.red.y, ghosts.red.size, ghosts.red.size);*/
    //ctxPacman.drawImage()

    
}



function drawMazeAndGetBallsAndWalls(ctx, maze, cellSize){
    var row,
        col,
        cell,
        obj,
        balls = [],
        walls = [],
        wallImage = document.getElementById("wallImage");
    
    for(row = 0; row < maze.length; row +=1){
        for(col = 0; col < maze[row].length; col +=1){
            cell = maze[row][col];
            
            if(cell === ballChar){
                obj = {
                    "x": col * cellSize + cellSize/4,
                    "y": row * cellSize + cellSize/4,
                    "size": cellSize/2
                };
                balls.push(obj);
                drawBall(ctx, obj);
            }
            else if(cell === wallChar){
                obj = {
                    "x": col * cellSize,
                    "y": row * cellSize,
                    "size": cellSize
                };
                walls.push(obj);
                ctx.drawImage(wallImage, obj.x , obj.y, cellSize, cellSize);
            }
        }
    }
    return [
        balls,
        walls
    ];
}

var keyPressed = [
    false,
    false,
    false,
    false
];