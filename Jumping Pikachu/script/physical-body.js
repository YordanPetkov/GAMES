function createPhysicalBody(options){
    "use strict";

    function move() {
        var self = this;

        //var lastCoordinates = JSON.parse(JSON.stringify(self.coordinates));
        var lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y};
        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
        
    }

    function collidesWith(otherPhysicalBody){
        
    }

    var physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collidesWith: collidesWith
    };

    return physicalBody;
}