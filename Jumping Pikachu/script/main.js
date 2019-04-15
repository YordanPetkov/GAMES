
window.onload = function(){
    const WIDTH = 768,
          HEIGHT = WIDTH / 2;
        
    var playerCanvas = document.getElementById("player-canvas"),
        playerContex = playerCanvas.getContext("2d"),
        playerImg = document.getElementById("pikachu-sprite");

    playerCanvas.width = WIDTH;
    playerCanvas.height = HEIGHT;

    var pokeballImg = document.getElementById("pokeball-sprite");


    var pikachuSprite = createSprite({
        spritesheet: playerImg,
        context: playerContex,
        width: playerImg.width / 4,
        height: playerImg.height,
        numberOfFrames: 4,
        loopTicksPerFrame: 5
    });

    var pikachuBody = createPhysicalBody({
        coordinates: { x: 0, y: 0 },
        speed: { x: 0, y: 0 },
        height: pikachuSprite.height,
        width: pikachuSprite.width
    });

    var pokeballSprite = createSprite({
        spritesheet: pokeballImg,
        context: playerContex,
        width: pokeballImg.width / 18,
        height: pokeballImg.height,
        numberOfFrames: 18,
        loopTicksPerFrame: 5
    });

    var speed = 3;


    document.addEventListener('keydown', function(event){

        switch(event.keyCode){
            case 37:
                pikachuBody.speed.x = -speed;
                break;
            case 38:
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
        switch(event.keyCode){
            case 37:
                pikachuBody.speed.x = 0;
                break;
            case 38:
                pikachuBody.speed.y = 0;
                break;
            case 39:
                pikachuBody.speed.x = 0;
                break;
            case 40:
                pikachuBody.speed.y = 0;
                break;
            default:
                break;
        }

    });
    
    function removeAccelerationHorizontal(physicalBody, gravity){
        if(physicalBody.speed.x > 0){
            physicalBody.speed.x -= gravity;
            
            if(physicalBody.speed.x < 0){
                physicalBody.speed.x = 0;
            }
        }

    }

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


    function gameLoop() {
        applyGravityVertical(pikachuBody, 0.05);
        removeAccelerationHorizontal(pikachuBody, 0.1);
        var lastPikachuCoordinates = pikachuBody.move();

        pikachuSprite
                .render(pikachuBody.coordinates, lastPikachuCoordinates)
                .update();

        pokeballSprite
                .render({x: 50, y: 60 }, {x: 50, y: 60 })
                .update();

        window.requestAnimationFrame(gameLoop);
    }


    gameLoop();

}

