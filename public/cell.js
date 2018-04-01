
function Cell(defaultState){
    this.isAlive = defaultState;
    this.willBeAlive = false;
}

//Logic
Cell.prototype.computeNextState = function(aliveNeighborsCount){
    if(aliveNeighborsCount === 3){
        this.willBeAlive = true;
    } else if(aliveNeighborsCount > 3 || aliveNeighborsCount < 2 ){
        this.willBeAlive = false;
    } else {
        this.willBeAlive = this.isAlive;
    }
    return this.willBeAlive;
}

Cell.prototype.nextState = function(){
    this.isAlive = this.willBeAlive;
}





/*Cell
  n -> id for the svg.data()
  x,y coordinates 
  isAlive 
  willBeAlive -> next state
  */  