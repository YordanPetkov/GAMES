function createBackground(options){

    function render() {
        let walls = [],
            quests = [],
            obj,
            ctx = this.context,
            imgWall = this.backgroundSheets["wall"],
            imgQuest = this.backgroundSheets["quest"],
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

                }else {

                    continue;
                }
            }
        }
        return [walls, quests];
    }

    var background = {
        matrix: options.matrix,
        context: options.context,
        backgroundSheets: options.backgroundSheets,
        size: options.size, 
        indexOfFrame: options.indexOfFrame || 0,
        render: render
    }
    return background;
}