var speed = 3;
var screenWidth;
var screenHeight;

var ctx;

var personImg = new Image();
var houseImg = new Image();

function GameObject()
{
	this.x = 0;
	this.y = 0;
	this.image = null;
}


//Subclass game object for person
function Person() {};
Person.prototype = new GameObject();

var person = new Person();

//Subclass game object for house
function House() {};
House.prototype = new GameObject();

var house = new House();

//Wait for window to be ready to start
$(window).ready(function() {
	init();
});

function init() {
	loadImages();
	initSettings();
	startLevel();
}

function startLevel() {
	gameLoop();
	
}

//Place the images and such
function initSettings() {
	ctx = document.getElementById('myDrawing').getContext('2d');
	
	context = ctx;
	context.strokeStyle = "#000000";
	context.fillStyle = "#FFFF00";
	context.beginPath();
	context.arc(100,100,50,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	houseImg.onload = function() { ctx.drawImage(house.image, house.x, house.y);};
	//Calulate screen height and width
	screenWidth = parseInt($("#canvas").attr("width"));
	screenHeight = parseInt($("#canvas").attr("height"));
	
	//center mushroom on the horizontal axis
	house.x = 20;
	house.y = 20;
	
}
//Load images here
function loadImages() {
	houseImg.src = "imgres.jpg";
	personImg.src = "hum31.gif";
	
	house.image = houseImg;
	person.image = personImg;
}

function drawHouse() {
	ctx.drawImage(house.image, house.x, house.y);
}

function gameLoop() {
	ctx.clearRect(0, 0, screenWidth, screenHeight);
 	ctx.drawImage(person.image, house.x, house.y);
 	ctx.save();
}