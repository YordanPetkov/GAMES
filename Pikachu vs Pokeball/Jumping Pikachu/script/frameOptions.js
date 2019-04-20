function beginningFrameOptions() {



    if(pikachuBody.weaponTimes["gravity"] > 0){
        pikachuBody.gravity = highGravity;
    }
    else {
        pikachuBody.gravity = defaultGravity;
    }

    if(pokeballBody.weaponTimes["gravity"] > 0){
        pokeballBody.gravity = highGravity;
    }else {
        pokeballBody.gravity = defaultGravity;
    }

    curTime = new Date().getTime();
    var sumTimes = 0;
    if((curTime - lastTime) > 1000){
        for(var time in pikachuBody.weaponTimes){
            sumTimes += pikachuBody.weaponTimes[time];
            if(pikachuBody.weaponTimes[time] > 0){
                pikachuBody.weaponTimes[time] -= 1;
                //if(pikachuBody.weaponTimes[time] == 0)pokeballCanShot = true;
            }
        }
        if(sumTimes == 0)pokeballCanShot = true;
        sumTimes = 0;
        for(var time in pokeballBody.weaponTimes){
            sumTimes += pokeballBody.weaponTimes[time];
            if(pokeballBody.weaponTimes[time] > 0){
                pokeballBody.weaponTimes[time] -= 1;
                //if(pokeballBody.weaponTimes[time] == 0)pikachuCanShot = true;
            }
        }
        if(sumTimes == 0)pikachuCanShot = true;
        lastTime = curTime;
    }

    pikachuBody.weaponSorce = weaponsSorces[pikachuBody.weaponIndex];
    pokeballBody.weaponSorce = weaponsSorces[pokeballBody.weaponIndex];

    
    pikachuContex.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );
    pokeballContex.clearRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );
    
    pikaQuests.forEach(function(wall, index){
        if(wall.used == true){
            pikachuBackgroundContex.clearRect(wall.x,wall.y,playerWidth,playerHeight);
            pikachuBackgroundContex.drawImage(imgQuestUsed, wall.x,wall.y,playerWidth,playerHeight);
        }
    });
    pokeQuests.forEach(function(wall, index){
        if(wall.used == true){
            pokeballBackgroundContex.clearRect(wall.x,wall.y,playerWidth,playerHeight);
            pokeballBackgroundContex.drawImage(imgQuestUsed, wall.x,wall.y,playerWidth,playerHeight);
        }
    });


    
}

function endFrameOptions(){

    

    if(pikachuBody.weaponTimes["flash"] > 0){
        pikachuContex.drawImage(weaponFlashAction,pikachuBody.coordinates.x,pikachuBody.coordinates.y,playerWidth,playerHeight);
    }

    if(pokeballBody.weaponTimes["flash"] > 0){
        pokeballContex.drawImage(weaponFlashAction,pokeballBody.coordinates.x,pokeballBody.coordinates.y,playerWidth,playerHeight);
    }

    
}