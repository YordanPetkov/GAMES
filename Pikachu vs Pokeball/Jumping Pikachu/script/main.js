const WIDTH = 512,
          HEIGHT = WIDTH / 2;


window.onload = function(){
    
          
     var playerCanvas = document.getElementById("player-canvas"),
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
        loopTicksPerFrame: 2
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
        defaultAcceleration: { x: 5, y: 15},
        coordinates: { x: 10, y: HEIGHT - pikachuRunningSprite.height },
        speed: { x: 0, y: 0 },
        height: pikachuRunningSprite.height,
        width: pikachuRunningSprite.width
    });

    

    var pokeballCanvas = document.getElementById("pokeball-canvas"),
        pokeballContex = pokeballCanvas.getContext("2d"),
        pokeballImg = document.getElementById("pokeball-sprite");
    
    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

        var pokeballSprite = createSprite({
            spritesheet: pokeballImg,
            context: pokeballContex,
            width: pokeballImg.width / 18,
            height: pokeballImg.height,
            numberOfFrames: 18,
            loopTicksPerFrame: 5
        });
    
        var pokeballBody = createPhysicalBody({
            defaultAcceleration: { x: 5, y: 15},
            coordinates: { x: 10, y: HEIGHT - pokeballSprite.height },
            speed: { x: 0, y: 0 },
            height: pokeballSprite.height,
            width: pokeballSprite.width
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
                if(pikachuBody.coordinates.y < (HEIGHT - pikachuBody.height)){
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
                pokeballBody.accelerate("x", "left");
            }

            if(event.keyCode == 87){ //W
                if(pokeballBody.coordinates.y < (HEIGHT - pokeballBody.height)){
                    return;
                }
                pokeballBody.accelerate("y", "up");
            }

            if(event.keyCode == 68){ // D
                
                if(pokeballBody.speed.x > 0){
                    return;
                }
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

    function gameLoop() {
        var lastPikachuCoordinates;
        var lastPokeballCoordinates;

        if((pikachuBody.coordinates.y + pikachuBody.height) < HEIGHT){
            currentPikachuSprite = pikachuJumpingSprite;
        }
        else {
            currentPikachuSprite = pikachuRunningSprite;
        }

        updatePlayer(pikachuBody,currentPikachuSprite);
        updatePlayer(pokeballBody,pokeballSprite);
        

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


    gameLoop();

}

