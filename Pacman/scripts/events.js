document.body.addEventListener("keydown", function(){
    //ev.keyCode - code of pressed key
    event.preventDefault();
    if(!keyCodeToDirs.hasOwnProperty(event.keyCode)){
        if(keyCodeToDirs[event.keyCode]);
        if(event.keyCode == 27 && gameover == true){
            gameover = false;
        }
        return;
    }
    pacman.dir = keyCodeToDirs[event.keyCode];
    pacman.speed = speed;
    keyPressed[keyCodeToDirs[event.keyCode]] = true;	
});

document.body.addEventListener("keyup", function(){
    //ev.keyCode - code of pressed key
    event.preventDefault();
    if(!keyCodeToDirs.hasOwnProperty(event.keyCode)){
        return;
    }
    else {
        keyPressed[keyCodeToDirs[event.keyCode]] = false;
        if(keyPressed[0] || keyPressed[1] || keyPressed[2] || keyPressed[3]) {
            return;
        }
        pacman.speed = 0;
    }
    
    
});