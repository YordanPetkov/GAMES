function createSprite(options){

    'use strict'

    function render(drawCoordinates, clearCoordinates) {
        //{x: num, y: num}
        var self = this;
        var clearOffset = 5;
        self.context.clearRect(
            clearCoordinates.x - clearOffset,
            clearCoordinates.y - clearOffset,
            playerWidth + clearOffset * 2,
            playerHeight + clearOffset * 2
        );

        self.context.drawImage(
            self.spritesheet,
            self.frameIndex * self.width,
            0,
            self.width,
            self.height,
            drawCoordinates.x,
            drawCoordinates.y,
            playerWidth,
            playerHeight
        );
        return self;
    }

    function update() {
        var self = this;
        self.loopTicksCount += 1;

        if(self.loopTicksCount >= self.loopTicksPerFrame){
            //update frame
            self.loopTicksCount = 0;
            self.frameIndex += 1;

            if(self.frameIndex >= self.numberOfFrames){
                self.frameIndex = 0;
            }
        }

        return self;
    }

    var sprite = {
        spritesheet: options.spritesheet,
        context: options.context,
        width: options.width, // width of single sprite
        height: options.height, // height of single sprite
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        frameIndex: options.frameIndex || 0,
        loopTicksCount: 0,
        render: render,
        update: update
    };

    return sprite;
}
