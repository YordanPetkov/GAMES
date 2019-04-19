
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