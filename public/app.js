var Application = (function(){
    var rows = 30;
    var columns = 30;
    var width = 600;
    var height= 600;
    var data, svg;
    
    
    function svgInit(){
       
        var grid = new Grid(rows, columns);
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
                    .range(["#c0392b", "#3a3a3a"]);
                    
        var update = svg.selectAll("rect")
            .data(data, d => d.n);
            
        update
            .exit()
            .remove();
            
        update
            .enter()
            .append("rect")
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


return {
    init: function(){
            svgInit()
        }
    }
    
    
    
    
    
})()

Application.init()




   

        





   

        
