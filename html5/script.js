
// Variable to handle game parameters
var speed = 3;
var screenWidth;
var screenHeight;
var ctx;

// Create images
var personImg = new Image();
var houseImg = new Image();

// Create sounds
  // @TODO

//Wait for window to be ready to start
$(window).ready(function() {
	init();
	$('button#sim').click(function(){
	  runSim(10);
	})
});

function init() {
	loadImages();
	initSettings();
}

function prepareSim(){
  
}

function runSim(rep){
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  drawHouse();
 	for(i = 0; i < rep; i++){
   	ctx.drawImage(person.image, house.x+i*40, house.y, 50, 70); 
 	}
}

function GameObject()
{
	this.x = 0;
	this.y = 0;
	this.image = null;
}


//Subclass game object for person
function Person() {};
Person.prototype = new GameObject();
var person = new House();

//Subclass game object for house
function House() {};
House.prototype = new GameObject();

var house = new House();

//Place the images and such
function initSettings() {
	ctx = document.getElementById('canvas').getContext('2d');

	//Calulate screen height and width
	screenWidth = parseInt($("#canvas").attr("width"));
	screenHeight = parseInt($("#canvas").attr("height"));
	
}
//Load images here
function loadImages() {
	houseImg.src = "imgres.jpg";
	personImg.src = "hum31.gif";
	
	house.image = houseImg;
	person.image = personImg;
}

function drawHouse() {
  console.log($("#canvas").attr("width"));
	ctx.drawImage(house.image, screenWidth/4, 0, screenWidth/2, screenHeight/2);
}
