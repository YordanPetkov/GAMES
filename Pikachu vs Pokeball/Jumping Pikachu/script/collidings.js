function isObjectCollidingWithWall(obj, walls, where = false){
    var isObjCollidingWithWall = false;
    walls.forEach(function(wall, index){

        if(where){
            isObjCollidingWithWall = areCollinding(obj,wall,where);
        }
        else {
            if(areCollinding(obj,wall,where) || areCollinding(wall,obj,"false")){
                isObjCollidingWithWall = true;
            }
        }
        
    });
    return isObjCollidingWithWall;
}


function positionToBounds(obj){
    var sizes = {
        "top": obj.y,
        "left": obj.x,
        "bottom": obj.y + obj.size,
        "right": obj.x + obj.size 
    };
    return sizes;
}

function isBetween(value, min , max){
    return min <= value && value <= max;
}

function areCollinding(obj1, obj2, where){
    var sizes1 = positionToBounds(obj1),
    sizes2 = positionToBounds(obj2);
    if(where === "top"){
        eturn (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        && isBetween(sizes2.top,sizes1.top,sizes1.bottom);
    }
    if(where === "bottom"){
        eturn (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        && isBetween(sizes2.bottom,sizes1.top,sizes1.bottom);
    }

    return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
        && (isBetween(sizes2.bottom,sizes1.top,sizes1.bottom) || isBetween(sizes2.top,sizes1.top,sizes1.bottom));
}