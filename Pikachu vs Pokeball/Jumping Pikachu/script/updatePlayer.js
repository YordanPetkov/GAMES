function applyGravityVertical(physicalBody, gravity) {
    
    if(physicalBody.coordinates.y === (HEIGHT - physicalBody.height)){
        return;
    }




    if(physicalBody.coordinates.y >= (HEIGHT - physicalBody.height)){
        physicalBody.coordinates.y = (HEIGHT - physicalBody.height);
        physicalBody.speed.y = 0;
        return;
    }

    var obj = {
        "player": physicalBody.player,
        "x": physicalBody.coordinates.x,
        "y": physicalBody.coordinates.y + physicalBody.speed.y,
        "size": 90/100*playerHeight
    };
    if(physicalBody.player == pikachu){
        if(isObjectCollidingWithWall(obj, pikaWalls, "top")){
            
            
            physicalBody.speed.y = 0;
        }
        if(isObjectCollidingWithWall(obj, pikaQuests, "top")){
            
            console.log(obj.player + " get magic fire.");
            physicalBody.speed.y = 0;
        }
        if(isObjectCollidingWithWall(obj, pikafinalWall, "top")){
            physicalBody.speed.y = 0;
        }
    }
    else {
        if(isObjectCollidingWithWall(obj, pokeWalls, "top")){
            physicalBody.speed.y = 0;
        }
    
        if(isObjectCollidingWithWall(obj, pokeQuests, "top")){
            
            console.log(obj.player + " get magic fire.");
            physicalBody.speed.y = 0;
        }
        
        
        if(isObjectCollidingWithWall(obj, pokefinalWall, "top")){
            physicalBody.speed.y = 0;
        }
    }

    physicalBody.speed.y += gravity;
}

function updatePlayer(objectBody, currentSprite){
        applyGravityVertical(objectBody, 1);

        var lastObjectCoordinates = objectBody.move();

        if(objectBody.coordinates.x < 0)objectBody.coordinates.x = 0;
        if(objectBody.coordinates.x > (WIDTH - objectBody.width))objectBody.coordinates.x = WIDTH - objectBody.width;

        if(objectBody.coordinates.y < 0){
            objectBody.coordinates.y = 0;
            objectBody.speed.y = 0;
        }
        //if(objectBody.coordinates.y > (HEIGHT - objectBody.height))objectBody.coordinates.y = HEIGHT - objectBody.height;


        currentSprite
                .render(objectBody.coordinates, lastObjectCoordinates)
                .update();
}
    