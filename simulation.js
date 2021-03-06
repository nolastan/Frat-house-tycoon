window.globals = {};

var tr = new Point(0, 0);
var bl = new Point(300, 300);
var rect = new Path.Rectangle(tr, bl);
var rectBounds = new Rectangle(tr, bl);
rect.fillColor = 'black';
var repClicks = [];
function createRep(position) {
	
	var shape = new Path.Circle(position, 10);
	shape.fillColor = "blue";
	shape.type = "rep";
	var frameCount, age, duration, alive;
	shape.alive = true;
	age = 0;
	duration = 200;
	
	shape.step = function() {
		age++;
		if (age > duration) {
			shape.alive = false;
			shape.remove();
		}
	}
	
	shape.bounce = function() {
		position.blink
	}
	
	return shape;
	
}
window.globals.createRep = createRep;


var create_goer = function(start) {
	var shape = new Path.Circle(start, 10);
	var destVect, inHouse, age, dur, minDist, curDest, speed, destNum, dests = [];
	destNum = 0;
	minDist = 5;
	shape.fillColor = 'green';
	var repCount = 3;
	repDropProb = .99;
	var stayDuration = 500;
	var enterTime;
	var state = "walking";
	
	var initialize = function() {
		dests = [ start, new Point(rect.bounds.bottomCenter.x, shape.position.y),
				rect.bounds.bottomCenter,
				rect.bounds.center];
		
		curDest = dests[0];
		speed = 3;
		setDestVector();
		inHouse = false;
		leaving = false;
		age = 0;
		dur = 2000;
		shape.alive = true;
	}
	
	var setDestVector = function() {
		destVect = curDest - shape.position;
		destVect = destVect.normalize()*speed;
		
	}
	
	
	shape.step = function() {
		shape.position += destVect;
		if (nearTarget()) {
			getNextDest();
		}
		age++;
		if (age > dur) {
			shape.die();
		}
		
		if (!leaving && inHouse && Math.random() > repDropProb && repCount > 0) {
			generateRep();
			repCount--;
		}
	}
	
	shape.die = function() {
		shape.alive = false;
		shape.remove();
	}
	
	function nearTarget() {
		return shape.position.getDistance(curDest) < minDist;
	}
	
	function generateRep() {
		repClicks.push(createRep(shape.position));
	}
	
	var getNextDest = function() {
		if (inHouse) {
			if (age < enterTime + stayDuration) {
				curDest = randomTarget(rect);
			} else {
				leaving = true;
				destNum--;
				if (destNum >= 0) {
					curDest = dests[destNum];
				} else {
					shape.die();
					return;
				}
			}
			
		} else {
		destNum++;
		enterTime = age;
			if (destNum < dests.length) {
				
				curDest = dests[destNum];
			} else {
				inHouse = true;
				speed = speed/3;
			}
		}
		setDestVector();
	}
	
	function randomTarget(rect) {
		return rect.bounds.topLeft + shape.bounds.size/2 + Point.random()*(rect.bounds.size -shape.bounds.size);
	}
	initialize();
	return shape;
}


var goers = [];
var goersCount = 20;
function onFrame(event) {
	if (!window.globals.stopped) { 
		if (Math.random() > 0.95 && goersCount > 0) {
			goers.push(create_goer(new Point(500, 500)));
			goersCount--;
		}
		for (var i = 0; i < goers.length; i++) {
			goers[i].step();
			if (!goers[i].alive) {
				goers.splice(i, 1);
			}
		}
	
		for (var i = 0; i < repClicks.length; i++) {
			repClicks[i].step();
			if (!repClicks[i].alive) {
				repClicks.splice(i, 1);
			}
		}
	}
}

function move(obj) {
	console.log("WOOO")
}

var hitOptions = {
    segments: false,
    stroke: false,
    fill: true,
    tolerance: 5
};

function onMouseDown(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	if (hitResult && hitResult.item.type == "rep") {
		hitResult.item.fillColor = 'red';
	}
}