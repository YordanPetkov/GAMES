function updatePokeballSheets(){
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

function updatePikachuSheets() {
    if((pikachuBody.coordinates.y) < curPikachuPosibleHeight){
        currentPikachuSprite = pikachuJumpingSprite;
    }
    else if(pikachuBody.speed.x === 0){
        currentPikachuSprite = pikachuStayingSprite;
    }
    else {
        currentPikachuSprite = pikachuRunningSprite;
    }
}