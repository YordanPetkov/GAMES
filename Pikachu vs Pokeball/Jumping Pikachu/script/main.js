const WIDTH = 640,
          HEIGHT = 520
          playerWidth = 40,
          playerHeight = 40;

const wallChar = "#",
      questChar = "?";

var curPosibleHeight = HEIGHT - playerHeight;

const map = [
    [
        "                ",
        "## ?#### ?##?? #",
        "                ",
        "## ?#### ?##?? #",
        "                ",
        "## ?#### ?##?? #",
        "                ",
        "## ?#### ?##?? #",
        "                ",
        "## ?#### ?##?? #",
        "                ",
        "## ?#### ?##?? #",
        "                ",
    ],
    [
        "                ",
        "   ?#    ?#    #",
        "                ",
        "                ",
        "#     ##?   ?  #",
        "                ",
        "                ",
        "  #?#     #     ",
        "                ",
        "                ",
        "##    ##    ?? #",
        "                ",
        "                ",
    ]
];

var pokeQuests = [],
pokeWalls = [],
pikaWalls = [],
pikaQuests = [];

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
        questWallImg = document.getElementById("questwall");

     var pokeballBackground = createBackground({
        matrix: map,
        context: pokeballBackgroundContex,
        backgroundSheets: {
            "wall": pokeWallImg,
            "quest": questWallImg
        },
        size: playerHeight,
        indexOfFrame: map.length - 1
    });

    var pikachuBackground = createBackground({
        matrix: map,
        context: pikachuBackgroundContex,
        backgroundSheets: {
            "wall": pikaWallImg,
            "quest": questWallImg
        },
        size: playerHeight,
        indexOfFrame: map.length - 1
    }); 

     var playerCanvas = document.getElementById("pikachu-canvas"),
          playerContex = playerCanvas.getContext("2d"),
          playerImg = document.getElementById("pikachu-sprite");

      playerCanvas.width = WIDTH;
      playerCanvas.height = HEIGHT;
        var speed = 3;

    var pikachuRunningSprite = createSprite({
        spritesheet: playerImg,
        context: playerContex,
        width: playerImg.width / 4,
        height: playerImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var pikachuJumpingImg = document.getElementById("pikachu-jumping");
    var pikachuJumpingSprite = createSprite({
        spritesheet: pikachuJumpingImg,
        context: playerContex,
        width: pikachuJumpingImg.width / 2,
        height: pikachuJumpingImg.height,
        numberOfFrames: 2,
        loopTicksPerFrame: 1
    });

    var pikachuStayingSprite = createSprite({
        spritesheet: playerImg,
        context: playerContex,
        width: playerImg.width / 4,
        height: playerImg.height,
        numberOfFrames: 1,
        loopTicksPerFrame: 1
    });

    var pikachuBody = createPhysicalBody({
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
                if(pikachuBody.coordinates.y < curPosibleHeight){
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
                if(pokeballBody.coordinates.y < curPosibleHeight){
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

        if((pikachuBody.coordinates.y) < curPosibleHeight){
            currentPikachuSprite = pikachuJumpingSprite;
        }
        else if(pikachuBody.speed.x === 0){
            currentPikachuSprite = pikachuStayingSprite;
        }
        else {
            currentPikachuSprite = pikachuRunningSprite;
        }

        if(pokeballBody.speed.x === 0){
            pokeballStayingSprite.frameIndex = lastPokeballFrameIndex;
            if(curPokeballDir === "Right"){
                pokeballStayingSprite.spritesheet = rightPokeballImg;
            }
            else if(curPokeballDir === "Left")pokeballStayingSprite.spritesheet = leftPokeballImg;
            currentPokeballSprite = pokeballStayingSprite;
            lastPokeballSprite = pokeballStayingSprite;

        }else {
            console.log(lastPokeballFrameIndex);
            
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
                console.log("RIGHT");
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


        
        //drawBackground();
        updatePlayer(pikachuBody,currentPikachuSprite);
        updatePlayer(pokeballBody,currentPokeballSprite);
        

        /* for (var i = 0; i < pokeballs.length; i += 1){

            var pokeball = pokeballs[i];
            var lastPokeballCoordinates = pokeball.body.move();

            if(pokeball.body.coordinates.x < (-pokeball.body.width)){
                pokeballs.splice(i, 1);
                i -= 1;
                continue;
            }

            pokeball.sprite
               .render(pokeball.body.coordinates, lastPokeballCoordinates)
                .update();
           
           if(pikachuBody.collidesWith(pokeball.body)) {
               //alert("GAME OVER");
               playerContex.drawImage(
                   document.getElementById("dead-player"),
                   0,
                   0
               );
               document.getElementById("game-over-song").play();
               return;
           }
        } */



        window.requestAnimationFrame(gameLoop);
    }

    [pikaWalls, pikaQuests] = pikachuBackground.render();
    [pokeWalls, pokeQuests] = pokeballBackground.render();
    gameLoop();

}

