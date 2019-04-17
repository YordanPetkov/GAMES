function updatePacmanPosition(){
    pacman.x += dirDeltas[pacman.dir].x * pacman.speed;
    pacman.y += dirDeltas[pacman.dir].y * pacman.speed;

    if(pacman.x < 0 || pacman.x > heroCanvas.width ||
        pacman.y < 0 || pacman.y > heroCanvas.height){
        pacman.x = (pacman.x + heroCanvas.width) % heroCanvas.width;
        pacman.y = (pacman.y + heroCanvas.height) % heroCanvas.height;
        return true;
    }
    return false;
}

function updateGhostPosition(ghost){
    ghost.x += dirDeltas[ghost.dir].x * ghost.speed;
    ghost.y += dirDeltas[ghost.dir].y * ghost.speed;

    if(ghost.x < 0 || ghost.x > heroCanvas.width ||
        ghost.y < 0 || ghost.y > heroCanvas.height){
        ghost.x = (ghost.x + heroCanvas.width) % heroCanvas.width;
        ghost.y = (ghost.y + heroCanvas.height) % heroCanvas.height;
        return true;
    }
    return false;
}

function updateGhostDir(ghost){
    /*
    if(!isObjectCollidingWithWall(ghosts.blue)){
        if(updateGhostPosition(ghosts.blue)) {
            ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        }
    }
    */
    /*var collidingGhosts = checkGhostCollidings();
    for(var ghost in ghosts){
        if(collidingGhosts[ghost])ghosts[ghost].dir = (ghosts[ghost].dir + 1) % 4;
    }*/
    
    
    //ghosts[ghost].dirPathIndex = (ghosts[ghost].dirPathIndex + 1) % (ghosts[ghost].path.length);
    
    /*
    if(ghosts[ghost].dirPathIndex == ghosts[ghost].path.length - 1){
        futureDirection = 4;
    }
    else {
        futureDirection = (ghosts[ghost].dirPathIndex + 1) % ghosts[ghost].path.length;
    }

    var futurePosition = {
        
        "x": ghosts[ghost].x + dirDeltas[ghosts[ghost].path[futureDirection]].x * ghosts[ghost].speed,
        "y": ghosts[ghost].y + dirDeltas[ghosts[ghost].path[futureDirection]].y * ghosts[ghost].speed,
        "size": ghosts[ghost].size
    };
    availableDirs[ghosts[ghost].path[futureDirection]] = false;
    if(!isObjectCollidingWithWall(futurePosition)){ghosts[ghost].dirPathIndex = futureDirection;return;}



    futurePosition = {
        "x": ghosts[ghost].x + dirDeltas[ghosts[ghost].path[ghosts[ghost].dirPathIndex]].x * ghosts[ghost].speed,
        "y": ghosts[ghost].y + dirDeltas[ghosts[ghost].path[ghosts[ghost].dirPathIndex]].y * ghosts[ghost].speed,
        "size": ghosts[ghost].size
    };
    availableDirs[ghosts[ghost].path[ghosts[ghost].dirPathIndex]] = false;
    if(!isObjectCollidingWithWall(futurePosition)){ghosts[ghost].dirPathIndex = ghosts[ghost].dirPathIndex;return;}


    var mydirPathIndex = ghosts[ghost].path[ghosts[ghost].dirPathIndex];
    if(availableDirs[(mydirPathIndex + 1) % 4 ])futureDirection = (mydirPathIndex + 1) % 4;
    else if(availableDirs[(mydirPathIndex + 3) % 4 ])futureDirection = (mydirPathIndex + 3) % 4;
    futurePosition = {
        "x": ghosts[ghost].x + dirDeltas[futureDirection].x * ghosts[ghost].speed,
        "y": ghosts[ghost].y + dirDeltas[futureDirection].y * ghosts[ghost].speed,
        "size": ghosts[ghost].size
    };
    availableDirs[futureDirection] = false;
    if(!isObjectCollidingWithWall(futurePosition))ghosts[ghost].dirPathIndex = futureDirection;

    for(var dir in availableDirs){
        if(dir){
            futurePosition = {
                "x": ghosts[ghost].x + dirDeltas[dir].x * ghosts[ghost].speed,
                "y": ghosts[ghost].y + dirDeltas[dir].y * ghosts[ghost].speed,
                "size": ghosts[ghost].size
            };
            if(!isObjectCollidingWithWall(futurePosition))ghosts[ghost].dirPathIndex = dir;
            
        }
    }*/ 

    /*if(Math.abs(ghosts[ghost].lastX + ghosts[ghost].lastY) - Math.abs(ghosts[ghost].x + ghosts[ghost].y) < herosize){
            
            return;
        }*/
    
        ghosts[ghost].lastX = ghosts[ghost].x;
        ghosts[ghost].lastY = ghosts[ghost].y;

        var futureDirection,
            availableDirs = [
                true,
                true,
                true,
                true
            ],
            futurePathIndex = (ghosts[ghost].dirPathIndex + 1) % ghosts[ghost].path.length,
            futureDirection = ghosts[ghost].path[futurePathIndex],
            futurePosition = {
            
                "x": ghosts[ghost].x + dirDeltas[futureDirection].x * ghosts[ghost].speed,
                "y": ghosts[ghost].y + dirDeltas[futureDirection].y * ghosts[ghost].speed,
                "size": ghosts[ghost].size
            };
        
        if(!isObjectCollidingWithWall(futurePosition)){
            ghosts[ghost].dir = futureDirection;
            ghosts[ghost].dirPathIndex = futurePathIndex;
            availableDirs[ghosts[ghost].dir] = false;
            return;
        }
        ghosts[ghost].dir = ghosts[ghost].path[futurePathIndex];
        ghosts[ghost].dirPathIndex = futurePathIndex;
        
        

        //ghosts[ghost].dir = Math.floor(Math.random() * 4);
        
    
}