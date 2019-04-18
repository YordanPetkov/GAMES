const WIDTH = 640,
          HEIGHT = 560
          playerWidth = 40,
          playerHeight = 40,
          startX = 10,
          pikachu = "Pikachu",
          pokeball = "Pokeball",
          offSetCollidingPikachu = 3,
          offSetCollidingPokeball = 2;



const wallChar = "#",
      questChar = "?",
      finalChar = "$",
      winChar = "%";

var curPikachuPosibleHeight = HEIGHT - playerHeight,
    curPokeballPosibleHeight = HEIGHT - playerHeight;

const map = [
    [
        "                ",
        "                ",
        "    #     #    %",
        "           #    ",
        "       #   #    ",
        "#      ?  ## #  ",
        "       ?        ",
        "       ?  #    #",
        "    ##?         ",
        "    #         # ",
        "    #           ",
        "#   #       #   ",
        "    #           ",
        "    #           ",
    ],
    [
        "                ",
        "                ",
        "                ",
        "$  ?#    ?# #   ",
        "  #     #       ",
        "                ",
        "            ?  #",
        "# #             ",
        "                ",
        "     #    #     ",
        "                ",
        "                ",
        "      ##    ?? #",
        "                ",
    ],
    [
        "                ",
        "                ",
        "   ?#    ?#    $",
        "          #     ",
        "           #    ",
        "#     ##?      #",
        "                ",
        "                ",
        "?  ?#        #  ",
        "                ",
        "                ",
        "##    ##        ",
        "                ",
        "                ",
    ],
    [
        "                ",
        "          ??   #",
        "   ?#           ",
        "          #     ",
        "             ## ",
        "#     ##?     # ",
        "           # #  ",
        "           #    ",
        "  #?#    ? ##   ",
        "            #   ",
        "            #   ",
        "#  #  ### # #   ",
        "            # # ",
        "            #$# ",
    ],
    [
        "                ",
        "                ",
        "   ?#    ?#    $",
        "                ",
        "                ",
        "#    ###?  #?  #",
        "                ",
        "                ",
        "  #?#     #   # ",
        "                ",
        "                ",
        "#?    ##    ?? #",
        "                ",
        "                ",
    ],
    [
        "                ",
        "                ",
        "#      $  #     ",
        "                ",
        "                ",
        "      ##?       ",
        "                ",
        "                ",
        "   #      #     ",
        "                ",
        "                ",
        "##          ?? #",
        "                ",
        "       #        ",
    ],
];

var pokeQuests = [],
pokeWalls = [],
pikaWalls = [],
pikaQuests = [],
pikafinalWall = [],
pokefinalWall = [];

