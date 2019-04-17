
"use strict";

var currentLevel = 1,game;
var heroCanvas,
	mazeCanvas,
	scoreCanvas,
	ctxPacman,
	ctxGhost,
	ctxMaze;
const cellsize = 20,
	  stepsToChangeMouth = 10,
	  r = 0,
	  d = 1,
	  l = 2,
	  u = 3;
var herosize = cellsize/4*3;
var speed = 1,
steps = 0,
isMouthOpen = false,
gameScore = 0,
deadCouns = 0,
pointsPerBall = 10;

const 
levels = [{
	"maze" : [
		"*********************",
		"*.........*.........*",
		"*.***.***.*.***.***.*",
		"*.* *.* *.*.* *.* *.*",
		"*.***.***.*.***.***.*",
		"*...................*",
		"*.***.*.*****.*.***.*",
		"*.***.*.*****.*.***.*",
		"*.....*...*...*.....*",
		"*****.*** * ***.*****",
		"    *.*       *.*    ",
		"    *.* ** ** *.*    ",
		"*****.* *   * *.*****",
		"......  *   *  ......",
		"*****.* ***** *.*****",
		"    *.*       *.*    ",
		"    *.* ***** *.*    ",
		"*****.* ***** *.*****",
		"*.........*.........*",
		"*.***.***.*.***.***.*",
		"*...*...........*...*",
		"***.*.*.*****.*.*.***",
		"*...*.*...*...*.*...*",
		"*.***.***.*.***.***.*",	
		"*...................*",
		"*********************"
	],
	"startPacmanX" : 0,
	"startPacmanY" : 13*cellsize + 2,

	"startBlueX" : 10*cellsize + 2,
	"startBlueY" : 13*cellsize + 2,
	"startOrangeX" : 10*cellsize + 2,
	"startOrangeY" : 13*cellsize + 2,
	"startPurpleX" : 10*cellsize + 2,
	"startPurpleY" : 13*cellsize + 2,
	"startRedX" : 10*cellsize + 2,
	"startRedY" : 12*cellsize + 2,
	"bluePath": [3,0,3,1,2,1,3,0,2,1,0,3,1,0,1,2,3,0],
	"purplePath": [3,0,2,3,3,2,1,2,1,0,1,2,1,0,1,3,0,2,1,3,0,2,1,3],
	"orangePath": [3,0,2,3,3,2,1,0,1,0,1,2,1,0,1,0,2,3,1],
	"redPath": [3,0,2,3,3,0,3,1,2,0,1,2,1,0,2,1,2,0,1]
},
{
	"maze" : [
		"*********************",
		"*.........*.........*",
		"*.***.***.*.***.***.*",
		"*.* *.* *.*.* *.* *.*",
		"*.***.***.*.***.***.*",
		"*...................*",
		"*.***.*.*****.*.***.*",
		"*.***.*.*****.*.***.*",
		"*..... ...*... .....*",
		"*****.* * * * *.*****",
		"    *.*   *   *.*    ",
		"    *.* *   * *.*    ",
		"*****.* *   * *.*****",
		"......      *  ......",
		"*****.* ***** *.*****",
		"    *.*       *.*    ",
		"    *.* ***** *.*    ",
		"*****.* ***** *.*****",
		"*.........*.........*",
		"*.***.***.*.***.***.*",
		"*...*...........*...*",
		"***.*.*.*****.*.*.***",
		"*...*.*...*...*.*...*",
		"*.***.***.*.***.***.*",	
		"*...................*",
		"*********************"
	],
	"startPacmanX" : 10*cellsize + 2,
	"startPacmanY" : 15*cellsize + 2,

	"startBlueX" : 11*cellsize + 2,
	"startBlueY" : 13*cellsize + 2,
	"startOrangeX" : 9*cellsize + 2,
	"startOrangeY" : 12*cellsize + 2,
	"startPurpleX" : 11*cellsize + 2,
	"startPurpleY" : 13*cellsize + 2,
	"startRedX" : 10*cellsize + 2,
	"startRedY" : 13*cellsize + 2,
	"bluePath": [u,r,u,l,d,l,d,r,d,l,d,r,d,l,d,r,d,l,u,r,u,l,u,r,d,l,u,r,d,l,d],
	"purplePath": [l,d,r,u,l,u,r,d,l,d,r,d,l,u,r,u,l,u,r,d,l,u,l,d,l,d,l,u,l,u,r,d],
	"orangePath": [u,l,u,r,d,l,d,r,d,r,u,r,d,l,d,l,u,l,u,r,d,r,d,l,d,l,d,l,d,r,d],
	"redPath": [l,d,l,d,l,d,l,u,r,u,l,u,r,d,l,u,l,d,r,d,l,u,r,u,l,d,r,d,r,d]
}],
ballChar = ".",
wallChar = "*",
dirDeltas = [
	{
		"x": +1,
		"y": 0
	},
	{
		"x": 0,
		"y": +1
	},
	{
		"x": -1,
		"y": 0
	},
	{
		"x": 0,
		"y": -1
	}
],
keyCodeToDirs = {
	"37": 2,
	"38": 3,
	"39": 0,
	"40": 1 
};

var pacman = {
	"x" : levels[currentLevel].startPacmanX,
	"y" : levels[currentLevel].startPacmanY,
	"size" : herosize,
	"speed": 0,
	"dir": 0
},

