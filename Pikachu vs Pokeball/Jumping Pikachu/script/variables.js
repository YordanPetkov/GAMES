const WIDTH = 640,
          HEIGHT = 560
          playerWidth = 40,
          playerHeight = 40,
          startX = 10,
          pikachu = "Pikachu",
          pokeball = "Pokeball",
          offSetCollidingPikachu = 3,
          offSetCollidingPokeball = 2,
          gameInProgress = false,
          startX = 10;
var startTime,deltaTime = 0,timeInPause = 0;




const wallChar = "#",
      questChar = "?",
      finalChar = "$",
      winChar = "%";

var curPikachuPosibleHeight = HEIGHT - playerHeight,
    curPokeballPosibleHeight = HEIGHT - playerHeight;
var countWeapons = 1;
const map = [
    [
        "                ",
        "                ",
        "    #     ?    %",
        "           #    ",
        "       #   #    ",
        "#      #  ## #  ",
        "       #        ",
        "       #  #    #",
        "    ###         ",
        "    #         # ",
        "    #           ",
        "#   #       #   ",
        "    #           ",
        "    #           ",
    ],
    [
        "                ",
        "                ",
        "                ",
        "$  ##    ## ?   ",
        "  ?     #       ",
        "                ",
        "            #  #",
        "# #          #  ",
        "              # ",
        "     #    #  #  ",
        "                ",
        "               ?",
        "      ##    ##  ",
        "                ",
    ],
    [
        "?               ",
        "                ",
        "   ##?   ##    $",
        "#         #     ",
        "           #    ",
        "#     ##?      #",
        "                ",
        "                ",
        "?  ##   #    #  ",
        "                ",
        "                ",
        "##    ##        ",
        "                ",
        "                ",
    ],
    [
        "                ",
        "          #?   #",
        "?  ##           ",
        "          #     ",
        "             ## ",
        "#     ###     # ",
        "           # #  ",
        "           #    ",
        "  #?#    # ##   ",
        "            #   ",
        "            #   ",
        "#  #  ### ? #   ",
        "            # # ",
        "            #$# ",
    ],
    [
        "                ",
        "                ",
        "   ##   ?##    $",
        "                ",
        "                ",
        "#    ####  ##  #",
        "                ",
        "                ",
        "  ##?     #   #?",
        "                ",
        "                ",
        "##  # ##    ?# #",
        "                ",
        "                ",
    ],
    [
        "                ",
        "                ",
        "?      $  #     ",
        "                ",
        "                ",
        "#     ###       ",
        "                ",
        "                ",
        "   ?      #  #  ",
        "                ",
        "                ",
        "## #        #? ?",
        "                ",
        "       #        ",
    ],
];

var pokeQuests = [],
pokeWalls = [],
pikaWalls = [],
pikaQuests = [],
pikafinalWall = [],
pokefinalWall = [];

var weaponsNames = [
    "nothing",
    "flash",
    "gravity",
    "freezing"
],
durationWeapon = 5,
lowGravity = 0.1,
defaultGravity = 1,
highGravity = 10; // in seconds




var weaponsSorces = [
    document.getElementById("weaponNothing"),
    document.getElementById("weaponFlash"),
    document.getElementById("weaponGravity"),
    document.getElementById("weaponFreezing")
];

var weaponFlashAction = document.getElementById("weaponFlashAction");

 var pikachuBackgroundCanvas = document.getElementById("pikachu-game-background"),
     pikachuBackgroundContex = pikachuBackgroundCanvas.getContext("2d");
     pikachuBackgroundCanvas.width = WIDTH;
     pikachuBackgroundCanvas.height = HEIGHT;
 var pokeballBackgroundCanvas = document.getElementById("pokeball-game-background"),
     pokeballBackgroundContex = pokeballBackgroundCanvas.getContext("2d");
     pokeballBackgroundCanvas.width = WIDTH;
     pokeballBackgroundCanvas.height = HEIGHT;
 var startGamePokeballContext = pokeballBackgroundCanvas.getContext("2d");
 var startGamePikachuContext = pikachuBackgroundCanvas.getContext("2d");
var pokeWallImg = document.getElementById("pokewall"),
    pikaWallImg = document.getElementById("pikawall"),
    questWallImg = document.getElementById("questwall"),
    imgQuestUsed = document.getElementById("questwallused"),
    finalWallImg = document.getElementById("finalwall"),
    winWallImg = document.getElementById("winwall");
var backgroundImage = document.getElementById("backgroundImage");


 var pokeballBackground = createBackground({
    matrix: map,
    context: pokeballBackgroundContex,
    backgroundSheets: {
        "wall": pokeWallImg,
        "quest": questWallImg,
        "final": finalWallImg,
        "win": winWallImg,
        "backgroundImage": backgroundImage
    },
    size: playerHeight,
    indexOfFrame: map.length - 1
});

