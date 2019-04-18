function createBackground(options){

    function render() {
        this.context.clearRect(
            0,
            0,
            WIDTH,
            HEIGHT
        );



        let walls = [],
            quests = [],
            finalWall = [],
            obj,
            ctx = this.context,
            imgWall = this.backgroundSheets["wall"],
            imgQuest = this.backgroundSheets["quest"],
            imgFinal = this.backgroundSheets["final"],
            size = this.size;

        for(let i = 0; i < this.matrix[0].length; i++){
            for(let j = 0; j < this.matrix[0][i].length; j++){ 
                let cell = this.matrix[this.indexOfFrame][i][j];
                if(cell === wallChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size
                    };
                    walls.push(obj);
                    ctx.drawImage(imgWall, obj.x, obj.y, size, size);

                }else if(cell === questChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size
                    };
                    quests.push(obj);
                    ctx.drawImage(imgQuest, obj.x, obj.y, size, size);

                }else if(cell === finalChar){
                    obj = {
                        x: j * this.size,
                        y: i * this.size,
                        size: size
                    };
                    finalWall.push(obj);
                    ctx.drawImage(imgFinal, obj.x, obj.y, size, size);
                }else {


                    continue;
                }
            }
        }
        return [walls, quests, finalWall];
    }

    function update(){
        if(this.indexOfFrame > 0){
            this.indexOfFrame--;
            return false; // GAME CONTINUE
        }
        if(this.indexOfFrame == 0){
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