
//create the grid and fill it with Cells
//arr example -> [true, false, false, true]
function Grid(rows, columns, arr){
   if(!arr){
        this.cells = new Array(rows)
        var n = 0;
        
        for(var i=0; i<rows ; i++){
            this.cells[i] = new Array(columns);
            for(var j=0; j<columns; j++){
                var cell = new Cell(false);
                cell.n = n++;
                cell.x = i;
                cell.y = j;
                this.cells[i][j]=cell;
            }
        }
   } else {
        this.cells = new Array(rows)
        var n = 0;
        for(var i=0; i<rows ; i++){
            this.cells[i] = new Array(columns);
            for(var j=0; j<columns; j++){
                var cell = new Cell(arr[n]);
                cell.n = n++;
                cell.x = i;
                cell.y = j;
                this.cells[i][j]=cell;
            }
        }
   }
}


    

//logic
Grid.prototype.isAliveAt = function(x,y){
    if( x<0 || x >= this.cells.length || y <0 || y >= this.cells[0].length ){
        return false
    }
    return this.cells[x][y].isAlive
}

Grid.prototype.aliveNeighborsFor = function(x,y){
    var neighbors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    var count= 0
    for(var i=0; i<neighbors.length; i++){
        count += (this.isAliveAt.call(this, (x+neighbors[i][0]), (y+neighbors[i][1]))) ? 1 : 0;
    }
    return count;
    
}

Grid.prototype.eachCell =  function(callback){
    var rows = this.cells.length;
    var columns = this.cells[0].length;
    var x,y;
    
     for(var i = 0; i < rows * columns; i++){
        x = i%rows; y = Math.floor(i/rows);
        callback.apply(this,[this.cells[x][y],x,y]);
    }
};

Grid.prototype.prepareStep = function(){
    this.eachCell(function(cell,x,y){
         cell.computeNextState(this.aliveNeighborsFor(x,y));
    });
   
};

Grid.prototype.step = function(){
    this.prepareStep();
    this.eachCell(function(cell,x,y){
        cell.nextState();
    })
}

Grid.prototype.transformCells = function(){
    var cells = [];
    this.eachCell(function(cell){
        cells.push(cell);
    })
    return cells;
}

Grid.prototype.random = function(){
    this.eachCell(function(cell){
        cell.isAlive= Math.random()>0.5;
        
    })
}

Grid.prototype.resetCells = function(){
    var cells = [];
    this.eachCell(function(cell){
        cell.isAlive = false;
        cells.push(cell)
    })
    return cells
}

