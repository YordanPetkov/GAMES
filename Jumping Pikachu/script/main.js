
window.onload = function(){

    var playerCanvas = document.getElementById("player-canvas"),
    playerContex = playerCanvas.getContext("2d"),
    playerImg = document.getElementById("pikachu-sprite");

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


    document.addEventListener('keydown', function(event){

    });
    
    function gameLoop() {
        
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

