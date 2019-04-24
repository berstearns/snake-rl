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
       //
       this.pos["dir"] = userInput; 
       var tail_idx = this.pos["body"].length - 1;
       var previous_tail =  {...this.pos["body"][tail_idx]}
       // erase current snake, update snake positions
       //console.log("snake before", this.pos["body"]);
       for( var idx in this.pos["body"] ){
           idx = parseInt(idx);
           var len = parseInt(this.pos["body"].length);
           var reverse_idx = len  - 1 - idx; 
           env.matrix[this.pos["body"][reverse_idx]["x"]][this.pos["body"][reverse_idx]["y"]]=0
           if(reverse_idx==0){
               //console.log("first : ",axis,n_steps,this.pos["body"][idx])
               this.pos["body"][reverse_idx][axis] += n_steps;
           }
           else{
            this.pos["body"][reverse_idx] = {...this.pos["body"][reverse_idx-1]}
           }
           //console.log("idx : ",reverse_idx," ",this.pos["body"])
       }

       //console.log("after cleaning ",env.matrix);
       //console.log("action ",userInput);
       // check if next step ends game or not, else update env matrix and snake
       if( this.pos["body"][0][axis] < axis_min || 
	       this.pos["body"][0][axis] > axis_max  ){
            env.isGameOver = 1;
        }
       else{
           var next_head_cell_val = env.matrix[this.pos["body"][0]["x"]][this.pos["body"][0]["y"]]
           //console.log("cell val", next_head_cell_val);
           if(next_head_cell_val == 2)
           {
                    this.score+=1
                    //console.log(previous_tail);
                    this.pos["body"].push(previous_tail);
                    //env.matrix[previous_tail["y"]][previous_tail["x"]] = 1
                    //console.log(this.score)
           }
           if(next_head_cell_val == 1)
           {
            env.isGameOver = 1;
           }
           //console.log("snake after", this.pos["body"]);
           // re-write in matrix
           for( var idx in this.pos["body"] ){
               env.matrix[this.pos["body"][idx]["x"]][this.pos["body"][idx]["y"]]=1
           }
       }
}
   constructor(x,y,env){
    this.pos = {
	    "body":[{x:x,y:y}],
	    "dir":"left"
    };
    env.matrix[y][x] = 1;
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
const snake = new Snake(4,4,env);
console.log(env.matrix);
var opposite_directions = {
        "up":"down",
        "down":"up",
        "right":"left",
        "left":"right",
}


function iterate(iii,lastMove,env){
        console.log("iteration : ",iii);
        iii+=1;
        if(iii === 1000000){process.exit();}
        var iteration_possible_moves = ["up","down","right","left"]
        if(opposite_directions[lastMove]){
            iteration_possible_moves.splice(
                iteration_possible_moves.indexOf(opposite_directions[lastMove]),1
            );
        }
	var moveIdx = Math.floor( Math.random() * iteration_possible_moves.length );
	var userInput = iteration_possible_moves[moveIdx];  
	snake.move(userInput,env);
	if(env.isGameOver){ 
	    console.log("GAME OVER");
	    console.log(snake.score)
            console.log(userInput);
            process.exit();
    	} 
	else{
		console.log(env.matrix);
	}
        return iterate(iii,userInput,env)
}
var iii = 1;
iterate(iii,null,env);

//const callerId = setInterval(function(){iterate(iii)},400);
/**/
