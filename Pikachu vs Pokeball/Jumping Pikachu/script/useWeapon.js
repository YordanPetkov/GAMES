function useWeapon(physicalBody, weaponName){

    switch(weaponName){
        case "nothing" :
            break;
        case "flash" :
            physicalBody.coordinates.x = startX;
            physicalBody.coordinates.y = HEIGHT - playerHeight;
            break;
        case "gravity" :
            if(physicalBody.weaponTimes["gravity"] > 0)break;
            physicalBody.weaponTimes["gravity"] = durationWeapon;
            break;
        case "freezing" :
            if(physicalBody.weaponTimes["freezing"] > 0)break;
            physicalBody.weaponTimes["freezing"] = durationWeapon;
            break;
        default:
            break;
    }


   return;

}