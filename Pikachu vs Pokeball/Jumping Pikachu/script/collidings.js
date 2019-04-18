
    var curOffSetColliding = 2;

function isObjectCollidingWithWall(obj, walls, where = false){
    var isObjCollidingWithWall = false;
    if(obj.player === pikachu){
        curOffSetColliding = offSetCollidingPikachu;
    }
    else if(obj.player === pokeball){
        curOffSetColliding = offSetCollidingPokeball;
        //alert(obj.player);
    }
    else curOffSetColliding = offSetCollidingPokeball;
    walls.forEach(function(wall, index){

            if(areCollinding(obj,wall,where) || areCollinding(wall,obj,"false")){
                isObjCollidingWithWall = true;
            }
        
        
    });
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