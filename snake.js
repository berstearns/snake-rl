const readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


class Snake {
   move(userInput,env){
    var direction_map = {
	    "up":["x",-1],
	    "down":["x",+1],
	    "right":["y",+1],
	    "left":["y",-1],
    }
       var axis = direction_map[userInput][0]	
       var axis_min = env.ranges[axis]["min"]
       var axis_max = env.ranges[axis]["max"]
       var n_steps = direction_map[userInput][1]	

       this.pos[0]["dir"] = userInput; 
       env.matrix[this.pos[0]["x"]][this.pos[0]["y"]] = 0
       this.pos[0][axis] += n_steps
       //console.log(this.pos[0][axis])
       //console.log(axis_min, axis_max)
       if( this.pos[0][axis] < axis_min || 
	       this.pos[0][axis] > axis_max  ){
            env.isGameOver = 1;
        }
       else{
	if(env.matrix[this.pos[0]["x"]][this.pos[0]["y"]] == 2)
	{
		this.score+=1
		print(this.score)
	}
            env.matrix[this.pos[0]["x"]][this.pos[0]["y"]] = 1
       }
}
   constructor(x,y){
    this.pos = [{x:x,y:y,dir:"left"}];
    this.score = 0;
   } 
}

class Enviroment{
    init_matrix(n,r){
        var matrix = [];
        for(var i=0; i<n ;++i){
            matrix.push(new Array(r).fill(0));
        }
	var foodY = Math.floor( Math.random() * matrix.length );
	var foodX = Math.floor( Math.random() * matrix[0].length );
	matrix[foodY][foodX] = 2
        return matrix
    }
    constructor(n,r){
        this.isGameOver = 0;
	this.ranges ={
		x:{min: 0, max:n-1},
		y:{min: 0, max:r-1}
	}
        this.matrix= this.init_matrix(n,r);
    }
}

const env = new Enviroment(10,10);
const snake = new Snake(4,4);
const moves = ["up","down","right","left"]

function iterate(){
	var moveIdx = Math.floor( Math.random() * moves.length );
	var userInput = moves[moveIdx];  
	snake.move(userInput,env);
	if(env.isGameOver){ 
	    console.log("GAME OVER");
	    print(snake.score)
	    clearInterval(callerId);
    	} 
	else{

		console.log(userInput);
		console.log(env.matrix);
	}
}
const callerId = setInterval(iterate,400);
/**/
