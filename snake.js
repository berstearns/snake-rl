const readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


class Snake {
   move(userInput,env){
    if( userInput === "up"){
       this.pos[0]["dir"] = "up"; 
       env.matrix[this.pos[0]["x"]][this.pos[0]["y"]] = 0
       this.pos[0]["x"] -= 1;
       env.matrix[this.pos[0]["x"]][this.pos[0]["y"]] = 1
    }
   }
   constructor(x,y){
    this.pos = [{x:x,y:y,dir:"left"}];
   } 
}

class Enviroment{
    init_matrix(n,r){
        var matrix = [];
        for(var i=0; i<=n ;++i){
            matrix.push(new Array(r).fill(0));
        }
        return matrix
    }
    constructor(n,r){
        this.isGameOver = 0;
        this.matrix= this.init_matrix(n,r);
    }
}

const env = new Enviroment(10,10);
const snake = new Snake(4,4);
const moves = ["up"]//,"down","right","left"]

function iterate(){
    var moveIdx = Math.floor( Math.random() * moves.length );
    var userInput = moves[moveIdx];  
    snake.move(userInput,env);
    console.log(env.matrix);
    console.log(userInput);
}
setInterval(iterate,4000);
/**/
