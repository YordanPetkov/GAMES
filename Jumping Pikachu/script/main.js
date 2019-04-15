
window.onload = function(){
    const WIDTH = 768,
          HEIGHT = WIDTH / 2;
          
     var playerCanvas = document.getElementById("player-canvas"),
          playerContex = playerCanvas.getContext("2d"),
          playerImg = document.getElementById("pikachu-sprite");

      playerCanvas.width = WIDTH;
      playerCanvas.height = HEIGHT;
        var speed = 3;
    
    document.addEventListener('keydown', function(event){

        switch(event.keyCode){
            case 37:
                pikachuBody.speed.x = -speed;
                break;
            case 38:
                if(pikachuBody.coordinates.y < (HEIGHT - pikachuBody.height)){
                    return;
                }
                pikachuBody.speed.y = -speed;
                break;
            case 39:
                pikachuBody.speed.x = speed;
                break;
            case 40:
                pikachuBody.speed.y = speed;
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
    
    

    var pikachuSprite = createSprite({
        spritesheet: playerImg,
        context: playerContex,
        width: playerImg.width / 4,
        height: playerImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var pikachuBody = createPhysicalBody({
        coordinates: { x: 10, y: HEIGHT - pikachuSprite.height },
        speed: { x: 0, y: 0 },
        height: pikachuSprite.height,
        width: pikachuSprite.width
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
        coordinates: { x: WIDTH, y: HEIGHT - pokeballSprite.height},
        speed: { x: -5, y: 0},
        height: pokeballSprite.height,
        width: pokeballSprite.width
    });

    function gameLoop() {
        applyGravityVertical(pikachuBody, 0.1);
        var lastPikachuCoordinates = pikachuBody.move();

        pikachuSprite
                .render(pikachuBody.coordinates, lastPikachuCoordinates)
                .update();

         var lastPokeballCoordinates = pokeballBody.move();

         pokeballSprite
         .render(pokeballBody.coordinates, lastPokeballCoordinates)
         .update();
        
        if(pikachuBody.collidesWith(pokeballBody)) {
            //alert("GAME OVER");
        }

        window.requestAnimationFrame(gameLoop);
    }


    gameLoop();

}

