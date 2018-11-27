const readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


class Snake {
   move(userInput,env){
    env.matrix[0][0] = 1;
   }
   constructor(n,r){
    this.pos = (n,r);
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
const snake = new Snake();
const moves = ["up","down","right","left"]

function iterate(){
    var moveIdx = Math.floor( Math.random() * moves.length );
    var userInput = moves[moveIdx];  
    snake.move(userInput,env);
    console.log(env.matrix);
    console.log(userInput);
}
setInterval(iterate,4000);
/**/
