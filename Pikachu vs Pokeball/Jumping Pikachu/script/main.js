



window.onload = function(){

  
    document.addEventListener('keydown', function(event){
           // console.log(event.keyCode);// 77 - M  81- Q
            if(event.keyCode == 9){ // TAB
                console.log(pokeballBody);
                console.log(curPokeballDir);
                console.log(curPokeballPosibleHeight);
                console.log(pikachuBody.player + " " + pokeballBody.player);
            }
            if(event.keyCode == 27){ // ESC
                gameInProgress = false;
                //if(timeInPause == 0)timeInPause = new Date.getTime();
                startGamePikachuContext.clearRect(0,0,WIDTH,HEIGHT);
                startGamePokeballContext.clearRect(0,0,WIDTH,HEIGHT);
                pikachuBackground.render();
                pokeballBackground.render();
                var text = "Press SPACE to continue!";
                
                var textLenght = text.length;
                startGamePikachuContext.font = "30px Arial";
                startGamePikachuContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);

                startGamePokeballContext.font = "30px Arial";
                startGamePokeballContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);
                return;
            }

            if(event.keyCode == 32){ // SPACE
                gameInProgress = true;
                /* var timeNow = Date.getTime();
                deltaTime += (timeNow - timeInPause);
                timeInPause = 0; */
                startGamePikachuContext.clearRect(0,0,WIDTH,HEIGHT);
                startGamePokeballContext.clearRect(0,0,WIDTH,HEIGHT);
                pikachuBackground.render();
                pokeballBackground.render();
                //startTime = new Date().getTime();
            }
            if(gameInProgress == false){
                
                return;
            }
            if(event.keyCode == 77){// M
                useWeapon(pokeballBody,weaponsNames[pikachuBody.weaponIndex]);
                pikachuBody.weaponIndex = 0;
            }

            if(pikachuBody.weaponTimes["freezing"] <= 0){
               
    
     
                if(event.keyCode == 37){//Left Arrow
                    if(pikachuBody.coordinates.x == 0)return;
                    if(pikachuBody.speed.x < 0){
                        return;
                    }
                    pikachuBody.accelerate("x", "left");
                }
                if(event.keyCode == 38){ //Top arrow
                    if(pikachuBody.coordinates.y < curPikachuPosibleHeight){
                        return;
                    }
                    if(pikachuBody.speed.y > 0)return;
                    pikachuBody.accelerate("y", "up");
                }
                if(event.keyCode == 39){ // Right arrow
                    if(pikachuBody.speed.x > 0){
                        return;
                    }
                    pikachuBody.accelerate("x", "right");
                }
            }

            if(event.keyCode == 81){ // Q
                useWeapon(pikachuBody,weaponsNames[pokeballBody.weaponIndex]);
                pokeballBody.weaponIndex = 0;
            }

            if(pokeballBody.weaponTimes["freezing"] <= 0){
                
    
                if(event.keyCode == 65){ // A
                    
                    if(pokeballBody.coordinates.x == 0)return;
                    if(pokeballBody.speed.x < 0){
                        return;
                    }
                    curPokeballDir = "Left";
                    pokeballBody.accelerate("x", "left");
                }
    
                if(event.keyCode == 87){ //W
                    if(pokeballBody.coordinates.y < curPokeballPosibleHeight){
                        return;
                    }
                    if(pokeballBody.speed.y > 0)return;
                    pokeballBody.accelerate("y", "up");
                }
    
                if(event.keyCode == 68){ // D
                    
                    if(pokeballBody.speed.x > 0){
                        return;
                    }
                    
                    curPokeballDir = "Right";
                    pokeballBody.accelerate("x", "right");
                }
            }
            
                
        

    });     
    
    document.addEventListener('keyup', function(event){
            if((event.keyCode == 37) || (event.keyCode == 39)){
                pikachuBody.speed.x = 0;
            }

            if((event.keyCode == 65) || (event.keyCode == 68)){
                pokeballBody.speed.x = 0;
            }
            
    
    });




   
    function gameLoop() {
        beginningFrameOptions();


        if(gameInProgress){
            var curTime = new Date().getTime();
            var timeHour = ((curTime - startTime - deltaTime) / 3600000) | 0,
                timeMin = (((curTime - startTime - deltaTime) / 60000) % 60) | 0,
                timeSec = (((curTime - startTime - deltaTime) / 1000) % 3600) % 60 | 0,
                timeMilisec = ((((curTime - startTime - deltaTime) % 3600) % 60) % 1000) | 0;
            var time = {
                "h": timeHour % 100,
                "m": timeMin % 100,
                "s": timeSec % 100,
                "ms": timeMilisec % 100,
            }
        }
        
        var lastPikachuCoordinates;
        var lastPokeballCoordinates;

        if(isPlayerWin(pikachu, pikachuBody,currentPikachuSprite, pikachuBackground, pikafinalWall)){
            alert(pikachu + "WIN!");
            restartGame();
        }

        if(isPlayerWin(pokeball, pokeballBody,currentPokeballSprite, pokeballBackground, pokefinalWall)){
            alert(pokeball + "WIN!");
            restartGame();
            
        }

        updatePikachuSheets();
        updatePokeballSheets();
        
        updatePlayer(pikachuBody,currentPikachuSprite);
        updatePlayer(pokeballBody,currentPokeballSprite);

        endFrameOptions();
        
        if(gameInProgress){
        pikachuContex.font = "30px Arial";
        pikachuContex.fillText(`Time: ${time.h}:${time.m}:${time.s}:${time.ms}`, 400, 50); 

        pokeballContex.font = "30px Arial";
        pokeballContex.fillText(`Time: ${time.h}:${time.m}:${time.s}:${time.ms}`, 400, 50);
        pikachuContex.drawImage(pikachuBody.weaponSorce, WIDTH/2 - playerWidth, 10, playerWidth, playerHeight); 
        pokeballContex.drawImage(pokeballBody.weaponSorce, WIDTH/2 - playerWidth, 10, playerWidth, playerHeight);
    }
        

        window.requestAnimationFrame(gameLoop);
    }

    

    
    

    startTime = new Date().getTime();
    [pikaWalls, pikaQuests, pikafinalWall, pikalavaWalls] = pikachuBackground.render();
    [pokeWalls, pokeQuests, pokefinalWall, pokelavaWalls] = pokeballBackground.render();
    var text = "Press SPACE to continue!";
                
    var textLenght = text.length;
    startGamePikachuContext.font = "30px Arial";
    startGamePikachuContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);

    startGamePokeballContext.font = "30px Arial";
    startGamePokeballContext.fillText(text, Math.floor(WIDTH/2) - Math.floor(textLenght/2) * 15, HEIGHT/2 - 15);
    gameLoop();

}

