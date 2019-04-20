function restartGame() {
    startTime = new Date().getTime();

    pikachuBody.coordinates.x = 10;
    pikachuBody.coordinates.y = HEIGHT - currentPikachuSprite.height;
    pikachuBody.speed.x = 0;
    pikachuBody.speed.y = 0;
    pokeballBody.coordinates.x = 10;
    pokeballBody.coordinates.y = HEIGHT - currentPikachuSprite.height;
    pokeballBody.speed.x = 0;
    pokeballBody.speed.y = 0;
    curPikachuPosibleHeight = HEIGHT - playerHeight;
    curPokeballPosibleHeight = HEIGHT - playerHeight;
    
    pikachuBackground.indexOfFrame = map[curLevel].length - 1;
    
    pikachuBackground.backgroundSheets["backgroundImage"] = backgroundImgs[pikachuBackground.indexOfFrame % backgroundImgs.length];
    pokeballBackground.indexOfFrame = map[curLevel].length - 1;
    
    pokeballBackground.backgroundSheets["backgroundImage"] = backgroundImgs[pokeballBackground.indexOfFrame % backgroundImgs.length];

    clearCanvas(pikachuContex);
    clearCanvas(pokeballContex);
    
    pikaWalls.splice(0, pikaWalls.length);
    pikaQuests.splice(0, pikaQuests.length);
    pokefinalWall.splice(0, pokefinalWall.length);
    pikafinalWall.splice(0, pikafinalWall.length);
    pokeWalls.splice(0, pokeWalls.length);
    pokeQuests.splice(0, pokeQuests.length);
    pikalavaWalls.splice(0, pikalavaWalls.length);
    pokelavaWalls.splice(0, pokelavaWalls.length);

    [pikaWalls, pikaQuests, pikafinalWall, pikalavaWalls] = pikachuBackground.render();
    [pokeWalls, pokeQuests, pokefinalWall, pokelavaWalls] = pokeballBackground.render();

    var text = "Press SPACE to continue!";
        
    var textLenght = text.length;
    startGamePikachuContext.font = "30px Arial";
    startGamePikachuContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);

    startGamePokeballContext.font = "30px Arial";
    startGamePokeballContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);
}