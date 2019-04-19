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
        var isCollide, quest;
        [isCollide,quest] = isObjectCollidingWithWall(obj, pikaQuests, "top", true);
        if(isCollide){
            
            if(quest.used == false){
                pokeQuests.forEach(function(wall, index){
                    if(wall == quest){
                        wall.used = true;
                    }
                });
                physicalBody.weaponIndex = Math.floor((Math.random() * (weaponsNames.length - 1)) + 1);
            }
            
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
        
        var isCollide, quest;
        [isCollide,quest] = isObjectCollidingWithWall(obj, pokeQuests, "top", true)
        if(isCollide){
            if(quest.used == false){
                pokeQuests.forEach(function(wall, index){
                    if(wall == quest){
                        wall.used = true;
                    }
                });
                physicalBody.weaponIndex = Math.floor((Math.random() * (weaponsNames.length - 1)) + 1);
            }
                
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
    