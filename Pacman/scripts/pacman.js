
"use strict";

var currentLevel = 0;
		
const cellsize = 20,
	  stepsToChangeMouth = 10;


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
	"startX" : 0,
	"startY" : 13*cellsize + 2
}],
ballChar = ".",
wallChar = "*"; 


function createGame(pacmanSelector, mazeSelector) {
	var steps = 0;
	var pacmanCanvas = document.querySelector(pacmanSelector),
		ctxPacman = pacmanCanvas.getContext("2d"),
		mazeCanvas = document.querySelector(mazeSelector),
		ctxMaze = mazeCanvas.getContext("2d"),
		isMouthOpen = false,
		pacman = {
			"x" : levels[currentLevel].startX,
			"y" : levels[currentLevel].startY,
			"size" : cellsize/4*3,
			"speed": 1
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

		pacmanCanvas.width = columns  * cellsize;
		pacmanCanvas.height = rows  * cellsize;
		/*
		0 -> right
		1 -> down
		2 -> left
		3 -> up
		*/
		

	function gameLoop() {
		const offset = 5;
		ctxPacman.clearRect(pacman.x - offset, pacman.y - offset, pacman.size + offset*2, pacman.size + offset*2);
		
		drawPacman();
		
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

		var isPacmanCollidingWithWall = false;
		var futurePosition = {
			"x": pacman.x + dirDeltas[dir].x * pacman.speed,
			"y": pacman.y + dirDeltas[dir].y * pacman.speed,
			"size": pacman.size
		};

		walls.forEach(function(wall, index){
			if(areCollinding(futurePosition,wall) || areCollinding(wall,futurePosition)){
				isPacmanCollidingWithWall = true;
			}
		});

		if(!isPacmanCollidingWithWall){
			if(updatePacmanPosition())
			{
				ctxPacman.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height);
			}
		}
		
		window.requestAnimationFrame(gameLoop);
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

	function updatePacmanPosition(){
		pacman.x += dirDeltas[dir].x * pacman.speed;
		pacman.y += dirDeltas[dir].y * pacman.speed;

		if(pacman.x < 0 || pacman.x > pacmanCanvas.width ||
			pacman.y < 0 || pacman.y > pacmanCanvas.height){
			pacman.x = (pacman.x + pacmanCanvas.width) % pacmanCanvas.width;
			pacman.y = (pacman.y + pacmanCanvas.height) % pacmanCanvas.height;
			return true;
		}
		return false
	}

	document.body.addEventListener("keydown", function(){
		//ev.keyCode - code of pressed key
		event.preventDefault();
		if(!keyCodeToDirs.hasOwnProperty(event.keyCode)){
			return;
		}
		dir = keyCodeToDirs[event.keyCode];
		
	});

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

	
	return {
		"start" : function(){
			[balls, walls] = drawMazeAndGetBallsAndWalls(ctxMaze, levels[currentLevel].maze, cellsize);
			
			gameLoop();
		}
	};
}