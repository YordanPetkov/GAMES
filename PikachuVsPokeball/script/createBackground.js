function createBackground(options){

    function render() {
        this.context.clearRect(
            0,
            0,
            WIDTH,
            HEIGHT
        );
        
        var background_image = this.backgroundSheets["backgroundImage"]
        
        this.context.drawImage(background_image, 0, 0, WIDTH, HEIGHT);


        var myStage = this.matrix.length - this.indexOfFrame;
        var numOfStages = this.matrix.length;
        this.context.font = "30px Arial";
        this.context.fillText(`Stage: ${myStage}/${numOfStages}`, 10, 50); 

        let walls = [],
            quests = [],
            finalWall = [],
            lavaWall = [],
            obj,
            ctx = this.context,
            imgWall = this.backgroundSheets["wall"],
            imgQuest = this.backgroundSheets["quest"],
            imgFinal = this.backgroundSheets["final"],
            imgWin = this.backgroundSheets["win"],
            imgLava = this.backgroundSheets["lava"],
            size = this.size;


        for(let i = 0; i < this.matrix[0].length; i++){
            for(let j = 0; j < this.matrix[0][i].length; j++){ 
                let cell = this.matrix[this.indexOfFrame][i][j];
                if(cell === wallChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size,
                        data: null
                    };
                    
                    ctx.drawImage(imgWall, obj.x, obj.y, size, size);

                    obj.data = ctx.getImageData(obj.x, obj.y, obj.size, obj.size).data;
                    walls.push(obj);
                    

                }else if(cell === questChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size,
                        used: false,
                        data: null
                    };
                    ctx.drawImage(imgQuest, obj.x, obj.y, size, size);

                    obj.data = ctx.getImageData(obj.x, obj.y, obj.size, obj.size).data;
                    quests.push(obj);

                }else if(cell === finalChar || cell === winChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size,
                        data: null
                    };
                    if(cell === finalChar)ctx.drawImage(imgFinal, obj.x, obj.y, size, size);
                    if(cell === winChar)ctx.drawImage(imgWin, obj.x, obj.y, size, size);

                    obj.data = ctx.getImageData(obj.x, obj.y, obj.size, obj.size).data;
                    finalWall.push(obj);
                    
                }else
                    if(cell === lavaChar){
                        obj = {
                            x: j * this.size,
                            y: i * this.size,
                            size: size,
                            data: null
                        };
                        ctx.drawImage(imgLava, obj.x, obj.y, size, size);

                        obj.data = ctx.getImageData(obj.x, obj.y, obj.size, obj.size).data;

                        lavaWall.push(obj);
                    }
                else {


                    continue;
                }
            }
        }
        return [walls, quests, finalWall, lavaWall];
    }

    function update(){
        if(this.indexOfFrame > 0){
            this.indexOfFrame--;
            background.backgroundSheets["backgroundImage"] = backgroundImgs[background.indexOfFrame % backgroundImgs.length];
            return false; // GAME CONTINUE
        }
        if(this.indexOfFrame == 0){
            this.indexOfFrame == this.matrix.length - 1;
            this.backgroundSheets["backgroundImage"] = backgroundImgs[this.indexOfFrame % backgroundImgs.length];
            return true; // TOU WIN
        }
    }

    var background = {
        matrix: options.matrix,
        context: options.context,
        backgroundSheets: options.backgroundSheets,
        size: options.size, 
        indexOfFrame: options.indexOfFrame || 0,
        render: render,
        update: update
    }
    return background;
}

