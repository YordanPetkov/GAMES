
    var curOffSetColliding = 2;

function isObjectCollidingWithWall(obj, walls, where = false, isQuest = false){
    var isObjCollidingWithWall = false;
    var collideWall;
    if(obj.player === pikachu){
        curOffSetColliding = offSetCollidingPikachu;
    }
    else if(obj.player === pokeball){
        curOffSetColliding = offSetCollidingPokeball;
    }
    else curOffSetColliding = offSetCollidingPokeball;
        walls.forEach(function(wall, index){
            if(where == "top"){
                if(areCollinding(obj,wall,"top") || areCollinding(wall,obj,"bottom")){
                    isObjCollidingWithWall = true;
                    if(isQuest)collideWall = wall;
                }
            }
            else if(where == "bottom"){
                if(areCollinding(obj,wall,"bottom") || areCollinding(wall,obj,"top")){
                    isObjCollidingWithWall = true;
                    if(isQuest)collideWall = wall;
                }
            }

            else {
                if(areCollinding(obj,wall,where) || areCollinding(wall,obj,"false")){
                    isObjCollidingWithWall = true;
                    if(isQuest)collideWall = wall;
                }
            }
        
        
    }); 
    if(isQuest){
        
    return [isObjCollidingWithWall, collideWall];
    }
    return isObjCollidingWithWall;
}


function positionToBounds(obj){
    
    var sizes = {
        "top": obj.y,
        "left": obj.x + curOffSetColliding,
        "bottom": obj.y + obj.size,
        "right": obj.x + obj.size - curOffSetColliding
    };
    return sizes;
}

function isBetween(value, min , max){
    return min <= value && value <= max;
}


  function areCollinding(obj1, obj2, where){
    var sizes1 = positionToBounds(obj1),
    sizes2 = positionToBounds(obj2);
    if(where === "bottom"){
        return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        &&  isBetween(sizes2.top,sizes1.top,sizes1.bottom);
    }

    if(where === "top"){
        return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        &&  isBetween(sizes2.bottom,sizes1.top,sizes1.bottom);
    }

    return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        && (isBetween(sizes2.bottom,sizes1.top,sizes1.bottom) || isBetween(sizes2.top,sizes1.top,sizes1.bottom));
} 

/* function areCollinding(obj1, obj2, where){
    var 
        x1 = obj1.x + obj1.size / 2,
        y1 = obj1.y + obj1.size / 2,
        x2 = obj2.x + obj2.size / 2,
        y2 = obj2.y + obj2.size / 2;
    var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    if(obj1.radius === undefined)return distance <= ((obj1.size / 2) + obj2.radius);
    return distance <= (obj1.radius + ( obj2.size / 2 ));
} */

/* 
function areCollinding(obj1, obj2, where){
    let collision = false;
    let criticalArea = section(obj1, obj2);
    
    if(criticalArea != null) {
        console.log(obj1.data, obj2.data);
        let x1 = criticalArea.x;
        let y1 = criticalArea.y;
        let x2 = x1 + criticalArea.width;
        let y2 = y1 + criticalArea.height;
        
        for(let y = y1; y < y2; y++){
            for(let x = x1; x < x2; x++){
                let pixelId_a = (x - obj1.x + ( y - obj1.y) * playerWidth) * 4;
                let pixelId_b = (x - obj2.x + ( y - obj2.y) * playerWidth) * 4;
                let alpha_a = obj1.data[pixelId_a + 3];
                let alpha_b = obj2.data[pixelId_b + 3];
                
                if(alpha_a > 0 && alpha_b > 0){
                    collision = true;
                    break;
                }
            }
        }
    }

    return collision;
}


function section(obj1, obj2) {
    let object = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    object.x = Math.max(obj1.x, obj2.x);
    object.y = Math.max(obj1.y, obj2.y);

    object.width = Math.min(obj1.x + playerWidth, obj2.x + playerWidth) - object.x;
    object.height = Math.min(obj1.y + playerHeight, obj2.y + playerHeight) - object.y;
    

    return (object.width >= 1 && object.height >= 1) ? object : null;
} */