var pikachuBackground = createBackground({
    matrix: map,
    context: pikachuBackgroundContex,
    backgroundSheets: {
        "wall": pikaWallImg,
        "quest": questWallImg,
        "final": finalWallImg,
        "win": winWallImg,
        "backgroundImage": backgroundImage
    },
    size: playerHeight,
    indexOfFrame: map.length - 1
}); 

 var pikachuCanvas = document.getElementById("pikachu-canvas"),
      pikachuContex = pikachuCanvas.getContext("2d"),
      pikachuRunningImg = document.getElementById("pikachu-sprite");

  pikachuCanvas.width = WIDTH;
  pikachuCanvas.height = HEIGHT;
    var speed = 3;

var pikachuRunningSprite = createSprite({
    spritesheet: pikachuRunningImg,
    context: pikachuContex,
    width: pikachuRunningImg.width / 4,
    height: pikachuRunningImg.height,
    numberOfFrames: 4,
    loopTicksPerFrame: 5
});

var pikachuJumpingImg = document.getElementById("pikachu-jumping");
var pikachuJumpingSprite = createSprite({
    spritesheet: pikachuJumpingImg,
    context: pikachuContex,
    width: pikachuJumpingImg.width / 2,
    height: pikachuJumpingImg.height,
    numberOfFrames: 2,
    loopTicksPerFrame: 1
});

var pikachuStayingSprite = createSprite({
    spritesheet: pikachuRunningImg,
    context: pikachuContex,
    width: pikachuRunningImg.width / 4,
    height: pikachuRunningImg.height,
    numberOfFrames: 1,
    loopTicksPerFrame: 1
});

var pikachuBody = createPhysicalBody({
    player: pikachu,
    defaultAcceleration: { x: 5, y: 17},
    coordinates: { x: startX, y: HEIGHT - pikachuRunningSprite.height },
    speed: { x: 0, y: 0 },
    height: playerHeight,
    width: playerHeight,
    weaponIndex: 0,
    weaponSorce: weaponsSorces[0],
    weaponTimes: {
        "nothing": 0,
        "flash": 0,
        "gravity": 0,
        "freezing": 0
    },
    gravity: defaultGravity
});

var pokeballCanvas = document.getElementById("pokeball-canvas"),
    pokeballContex = pokeballCanvas.getContext("2d"),
    leftPokeballImg = document.getElementById("left-pokeball-sprite");
    rightPokeballImg = document.getElementById("right-pokeball-sprite");

pokeballCanvas.width = WIDTH;
pokeballCanvas.height = HEIGHT;

    var leftPokeballSprite = createSprite({
        spritesheet: leftPokeballImg,
        context: pokeballContex,
        width: leftPokeballImg.width / 18,
        height: leftPokeballImg.height,
        numberOfFrames: 18,
        loopTicksPerFrame: 5,
        reverse: false
    });

    var rightPokeballSprite = createSprite({
        spritesheet: rightPokeballImg,
        context: pokeballContex,
        width: rightPokeballImg.width / 18,
        height: rightPokeballImg.height,
        numberOfFrames: 18,
        loopTicksPerFrame: 5,
        reverse: true
    });

    var pokeballStayingSprite = createSprite({
        spritesheet: leftPokeballImg,
        context: pokeballContex,
        width: leftPokeballImg.width / 18,
        height: leftPokeballImg.height,
        numberOfFrames: 1,
        loopTicksPerFrame: 1,
        reverse: false
    });

    var pokeballBody = createPhysicalBody({
        player: pokeball,
        defaultAcceleration: { x: 5, y: 17},
        coordinates: { x: startX, y: HEIGHT - pokeballStayingSprite.height },
        speed: { x: 0, y: 0 },
        height: playerHeight,
        width: playerWidth,
        weaponIndex: 0,
        weaponSorce: weaponsSorces[0],
        weaponTimes: {
            "nothing": 0,
            "flash": 0,
            "gravity": 0,
            "freezing": 0
        },
        gravity: defaultGravity
    });



    var currentPikachuSprite = pikachuRunningSprite;
    var currentPokeballSprite = pokeballStayingSprite;
    var lastPokeballSprite = pokeballStayingSprite;
    var lastPokeballFrameIndex = 0;
    var lastPokeballDir = "Left";
    var curPokeballDir = "Left";

    var lastTime = new Date().getTime(), curTime = 0;


    var time = {
        "h": 0,
        "m": 3,
        "s": 4,
        "ms": 0
        };