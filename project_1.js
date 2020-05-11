
var starbucks; 
//holds input val from slider
var inputValue = null; 

var years = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
			 "2000","2001","2002", "2003","2004","2005","2006","2007","2008","2009",
			 "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];


d3.csv('starbucks1.csv').then(function(data){
	data.forEach(function(d){
		d.Lat = +d.Lat; 
		d.Long = +d.Long; 
		d.CityState = d.CityState;
		d.Mopened = d.Mopened; 
		d.Year = d.Year; 
	});
	
	starbucks = data; 

	doSomething();
});


function doSomething()
{
	var width = 1600; 
	var height = 1000; 

	//creates the svg element for the map
	var svg = d3.select("body")
		.append("svg")
   		.attr("width", width)
    	.attr("height", height);

	//sets the projections 
	var projection = d3.geoAlbersUsa()
	.scale(1700)
	.translate( [width/2,height/2] );
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
		.attr("d", path);

	var star = svg.append("g");

	star.selectAll("circle")
	.data(starbucks)
	.enter()
	.append("circle")
	.attr("fill", initialDate)
	.attr("r",3)
	.attr("class","incident")
	.attr("transform", function(d) {return "translate(" + projection([d.Long,d.Lat]) + ")";})
	.on("mouseover", function(d){
		d3.select("h2").text(d.CityState);
		d3.select(this).attr("class","incident hover");
		})
	.on("mouseout", function(d){
		d3.select("h2").text("");
		d3.select(this).attr("class","incident");
		});

	d3.select("#timeslide")
		.on("input", function(){
			update(+this.value); 
		});

	//updates the value of the slider
	function update(value)
	{
		//returns element object representing the elemtn whose id matches the string, sets contents to array
		document.getElementById("range").innerHTML=years[value];
		inputValue = years[value];
		d3.selectAll(".incident").attr("fill", dateMatch);
		
	}
	function dateMatch(data, value) {
    if (inputValue == data.Year) {
        this.parentElement.appendChild(this);
        return "red";
    } else {
        return "#999";
    };
}
function initialDate(d,i){
    var d = new Date(d.Year);
    var m = years[d.getFullYear()];
    if (m == "1990") {
        this.parentElement.appendChild(this);
        return "red";
    } else {
        return "#999";
    };
}

};