
window.onload = function(){
    const WIDTH = 768,
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
    
    

    var pikachuSprite = createSprite({
        spritesheet: playerImg,
        context: playerContex,
        width: playerImg.width / 4,
        height: playerImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var pikachuBody = createPhysicalBody({
        defaultAcceleration: { x: 5, y: 5},
        coordinates: { x: 10, y: HEIGHT - pikachuSprite.height },
        speed: { x: 0, y: 0 },
        height: pikachuSprite.height,
        width: pikachuSprite.width
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

    function createPokeBall(){
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

        return {
            sprite: pokeballSprite,
            body: pokeballBody
        };
    }

    var pokeballs = [];

    function gameLoop() {
        var lastPikachuCoordinates;


        applyGravityVertical(pikachuBody, 0.1);
        lastPikachuCoordinates = pikachuBody.move();

        pikachuSprite
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
               return;
           }
        }

        if(Math.random() < 0.01){
            pokeballs.push(createPokeBall());
        }

        window.requestAnimationFrame(gameLoop);
    }


    gameLoop();

}

