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
       // axis is the direction axis the snake is moving ('x' in vertical, 'y' in horizontal)
       var axis = direction_map[userInput][0]	
       // max & min are the boundaries from the enviroment
       var axis_min = env.ranges[axis]["min"]
       var axis_max = env.ranges[axis]["max"]
       // how many steps the snake will make, for the moment just one step per move
       var n_steps = direction_map[userInput][1]	

       this.pos["dir"] = userInput; 
       console.log(this.pos)
       var tail_idx = this.pos["body"].length - 1;
       var previous_tail =  this.pos["body"][tail_idx]
       // erase current snake, update snake positions, re-write in matrix
       for( var idx in this.pos["body"] ){
           env.matrix[this.pos["body"][idx]["y"]][this.pos["body"][idx]["x"]]=0
	   this.pos["body"][idx][axis] += n_steps
       }
       for( var idx in this.pos["body"] ){
           env.matrix[this.pos["body"][idx]["y"]][this.pos["body"][idx]["x"]]=1
       }
       //
       //env.matrix[this.pos["body"][0]["x"]][this.pos["body"][0]["y"]] = 0
       //this.pos["body"][0][axis] += n_steps

       if( this.pos["body"][0][axis] < axis_min || 
	       this.pos["body"][0][axis] > axis_max  ){
            env.isGameOver = 1;
        }
       else{
	if(env.matrix[this.pos["body"][0]["x"]][this.pos["body"][0]["y"]] == 2)
	{
		this.score+=1
	        this.pos["body"].push(previous_tail);
		env.matrix[previous_tail["y"]][previous_tail["x"]] = 1
		console.log(this.score)
	}
            env.matrix[this.pos["body"][0]["x"]][this.pos["body"][0]["y"]] = 1
       }
}
   constructor(x,y){
    this.pos = {
	    "body":[{x:x,y:y}],
	    "dir":"left"
    };
    this.score = 0;
   } 
}

class Enviroment{
    init_matrix(n,r){
        var matrix = [];
        for(var i=0; i<n ;++i){
            matrix.push(new Array(r).fill(0));
        }
        return matrix
    }
    constructor(n,r){
        this.isGameOver = 0;
	this.ranges ={
		x:{min: 0, max:n-1},
		y:{min: 0, max:r-1}
	}
        this.matrix= this.init_matrix(n,r);
	for(const x of Array(50).keys()){
		this.generate_food();
	}
    }
    generate_food(){
	var foodY = Math.floor( Math.random() * this.matrix.length );
	var foodX = Math.floor( Math.random() * this.matrix[0].length );
	while(this.matrix[foodY][foodX] == 1){
		foodY = Math.floor( Math.random() * this.matrix.length );
		foodX = Math.floor( Math.random() * this.matrix[0].length );
	}
	this.matrix[foodY][foodX] = 2
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
	    console.log(snake.score)
	    clearInterval(callerId);
    	} 
	else{
		console.log(userInput);
		console.log(env.matrix);
	}
}
const callerId = setInterval(iterate,400);
/**/