window.onload = function(){
    
     var pikachuBackgroundCanvas = document.getElementById("pikachu-game-background"),
         pikachuBackgroundContex = pikachuBackgroundCanvas.getContext("2d");
         pikachuBackgroundCanvas.width = WIDTH;
         pikachuBackgroundCanvas.height = HEIGHT;
     var pokeballBackgroundCanvas = document.getElementById("pokeball-game-background"),
         pokeballBackgroundContex = pokeballBackgroundCanvas.getContext("2d");
         pokeballBackgroundCanvas.width = WIDTH;
         pokeballBackgroundCanvas.height = HEIGHT;

    var pokeWallImg = document.getElementById("pokewall"),
        pikaWallImg = document.getElementById("pikawall"),
        questWallImg = document.getElementById("questwall"),
        finalWallImg = document.getElementById("finalwall"),
        winWallImg = document.getElementById("winwall");
    var backgroundImage = document.getElementById("backgroundImage");

     var pokeballBackground = createBackground({
        matrix: map,
        context: pokeballBackgroundContex,
        backgroundSheets: {
            "wall": pokeWallImg,
            "quest": questWallImg,
            "final": finalWallImg,
            "win": winWallImg,
            "backgroundImage": backgroundImage
        },
        size: playerHeight,
        indexOfFrame: 0//map.length - 1
    });

    var pikachuBackground = createBackground({
        matrix: map,
        context: pikachuBackgroundContex,
        backgroundSheets: {
            "wall": pikaWallImg,
            "quest": questWallImg,
            "final": finalWallImg,
            "win": winWallImg,
            "backgroundImage": backgroundImage
        },
        size: playerHeight,
        indexOfFrame: map.length - 1
    }); 

     var pikachuCanvas = document.getElementById("pikachu-canvas"),
          pikachuContex = pikachuCanvas.getContext("2d"),
          pikachuRunningImg = document.getElementById("pikachu-sprite");

      pikachuCanvas.width = WIDTH;
      pikachuCanvas.height = HEIGHT;
        var speed = 3;

    var pikachuRunningSprite = createSprite({
        spritesheet: pikachuRunningImg,
        context: pikachuContex,
        width: pikachuRunningImg.width / 4,
        height: pikachuRunningImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var pikachuJumpingImg = document.getElementById("pikachu-jumping");
    var pikachuJumpingSprite = createSprite({
        spritesheet: pikachuJumpingImg,
        context: pikachuContex,
        width: pikachuJumpingImg.width / 2,
        height: pikachuJumpingImg.height,
        numberOfFrames: 2,
        loopTicksPerFrame: 1
    });

    var pikachuStayingSprite = createSprite({
        spritesheet: pikachuRunningImg,
        context: pikachuContex,
        width: pikachuRunningImg.width / 4,
        height: pikachuRunningImg.height,
        numberOfFrames: 1,
        loopTicksPerFrame: 1
    });

    var pikachuBody = createPhysicalBody({
        player: pikachu,
        defaultAcceleration: { x: 5, y: 17},
        coordinates: { x: 10, y: HEIGHT - pikachuRunningSprite.height },
        speed: { x: 0, y: 0 },
        height: playerHeight,
        width: playerHeight
    });

    var pokeballCanvas = document.getElementById("pokeball-canvas"),
        pokeballContex = pokeballCanvas.getContext("2d"),
        leftPokeballImg = document.getElementById("left-pokeball-sprite");
        rightPokeballImg = document.getElementById("right-pokeball-sprite");
    
    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

        var leftPokeballSprite = createSprite({
            spritesheet: leftPokeballImg,
            context: pokeballContex,
            width: leftPokeballImg.width / 18,
            height: leftPokeballImg.height,
            numberOfFrames: 18,
            loopTicksPerFrame: 5,
            reverse: false
        });

        var rightPokeballSprite = createSprite({
            spritesheet: rightPokeballImg,
            context: pokeballContex,
            width: rightPokeballImg.width / 18,
            height: rightPokeballImg.height,
            numberOfFrames: 18,
            loopTicksPerFrame: 5,
            reverse: true
        });

        var pokeballStayingSprite = createSprite({
            spritesheet: leftPokeballImg,
            context: pokeballContex,
            width: leftPokeballImg.width / 18,
            height: leftPokeballImg.height,
            numberOfFrames: 1,
            loopTicksPerFrame: 1,
            reverse: false
        });
    
        var pokeballBody = createPhysicalBody({
            player: pokeball,
            defaultAcceleration: { x: 5, y: 17},
            coordinates: { x: 10, y: HEIGHT - pokeballStayingSprite.height },
            speed: { x: 0, y: 0 },
            height: playerHeight,
            width: playerWidth
        });


  
    document.addEventListener('keydown', function(event){

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
                pikachuBody.accelerate("y", "up");
            }
            if(event.keyCode == 39){ // Right arrow
                if(pikachuBody.speed.x > 0){
                    return;
                }
                pikachuBody.accelerate("x", "right");
            }

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
                pokeballBody.accelerate("y", "up");
            }

            if(event.keyCode == 68){ // D
                
                if(pokeballBody.speed.x > 0){
                    return;
                }
                
                curPokeballDir = "Right";
                pokeballBody.accelerate("x", "right");
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

    var currentPikachuSprite = pikachuRunningSprite;
    var currentPokeballSprite = pokeballStayingSprite;
    var lastPokeballSprite = pokeballStayingSprite;
    var lastPokeballFrameIndex = 0;
    var lastPokeballDir = "Left";
    var curPokeballDir = "Left";



    function gameLoop() {
        var lastPikachuCoordinates;
        var lastPokeballCoordinates;

        if(isPlayerWin(pikachu, pikachuBody,currentPikachuSprite, pikachuBackground, pikafinalWall)){
            alert(pikachu + "WIN!");

            pokeballBody.coordinates.x = 10;
            pokeballBody.coordinates.y = HEIGHT - currentPokeballSprite.height;
            pokeballBody.speed.x = 0;
            pokeballBody.speed.y = 0;
            curPikachuPosibleHeight = HEIGHT - playerHeight;
            curPokeballPosibleHeight = HEIGHT - playerHeight;
            
            pikachuBackground.indexOfFrame = map.length - 1;
            pokeballBackground.indexOfFrame = map.length - 1;

            


            clearCanvas(pikachuContex);
            clearCanvas(pokeballContex);
            
            
            pikaWalls.splice(0, pikaWalls.length);
            pikaQuests.splice(0, pikaQuests.length);
            pokefinalWall.splice(0, pokefinalWall.length);
            pikafinalWall.splice(0, pikafinalWall.length);
            pokeWalls.splice(0, pokeWalls.length);
            pokeQuests.splice(0, pokeQuests.length);

            [pikaWalls, pikaQuests, pikafinalWall] = pikachuBackground.render();
            [pokeWalls, pokeQuests, pokefinalWall] = pokeballBackground.render();
        }

        if(isPlayerWin(pokeball, pokeballBody,currentPokeballSprite, pokeballBackground, pokefinalWall)){
            alert(pokeball + "WIN!");

            pikachuBody.coordinates.x = 10;
            pikachuBody.coordinates.y = HEIGHT - currentPikachuSprite.height;
            pikachuBody.speed.x = 0;
            pikachuBody.speed.y = 0;
            curPikachuPosibleHeight = HEIGHT - playerHeight;
            curPokeballPosibleHeight = HEIGHT - playerHeight;
            
            pikachuBackground.indexOfFrame = map.length - 1;
            pokeballBackground.indexOfFrame = map.length - 1;

            clearCanvas(pikachuContex);
            clearCanvas(pokeballContex);
            
            pikaWalls.splice(0, pikaWalls.length);
            pikaQuests.splice(0, pikaQuests.length);
            pokefinalWall.splice(0, pokefinalWall.length);
            pikafinalWall.splice(0, pikafinalWall.length);
            pokeWalls.splice(0, pokeWalls.length);
            pokeQuests.splice(0, pokeQuests.length);

            [pikaWalls, pikaQuests, pikafinalWall] = pikachuBackground.render();
            [pokeWalls, pokeQuests, pokefinalWall] = pokeballBackground.render();
        }
        
       if(currentPokeballSprite == leftPokeballSprite){
           lastPokeballFrameIndex = currentPokeballSprite.frameIndex;
           if(curPokeballDir != lastPokeballDir){
              currentPokeballSprite.frameIndex = currentPokeballSprite.numberOfFrames - 1 - currentPokeballSprite.frameIndex;
           }
       } 
       if(currentPokeballSprite == rightPokeballSprite){
           lastPokeballFrameIndex = currentPokeballSprite.frameIndex;
           if(curPokeballDir != lastPokeballDir){
                currentPokeballSprite.frameIndex = currentPokeballSprite.numberOfFrames - 1 - currentPokeballSprite.frameIndex;
           }
       } 

        if((pikachuBody.coordinates.y) < curPikachuPosibleHeight){
            currentPikachuSprite = pikachuJumpingSprite;
        }
        else if(pikachuBody.speed.x === 0){
            currentPikachuSprite = pikachuStayingSprite;
        }
        else {
            currentPikachuSprite = pikachuRunningSprite;
        }

        updatePokeballSheets();


        
        //drawBackground();
        updatePlayer(pikachuBody,currentPikachuSprite);
        updatePlayer(pokeballBody,currentPokeballSprite);

        window.requestAnimationFrame(gameLoop);
    }

    function isPlayerWin(player,physicalBody,sprite,background,winWall){
        var obj = {
            "player": physicalBody.player,
            "x": physicalBody.coordinates.x,
            "y": physicalBody.coordinates.y + physicalBody.speed.y,
            "size": playerHeight
        };

        if(isObjectCollidingWithWall(obj, winWall, "top")){
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
            

            if(background.update())return true;

            if(player == pikachu){
                clearCanvas(pikachuContex);
                pikaWalls.splice(0, pikaWalls.length);
                pikaQuests.splice(0, pikaQuests.length);
                pikafinalWall.splice(0, pikafinalWall.length);
                [pikaWalls, pikaQuests, pikafinalWall] = background.render();
            }
            else if(player == pokeball){
                clearCanvas(pokeballContex);

                pokefinalWall.splice(0, pokefinalWall.length);
                pokeWalls.splice(0, pokeWalls.length);
                pokeQuests.splice(0, pokeQuests.length);

                [pokeWalls, pokeQuests, pokefinalWall] = background.render();
            }
            
        }
        return false;
    }

    function updatePokeballSheets(){

        if(pokeballBody.speed.x === 0){
            pokeballStayingSprite.frameIndex = lastPokeballFrameIndex;
            if(curPokeballDir === "Right"){
                pokeballStayingSprite.spritesheet = rightPokeballImg;
            }
            else if(curPokeballDir === "Left")pokeballStayingSprite.spritesheet = leftPokeballImg;
            currentPokeballSprite = pokeballStayingSprite;
            lastPokeballSprite = pokeballStayingSprite;

        }else {
            
            if(curPokeballDir === "Left"){
                if(lastPokeballSprite == pokeballStayingSprite){
                    if(lastPokeballFrameIndex >= leftPokeballSprite.numberOfFrames){
                        lastPokeballFrameIndex = 0;
                    }else {
                        lastPokeballFrameIndex += 1;
                    }
                }
                leftPokeballSprite.frameIndex = lastPokeballFrameIndex;
                currentPokeballSprite = leftPokeballSprite;
                lastPokeballSprite = leftPokeballSprite;
                lastPokeballDir = "Left";
                
            }
            else if(curPokeballDir === "Right"){
                if(lastPokeballSprite == pokeballStayingSprite){
                    if(lastPokeballFrameIndex <= 0){
                        lastPokeballFrameIndex = rightPokeballSprite.numberOfFrames - 1;
                    }else {
                        lastPokeballFrameIndex -= 1;
                    }
                }
                rightPokeballSprite.frameIndex = lastPokeballFrameIndex;
                currentPokeballSprite = rightPokeballSprite;
                lastPokeballSprite = rightPokeballSprite;
                lastPokeballDir = "Right";
            } 
        }
    }


    function clearCanvas(context){
        context.clearRect(
            0,
            0,
            WIDTH,
            HEIGHT
        );
    }
    [pikaWalls, pikaQuests, pikafinalWall] = pikachuBackground.render();
    [pokeWalls, pokeQuests, pokefinalWall] = pokeballBackground.render();
    gameLoop();

}

