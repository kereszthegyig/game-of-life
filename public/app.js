var Application = (function(){
    var rows = 30;
    var columns = 30;
    var width = 600;
    var height= 600;
    var data, svg, grid, ID;
    var active = true;
    var timer= 300;
    
    
    function setupEventListeners(){
        setupStep();
        setupRandom();
        setupPlay();
        setupReset();
        setupStop();
    }
    
    function svgInit(){
       
        grid = new Grid(rows, columns);
        data= grid.transformCells();
        svg = d3.select("svg")
                .attr("width", width)
                .attr("height", height);
        updateSvg();
    }
    
    
    function updateSvg(){
        var xRatio = width/columns;
        var yRatio = height/rows;
        
        var fScale = d3.scaleLinear()
                    .domain([0,1])
                    .range(["#ba5536", "#a43820"]);
                    
        var update = svg.selectAll("rect")
            .data(data, d => d.n);
            
        update
            .exit()
            .remove();
            
        update
            .enter()
            .append("rect")
                .on("click", (d)=> {
                    d.isAlive = !d.isAlive;
                    updateSvg();
                })
                .attr("x", d => xRatio*d.y)
                .attr("y", d => yRatio*d.x)
                .attr("width",  xRatio)
                .attr("height", yRatio)
                .attr("fill", d=> fScale(+d.isAlive))
                .attr("stroke-width", 1)
                .attr("stroke", "white")
            .merge(update)
                .transition()
                    .duration(30)
                    .attr("fill", d=> fScale(+d.isAlive))
                    .attr("x", d => xRatio*d.y)
                    .attr("y", d => yRatio*d.x)
                    .attr("width",  xRatio)
                    .attr("height", yRatio);
    }
    
//Setup buttons

    function setupStep(){
    d3.select("#step")
        .on("click", () =>{
            grid.step()
            updateSvg()
        })
    }
    
    function setupRandom(){    
    d3.select("#random")
        .on("click", ()=>{
            grid.random()
            updateSvg()
        })
    }
    
    function setupPlay(){   
    d3.select("#play")
        .on("click", startPlay)
    }
     
    function setupStop(){   
    d3.select("#stop")
        .on("click", clearTheInterval)
    }
        
    function setupReset(){
    d3.select("#reset")
        .on("click", ()=>{
            data = grid.resetCells();
            clearTheInterval()
            updateSvg()
        })
    }
    
    //Helpers
    
    function startPlay(){
        if(active){
                ID = setInterval(function(){
                    grid.step()
                    updateSvg()
                }, timer)
                active=false
            }
    }
    
    function clearTheInterval(){
        clearInterval(ID)
        active = true;
    }
    


return {
    init: function(){
            setupEventListeners()
            svgInit()
        }
    }
    
    
    
    
    
})()

Application.init()




   

        





   

        
