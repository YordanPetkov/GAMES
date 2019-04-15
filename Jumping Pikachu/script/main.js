
window.onload = function(){
    var playerCanvas = document.getElementById("player-canvas"),
    playerContex = playerCanvas.getContext("2d"),
    playerImg = document.getElementById("pikachu-sprite");

    var frameIndex = 0,
        framesCount = 4;

    function gameLoop() {
        //clear previous frame
        playerContex.clearRect(
            0,
            0,
            playerImg.width / framesCount,
            playerImg.height
        );
        //draw next frame
        playerContex.drawImage(
            playerImg,
            frameIndex * playerImg.width / framesCount,
            0,
            playerImg.width / framesCount,
            playerImg.height,
            0,
            0,
            playerImg.width / framesCount,
            playerImg.height
        );

        //update frame
        frameIndex += 1;

        if(frameIndex >= framesCount){
            frameIndex = 0;
        }

        window.requestAnimationFrame(gameLoop);
    }


    gameLoop();

}

