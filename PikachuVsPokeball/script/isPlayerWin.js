function isPlayerWin(player,physicalBody,sprite,background,winWall){
    var obj = {
        "player": physicalBody.player,
        "x": physicalBody.coordinates.x,
        "y": physicalBody.coordinates.y + physicalBody.speed.y,
        "size": playerHeight
    };

    if(isObjectCollidingWithWall(obj, winWall, "top")){
        
    background.backgroundSheets["backgroundImage"] = backgroundImgs[background.indexOfFrame % backgroundImgs.length];
        //NEXT LEVEL CONDITION
        
        physicalBody.coordinates.x = 10;
        physicalBody.coordinates.y = HEIGHT - sprite.height;
        physicalBody.speed.x = 0;
        physicalBody.speed.y = 0;
        if(physicalBody.player == pikachu){
            curPikachuPosibleHeight = HEIGHT - playerHeight;
        }
        if(physicalBody.player == pokeball){
            curPokeballPosibleHeight = HEIGHT - playerHeight;
        }
        

        if(background.update()){
            gameInProgress = false;
            return true;
        }

        if(player == pikachu){
            clearCanvas(pikachuContex);
            pikaWalls.splice(0, pikaWalls.length);
            pikaQuests.splice(0, pikaQuests.length);
            pikafinalWall.splice(0, pikafinalWall.length);
            pikalavaWalls.splice(0, pikalavaWalls.length);
            [pikaWalls, pikaQuests, pikafinalWall, pikalavaWalls] = background.render();
        }
        else if(player == pokeball){
            clearCanvas(pokeballContex);

            pokefinalWall.splice(0, pokefinalWall.length);
            pokeWalls.splice(0, pokeWalls.length);
            pokeQuests.splice(0, pokeQuests.length);
            pokelavaWalls.splice(0, pokelavaWalls.length);

            [pokeWalls, pokeQuests, pokefinalWall, pokelavaWalls] = background.render();
        }
        
    }
    return false;
}

function clearCanvas(context){
    context.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );
}