
window.onload = function(){
    const WIDTH = 512,
          HEIGHT = WIDTH / 2;
          
     var playerCanvas = document.getElementById("player-canvas"),
          playerContex = playerCanvas.getContext("2d"),
          playerImg = document.getElementById("pikachu-sprite");

      playerCanvas.width = WIDTH;
      playerCanvas.height = HEIGHT;
        var speed = 3;
    

        
    
    
     function applyGravityVertical(physicalBody, gravity) {
    
            if(physicalBody.coordinates.y === (HEIGHT - physicalBody.height)){
                return;
            }
    
    
            if(physicalBody.coordinates.y >= (HEIGHT - physicalBody.height)){
                physicalBody.coordinates.y = (HEIGHT - physicalBody.height);
                physicalBody.speed.y = 0;
                return;
            }
    
            physicalBody.speed.y += gravity;
     }
    
    

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

    var pikachuBody = createPhysicalBody({
        defaultAcceleration: { x: 5, y: 15},
        coordinates: { x: 10, y: HEIGHT - pikachuRunningSprite.height },
        speed: { x: 0, y: 0 },
        height: pikachuRunningSprite.height,
        width: pikachuRunningSprite.width
    });

    document.addEventListener('keydown', function(event){

        switch(event.keyCode){
            case 37:
                if(pikachuBody.speed.x < 0){
                    return;
                }
                pikachuBody.accelerate("x", "left");
                break;
            case 38:
                if(pikachuBody.coordinates.y < (HEIGHT - pikachuBody.height)){
                    return;
                }
                pikachuBody.accelerate("y", "up");
                break;
            case 39:
                if(pikachuBody.speed.x > 0){
                    return;
                }
                pikachuBody.accelerate("x", "right");
                break;
            default:
                break;
        }

    });     
    
    document.addEventListener('keyup', function(event){
            if((event.keyCode == 37) || (event.keyCode == 39)){
                pikachuBody.speed.x = 0;
            }
            
    
    });

    var pokeballCanvas = document.getElementById("pokeball-canvas"),
        pokeballContex = pokeballCanvas.getContext("2d"),
        pokeballImg = document.getElementById("pokeball-sprite");
    
    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

    function createPokeBall(offsetX){
        var pokeballSprite = createSprite({
            spritesheet: pokeballImg,
            context: pokeballContex,
            width: pokeballImg.width / 18,
            height: pokeballImg.height,
            numberOfFrames: 18,
            loopTicksPerFrame: 5
        });
    
        var pokeballBody = createPhysicalBody({
            coordinates: { x: offsetX, y: HEIGHT - pokeballSprite.height},
            speed: { x: -4, y: 0},
            height: pokeballSprite.height,
            width: pokeballSprite.width
        });

        return {
            sprite: pokeballSprite,
            body: pokeballBody
        };
    }

    var pokeballs = [];

    function spawnPokeball() {
        var spawnChance = 0.02,
            spawnOffset = 150;
        if(Math.random() < spawnChance){
            if(pokeballs.length){
                var lastPokeball = pokeballs[pokeballs.length - 1];
                var starting = Math.max(lastPokeball.body.coordinates.x + lastPokeball.body.width + spawnOffset, WIDTH);
                var newPokeball = createPokeBall(starting);
                pokeballs.push(newPokeball);
                
            }
            else {
                pokeballs.push(createPokeBall(WIDTH));
            }
            
        }
    }

    var background = createBackground({
        height: HEIGHT,
        width: WIDTH,
        speedX: 10
    });

    var currentPikachuSprite = pikachuRunningSprite;
    function gameLoop() {
        var lastPikachuCoordinates;


        applyGravityVertical(pikachuBody, 1);
        lastPikachuCoordinates = pikachuBody.move();

        if((pikachuBody.coordinates.y + pikachuBody.height) < HEIGHT){
            currentPikachuSprite = pikachuJumpingSprite;
        }
        else {
            currentPikachuSprite = pikachuRunningSprite;
        }

        currentPikachuSprite
                .render(pikachuBody.coordinates, lastPikachuCoordinates)
                .update();

        for (var i = 0; i < pokeballs.length; i += 1){

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
        }

        spawnPokeball();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }


    gameLoop();

}

