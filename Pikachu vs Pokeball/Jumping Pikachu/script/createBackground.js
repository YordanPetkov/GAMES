function createBackground(options){

    function render() {
        
        for(let i = 0; i < this.matrix[0].length; i++){
            for(let j = 0; j < this.matrix[0][i].length; j++){ 
                if(this.matrix[this.indexOfFrame][i][j] == wallChar){
                    this.context.drawImage(this.backgroundSheets["wall"], j * this.size, i * this.size, this.size, this.size);
                }else if(this.matrix[this.indexOfFrame][i][j] == questChar){
                    this.context.drawImage(this.backgroundSheets["quest"], j * this.size, i * this.size, this.size, this.size);
                }else {
                    continue;
                }
            }
        }
        return this;
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