function RestartGame(){
    ctxMaze.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);
    ctxPacman.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    
    

   /*  ctxMaxe.Rect(0, 0, mazeCanvas.width, mazeCanvas.height);
    ctxPacman.Rect(0, 0, heroCanvas.width, heroCanvas.height);
    ctxGhost.Rect(0, 0, heroCanvas.width, heroCanvas.height);

    ctxMaze.fillStyle = "white";
    ctxPacman.fillStyle = "white";
    ctxGhost.fillStyle = "white";

    ctxMaze.fill();
    ctxPacman.fill();
    ctxGhost.fill();

    ctxMaze.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);
    ctxPacman.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height); */

    /* ctxMaze.beginPath();
    ctxPacman.beginPath();
    ctxGhost.beginPath(); */

    columns = levels[currentLevel].maze[0].length;
    rows = levels[currentLevel].maze.length;
    mazeCanvas.width = columns  * cellsize;
    mazeCanvas.height = rows  * cellsize;
    heroCanvas.width = columns  * cellsize;
    heroCanvas.height = rows  * cellsize;

    
    steps = 0;
    isMouthOpen = false;

    //pacman = {};
    //ghosts = {};
    //console.log(pacman);
    

    //[balls, walls] = drawMazeAndGetBallsAndWalls(ctxMaze, levels[currentLevel].maze, cellsize);

    pacman.x = levels[currentLevel].startPacmanX;
    pacman.y = levels[currentLevel].startPacmanY;
    pacman.size = herosize;
    pacman.dir = 0;


    ghosts["blue"].x = levels[currentLevel].startBlueX;
    ghosts["blue"].y = levels[currentLevel].startBlueY;
    ghosts["blue"].lastX = levels[currentLevel].startBlueX;
    ghosts["blue"].lastY = levels[currentLevel].startBlueY;
    ghosts["blue"].size = herosize;
    ghosts["blue"].file = document.getElementById("blueGhostImage");
    ghosts["blue"].dir = 3;
    ghosts["blue"].dirPathIndex = 0;
    ghosts["blue"].path = levels[currentLevel].bluePath;

    ghosts["orange"].x = levels[currentLevel].startOrangeX;
    ghosts["orange"].y = levels[currentLevel].startOrangeY;
    ghosts["orange"].lastX = levels[currentLevel].startOrangeX;
    ghosts["orange"].lastY = levels[currentLevel].startOrangeY;
    ghosts["orange"].size = herosize;
    ghosts["orange"].file = document.getElementById("orangeGhostImage");
    ghosts["orange"].dir = 3;
    ghosts["orange"].dirPathIndex = 0;
    ghosts["orange"].path = levels[currentLevel].orangePath;

    ghosts["purple"].x = levels[currentLevel].startPurpleX;
    ghosts["purple"].y = levels[currentLevel].startPurpleY;
    ghosts["purple"].lastX = levels[currentLevel].startPurpleX;
    ghosts["purple"].lastY = levels[currentLevel].startPurpleY;
    ghosts["purple"].size = herosize;
    ghosts["purple"].file = document.getElementById("purpleGhostImage");
    ghosts["purple"].dir = 2;
    ghosts["purple"].dirPathIndex = 0;
    ghosts["purple"].path = levels[currentLevel].purplePath;

    ghosts["red"].x = levels[currentLevel].startRedX;
    ghosts["red"].y = levels[currentLevel].startRedY;
    ghosts["red"].lastX = levels[currentLevel].startRedX;
    ghosts["red"].lastY = levels[currentLevel].startRedY;
    ghosts["red"].size = herosize;
    ghosts["red"].file = document.getElementById("redGhostImage");
    ghosts["red"].dir = 2;
    ghosts["red"].dirPathIndex = 0;
    ghosts["red"].path = levels[currentLevel].redPath;

    console.log(ghosts["red"]);
    game.start();
    
}