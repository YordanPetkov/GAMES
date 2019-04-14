
"use strict";

var currentLevel = 0;
		
const cellsize = 20,
	  stepsToChangeMouth = 10;
var herosize = cellsize/4*3;


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
	"bluePath": [3,2,1,2,1,0,1,2,1,0],
	"purplePath": [3,2,1,2,1,0,1,2,1,0],
	"orangePath": [3,2,1,2,1,0,1,2,1,0],
	"redPath": [3,2,1,2,1,0,1,2,1,0]
}],
ballChar = ".",
wallChar = "*"; 


function createGame(heroSelector, mazeSelector) {
	var steps = 0;
	var heroCanvas = document.querySelector(heroSelector),
		ctxPacman = heroCanvas.getContext("2d"),
		ctxGhost = heroCanvas.getContext("2d"),
		mazeCanvas = document.querySelector(mazeSelector),
		ctxMaze = mazeCanvas.getContext("2d"),
		isMouthOpen = false,
		pacman = {
			"x" : levels[currentLevel].startPacmanX,
			"y" : levels[currentLevel].startPacmanY,
			"size" : herosize,
			"speed": 1
		},
		ghosts = {
			"blue" : {
					"x" : levels[currentLevel].startBlueX,
					"y" : levels[currentLevel].startBlueY,
					"size" : herosize,
					"speed": 1,
					"file": document.getElementById("blueGhostImage"),
					"curDir": 0,
					"path": levels[currentLevel].bluePath

				},
			"orange" : {
				"x" : levels[currentLevel].startOrangeX,
				"y" : levels[currentLevel].startOrangeY,
				"size" : herosize,
				"speed": 1,
				"file": document.getElementById("orangeGhostImage"),
				"curDir": 0,
				"path": levels[currentLevel].orangePath
			},
			"purple" : {
				"x" : levels[currentLevel].startPurpleX,
				"y" : levels[currentLevel].startPurpleY,
				"size" : herosize,
				"speed": 1,
				"file": document.getElementById("purpleGhostImage"),
				"curDir": 0,
				"path": levels[currentLevel].purplePath
			},
			"red" : {
				"x" : levels[currentLevel].startRedX,
				"y" : levels[currentLevel].startRedY,
				"size" : herosize,
				"speed": 1,
				"file": document.getElementById("redGhostImage"),
				"curDir": 0,
				"path": levels[currentLevel].redPath
			},
			
		},
		balls = [],
		walls = [],
		dir = 0,
		keyCodeToDirs = {
			"37": 2,
			"38": 3,
			"39": 0,
			"40": 1 
		};
		const dirDeltas = [
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
		columns = levels[currentLevel].maze[0].length,
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

		drawPacman();
		checkGhostCollidings();
		drawGhosts();
		


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
				balls.splice(index, 1);
			}
		});
		var futurePosition = {
			"x": pacman.x + dirDeltas[dir].x * pacman.speed,
			"y": pacman.y + dirDeltas[dir].y * pacman.speed,
			"size": pacman.size
		};		

		

		if(!isObjectCollidingWithWall(futurePosition) && !isPacmanCollidingWithGhost(futurePosition)){
			
			if(updatePacmanPosition()) {
				
				ctxPacman.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
			}
		}

		

		
		
		window.requestAnimationFrame(gameLoop);
	}

	function isObjectCollidingWithWall(obj){
		var isObjCollidingWithWall = false;
		walls.forEach(function(wall, index){
			if(areCollinding(obj,wall) || areCollinding(wall,obj)){
				isObjCollidingWithWall = true;
			}
		});
		return isObjCollidingWithWall;
	}

	function isPacmanCollidingWithGhost(obj){
		for(var ghost in ghosts){
			if(areCollinding(obj,ghosts[ghost]) || areCollinding(ghosts[ghost],obj)){
				return true;
			}
		}
		/*
		if(areCollinding(obj,ghosts.blue) || areCollinding(ghosts.blue,obj)){
			return "blue";
		}
		if(areCollinding(obj,ghosts.purple) || areCollinding(ghosts.purple,obj)){
			return "purple";
		}
		if(areCollinding(obj,ghosts.orange) || areCollinding(ghosts.orange,obj)){
			return "orange";
		}
		if(areCollinding(obj,ghosts.red) || areCollinding(ghosts.red,obj)){
			return "red";
		}*/
		return false;
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

	function areCollinding(obj1, obj2){
		var sizes1 = positionToBounds(obj1),
		sizes2 = positionToBounds(obj2);
		return (isBetween(sizes2.left,sizes1.left,sizes1.right) || isBetween(sizes2.right,sizes1.left,sizes1.right))
		    && (isBetween(sizes2.bottom,sizes1.top,sizes1.bottom) || isBetween(sizes2.top,sizes1.top,sizes1.bottom));
		/*return ((sizes1.left <= sizes2.left && sizes2.left <= sizes1.right) ||
		(sizes1.left <= sizes2.right && sizes2.right <= sizes1.right))
		 && ((sizes1.top <= sizes2.top && sizes2.top <= sizes1.bottom)||
		 (sizes1.top <= sizes2.bottom && sizes2.bottom <= sizes1.bottom));*/
	}

	function checkGhostCollidings(){
		var collidingGhosts = {
			"blue": false,
			"purple": false,
			"orange": false,
			"red": false
		}	

		for(var ghost in ghosts){
			var futurePosition = {
				"x": ghosts[ghost].x + dirDeltas[ghosts[ghost].path[ghosts[ghost].curDir]].x * ghosts[ghost].speed,
				"y": ghosts[ghost].y + dirDeltas[ghosts[ghost].path[ghosts[ghost].curDir]].y * ghosts[ghost].speed,
				"size": ghosts[ghost].size
			};

			if(!isObjectCollidingWithWall(futurePosition)){
				if(updateGhostPosition(ghosts[ghost])) {
					ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
				}
			}

			else {
				updateGhostDir(ghost);
			}
		}
	}

	function drawBall(ctx,ballToDraw){
		
		ctx.fillStyle = "yellow";
		ctx.beginPath();
		var x = ballToDraw.x + ballToDraw.size / 2;
		var y = ballToDraw.y + ballToDraw.size / 2;
		var size = ballToDraw.size / 2 ;
		ctx.arc(x, y, size,0,2*Math.PI);
		ctx.fill();
	}

	function drawPacman(){
		ctxPacman.beginPath();
		ctxPacman.fillStyle = "yellow";
		if(isMouthOpen){
			var deltaRadians = dir * Math.PI / 2;
			var x = pacman.x + pacman.size / 2;
			var y = pacman.y + pacman.size / 2;
			var size = pacman.size / 2;
			ctxPacman.arc(x, y, size,deltaRadians + Math.PI / 4,deltaRadians +  7 * Math.PI / 4);
			ctxPacman.lineTo(x,y);
			ctxPacman.fill();
		}
		else {
			drawBall(ctxPacman, pacman);
			//ctxPacman.arc(pacman.x, pacman.y, pacman.size,0,2*Math.PI);
		}
		
	}

	function drawGhosts(){
		ctxGhost.beginPath();
		/*var redFile = document.getElementById("redGhostImage"),
			blueFile = document.getElementById("blueGhostImage"),
			purpleFile = document.getElementById("purpleGhostImage"),
			orangeFile = document.getElementById("orangeGhostImage");*/
			for(var ghost in ghosts){
				ctxGhost.drawImage(ghosts[ghost].file, ghosts[ghost].x , ghosts[ghost].y, ghosts[ghost].size, ghosts[ghost].size);
			}

		/*ctxGhost.drawImage(blueFile, ghosts.blue.x , ghosts.blue.y, ghosts.blue.size, ghosts.blue.size);
		ctxGhost.drawImage(purpleFile, ghosts.purple.x , ghosts.purple.y, ghosts.purple.size, ghosts.purple.size);
		ctxGhost.drawImage(orangeFile, ghosts.orange.x , ghosts.orange.y, ghosts.orange.size, ghosts.orange.size);
		ctxGhost.drawImage(redFile, ghosts.red.x , ghosts.red.y, ghosts.red.size, ghosts.red.size);*/
		//ctxPacman.drawImage()
	
		
	}

	function updatePacmanPosition(){
		pacman.x += dirDeltas[dir].x * pacman.speed;
		pacman.y += dirDeltas[dir].y * pacman.speed;

		if(pacman.x < 0 || pacman.x > heroCanvas.width ||
			pacman.y < 0 || pacman.y > heroCanvas.height){
			pacman.x = (pacman.x + heroCanvas.width) % heroCanvas.width;
			pacman.y = (pacman.y + heroCanvas.height) % heroCanvas.height;
			return true;
		}
		return false;
	}

	function updateGhostPosition(ghost){
		ghost.x += dirDeltas[ghost.path[ghost.curDir]].x * ghost.speed;
		ghost.y += dirDeltas[ghost.path[ghost.curDir]].y * ghost.speed;

		if(ghost.x < 0 || ghost.x > heroCanvas.width ||
			ghost.y < 0 || ghost.y > heroCanvas.height){
			ghost.x = (ghost.x + heroCanvas.width) % heroCanvas.width;
			ghost.y = (ghost.y + heroCanvas.height) % heroCanvas.height;
			return true;
		}
		return false;
	}

	function updateGhostDir(ghost){
		/*
		if(!isObjectCollidingWithWall(ghosts.blue)){
			if(updateGhostPosition(ghosts.blue)) {
				ctxGhost.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
			}
		}
		*/
		/*var collidingGhosts = checkGhostCollidings();
		for(var ghost in ghosts){
			if(collidingGhosts[ghost])ghosts[ghost].dir = (ghosts[ghost].dir + 1) % 4;
		}*/

		
		ghosts[ghost].curDir = (ghosts[ghost].curDir + 1) % (ghosts[ghost].path.length);
		

	}

	function drawMazeAndGetBallsAndWalls(ctx, maze, cellSize){
		var row,
			col,
			cell,
			obj,
			balls = [],
			walls = [],
			wallImage = document.getElementById("wallImage");
		
		for(row = 0; row < maze.length; row +=1){
			for(col = 0; col < maze[row].length; col +=1){
				cell = maze[row][col];
				
				if(cell === ballChar){
					obj = {
						"x": col * cellSize + cellSize/4,
						"y": row * cellSize + cellSize/4,
						"size": cellSize/2
					};
					balls.push(obj);
					drawBall(ctx, obj);
				}
				else if(cell === wallChar){
					obj = {
						"x": col * cellSize,
						"y": row * cellSize,
						"size": cellSize
					};
					walls.push(obj);
					ctx.drawImage(wallImage, obj.x , obj.y, cellSize, cellSize);
				}
			}
		}
		return [
			balls,
			walls
		];
	}

	document.body.addEventListener("keydown", function(){
		//ev.keyCode - code of pressed key
		event.preventDefault();
		if(!keyCodeToDirs.hasOwnProperty(event.keyCode)){
			if(keyCodeToDirs[event.keyCode]);
			if(event.keyCode == 27){
			}
			return;
		}
		dir = keyCodeToDirs[event.keyCode];
		
	});

	
	return {
		"start" : function(){
			[balls, walls] = drawMazeAndGetBallsAndWalls(ctxMaze, levels[currentLevel].maze, cellsize);
			
			gameLoop();
		}
	};
}