ghosts = {
	"blue" : {
		"x" : levels[currentLevel].startBlueX,
		"y" : levels[currentLevel].startBlueY,
		"lastX": levels[currentLevel].startBlueX,
		"lastY": levels[currentLevel].startBlueY,
		"size" : herosize,
		"speed": speed,
		"file": document.getElementById("blueGhostImage"),
		"dir": 3,
		"dirPathIndex": 0,
		"path": levels[currentLevel].bluePath

	},
	"orange" : {
		"x" : levels[currentLevel].startOrangeX,
		"y" : levels[currentLevel].startOrangeY,
		"lastX": levels[currentLevel].startOrangeX,
		"lastY": levels[currentLevel].startOrangeY,
		"size" : herosize,
		"speed": speed,
		"file": document.getElementById("orangeGhostImage"),
		"dir": 3,
		"dirPathIndex": 0,
		"path": levels[currentLevel].orangePath
	},
	"purple" : {
		"x" : levels[currentLevel].startPurpleX,
		"y" : levels[currentLevel].startPurpleY,
		"lastX": levels[currentLevel].startPurpleX,
		"lastY": levels[currentLevel].startPurpleY,
		"size" : herosize,
		"speed": speed,
		"file": document.getElementById("purpleGhostImage"),
		"dir": 2,
		"dirPathIndex": 0,
		"path": levels[currentLevel].purplePath
	},
	"red" : {
		"x" : levels[currentLevel].startRedX,
		"y" : levels[currentLevel].startRedY,
		"lastX": levels[currentLevel].startRedX,
		"lastY": levels[currentLevel].startRedY,
		"size" : herosize,
		"speed": speed,
		"file": document.getElementById("redGhostImage"),
		"dir": 2,
		"dirPathIndex": 0,
		"path": levels[currentLevel].redPath
	}
	
},
balls = [],
walls = [],
columns,
rows;

function createGame(heroSelector, mazeSelector) {

	heroCanvas = document.querySelector(heroSelector);
	mazeCanvas = document.querySelector(mazeSelector);

	ctxPacman = heroCanvas.getContext("2d");
	ctxGhost = heroCanvas.getContext("2d");
	ctxMaze = mazeCanvas.getContext("2d");

	
		/*dir = 0,*/
		
		columns = levels[currentLevel].maze[0].length;
		rows = levels[currentLevel].maze.length;
		mazeCanvas.width = columns  * cellsize;
		mazeCanvas.height = rows  * cellsize;
		heroCanvas.width = columns  * cellsize;
		heroCanvas.height = rows  * cellsize;
		/*
		0 -> right
		1 -> down
		2 -> left
		3 -> up
		*/

	function gameLoop() {
		if(balls.length == 0){
			currentLevel = (currentLevel + 1) % levels.length;
			deadCouns = 0;
			RestartGame();
			//console.log(3);
			return;
		}
		const offset = 5;
		ctxPacman.clearRect(pacman.x - offset, pacman.y - offset, pacman.size + offset*2, pacman.size + offset*2);
		for(var ghost in ghosts){
			ctxPacman.clearRect(ghosts[ghost].x - offset, ghosts[ghost].y - offset, ghosts[ghost].size + offset*2, ghosts[ghost].size + offset*2);

		}

		/*
		ctxPacman.clearRect(ghosts.blue.x - offset, ghosts.blue.y - offset, ghosts.blue.size + offset*2, ghosts.blue.size + offset*2);
		ctxPacman.clearRect(ghosts.purple.x - offset, ghosts.purple.y - offset, ghosts.purple.size + offset*2, ghosts.purple.size + offset*2);
		ctxPacman.clearRect(ghosts.orange.x - offset, ghosts.orange.y - offset, ghosts.orange.size + offset*2, ghosts.orange.size + offset*2);
		ctxPacman.clearRect(ghosts.red.x - offset, ghosts.red.y - offset, ghosts.red.size + offset*2, ghosts.red.size + offset*2);
		*/

		draw();
		


		steps += 1;
		if(0 === (steps % stepsToChangeMouth)){
			isMouthOpen = !isMouthOpen;
			steps = 0;
		}

		

		var index;
		balls.forEach(function(ball, index){
			const offset = 2;
			if(areCollinding(pacman,ball)){
				ctxMaze.clearRect(ball.x - offset, ball.y - offset,ball.size + offset*2,ball.size + offset*2);
				gameScore += pointsPerBall;
				balls.splice(index, 1);
				
			}
		});
		var futurePosition = {
			"x": pacman.x + dirDeltas[pacman.dir].x * pacman.speed,
			"y": pacman.y + dirDeltas[pacman.dir].y * pacman.speed,
			"size": pacman.size
		};		

		if(isPacmanCollidingWithGhost(pacman)){deadCouns += 1;RestartGame();return;}

		if(!isObjectCollidingWithWall(futurePosition)){// && !isPacmanCollidingWithGhost(futurePosition)
			
			if(updatePacmanPosition()) {
				
				ctxPacman.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
			}
		}

		
		
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
		var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
		
		//var myReq = requestAnimationFrame(gameLoop);

		setTimeout(gameLoop, 45);
	}	
	
	return {
		"start" : function(){
			//RestartGame();
			[balls, walls] = drawMazeAndGetBallsAndWalls(ctxMaze, levels[currentLevel].maze, cellsize);
			gameLoop();
			
		}
	};
}