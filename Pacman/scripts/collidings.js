function isObjectCollidingWithWall(obj){
    var isObjCollidingWithWall = false;
    walls.forEach(function(wall, index){
        if(areCollinding(obj,wall) || areCollinding(wall,obj)){
            isObjCollidingWithWall = true;
        }
    });
    return isObjCollidingWithWall;
}

function isPacmanCollidingWithGhost(obj){
    for(var ghost in ghosts){
        if(areCollinding(obj,ghosts[ghost]) || areCollinding(ghosts[ghost],obj)){
            return true;
        }
    }
    /*
    if(areCollinding(obj,ghosts.blue) || areCollinding(ghosts.blue,obj)){
        return "blue";
    }
    if(areCollinding(obj,ghosts.purple) || areCollinding(ghosts.purple,obj)){
        return "purple";
    }
    if(areCollinding(obj,ghosts.orange) || areCollinding(ghosts.orange,obj)){
        return "orange";
    }
    if(areCollinding(obj,ghosts.red) || areCollinding(ghosts.red,obj)){
        return "red";
    }*/
    return false;
}

function positionToBounds(obj){
    var sizes = {
        "top": obj.y,
        "left": obj.x,
        "bottom": obj.y + obj.size,
        "right": obj.x + obj.size 
    };
    return sizes;
}

function isBetween(value, min , max){
    return min <= value && value <= max;
}

function areCollinding(obj1, obj2){
    var sizes1 = positionToBounds(obj1),
    sizes2 = positionToBounds(obj2);
    return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        && (isBetween(sizes2.bottom,sizes1.top,sizes1.bottom) || isBetween(sizes2.top,sizes1.top,sizes1.bottom));
    /*return ((sizes1.left <= sizes2.left && sizes2.left <= sizes1.right) ||
    (sizes1.left <= sizes2.right && sizes2.right <= sizes1.right))
     && ((sizes1.top <= sizes2.top && sizes2.top <= sizes1.bottom)||
     (sizes1.top <= sizes2.bottom && sizes2.bottom <= sizes1.bottom));*/
}


function checkGhostCollidings(){
    var collidingGhosts = {
        "blue": false,
        "purple": false,
        "orange": false,
        "red": false
    }	

    for(var ghost in ghosts){
        var futurePosition = {
            "x": ghosts[ghost].x + dirDeltas[ghosts[ghost].dir].x * ghosts[ghost].speed,
            "y": ghosts[ghost].y + dirDeltas[ghosts[ghost].dir].y * ghosts[ghost].speed,
            "size": ghosts[ghost].size
        };
        
        

        if(!isObjectCollidingWithWall(futurePosition)){
            
            if(updateGhostPosition(ghosts[ghost])) {
                //updateGhostDir(ghost);
                ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            }
        }

        else {
            updateGhostDir(ghost);
        }
    }
}