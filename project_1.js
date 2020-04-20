
var starbucks; 

d3.csv('starbucks.csv').then(function(data){
	data.forEach(function(d){
		d.Lat = +d.Lat; 
		d.Long = +d.Long; 
	});
	
	starbucks = data; 
	doSomething(); 
});


function doSomething(){
var width = 1600; 
var height = 1000; 

//creates the svg element for the map
var svg = d3.select("body")
	.append("svg")
    .attr("width", width)
    .attr("height", height);

//sets the projections 
var projection = d3.geoAlbersUsa();
	
//contains the geometry elements
var g = svg.append("g"); 

//turns coordinates into screen coordinates
var path = d3.geoPath()
	.projection(projection);

//draw map 
g.selectAll("path")
	.data(counties_json.features)
	.enter()
	.append("path")
	.attr("fill", "#ccc")
	.attr("stroke", "#333")
	.attr("d", path);

var star = svg.append("g");

svg.selectAll("circle")
.data(starbucks)
.enter()
.append("circle")
.attr("r",1)
.attr("class","circles")
.attr("transform", function(d) {return "translate(" + projection([d.Long,d.Lat]) + ")";});
};