window.globals = {};
paper.install(window);
var house, personRect, personHeight, repClicks = [];

	var hitOptions = {
	    segments: false,
	    stroke: false,
	    fill: true,
	    tolerance: 5,
		bounds: true
	};
$(function() {

	var canvas = document.getElementById('canvas');
	paper.setup(canvas);
	//Draws house
	audioContext = new webkitAudioContext();

var tr = new Point(0, 0);
	var bl = new Point(300, 300);
	house = new Path.Rectangle(tr, bl);
	house.fillColor = 'yellow';
	cling = new Audio("sounds/cling_1.wav");
	//Create bounds for person
	personHeight = game.UNIT*10;
	var size = new Size(game.UNIT*10, game.UNIT*10);
	personRect = new Path.Rectangle(tr, size);
	
	//Create person sprite
	
	//personImage.visible = false;
	

	var clickedMember;
	var organizers = [];
	var goers = [];
	game.sim.goersCount = 0;
	
	
	view.onFrame = function(event) {
		if (!game.sim.stopped) { 
			if (Math.random() > 0.95 && game.sim.goersCount > 0) {
				goers.push(create_goer(new Point(500, 500)));
				game.sim.goersCount--;
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
			if (goers.length  == 0 && game.sim.goersCount <= 0) {
				game.sim.stopped = true;
				game.sim.cleanUp();
				results();
			}
		}
	}
	
	game.sim.start = function() {
		
		partyOrgs = game.frat.getPlay().party;
		console.log(partyOrgs);
		for (var i = 0; i < partyOrgs.length; i++) {
			var curId = partyOrgs[i];
			var newOrg = create_organizer(game.frat.getMemberById(curId));
			organizers.push(newOrg);
		}
		
		game.sim.stopped = false;
	}
	
	game.sim.cleanUp = function() {
		for (var i= 0; i < goers.length; i++) {
			goers[i].die();
			
		}
		for (var i = 0; i < organizers.length; i++) {
			organizers[i].remove();
		}
		
		game.sim.goersCount = 0;
		goers = [];
		repClicks = [];
		organizers = [];
		
	}


	var tool = new Tool();

	tool.onMouseDown = function(event) {
		var hitResult = project.hitTest(event.point, hitOptions);
		if (hitResult && hitResult.item.hasOwnProperty("clicked")) {
			hitResult.item.clicked();
			
			if (hitResult.item.type != "member") {
				clickedMember = false;
			}
		}
	};
	
	tool.onMouseDrag = function(event) {
		if (clickedMember && clickedMember.dragging) {
			clickedMember.position = event.point;
		}
	};
	
	tool.onMouseUp = function(event) {
	
		if (clickedMember) {
			clickedMember.tryTalk();
		}
		clickedMember.dragging = false;
		
	};
	
	/*
================ MEMBER SPRITE ============
*/
var create_organizer = (function () {

	var posCount = 0;
	
	var startingPositions = [
		house.bounds.bottomCenter.add(new Point(personHeight*1.5, personHeight*.5)), new Point(300, 300)
	];

	return function(member) {
		var position = new Point(0, 0);
		var shape = create_person(position, 'organizer');
		
		shape.selected = false;
		if (posCount < startingPositions.length) {
			shape.position = startingPositions[posCount];
			posCount++;
			
		} else {
			shape.position = shape.randomTarget(house);
		}
		
		
		shape.type = "member";
		shape.member = member;
		shape.clicked = function() {
			if (typeof clickedMember !== 'undefined') {
				clickedMember.selected = false;
			}
			clickedMember = shape;
			console.log(shape.member.id);
			shape.selected = true;
			shape.dragging = true;
			drawFaceCard(member, "#simulation .members");
		}
		return shape;
		
	}

})();
});

	

	
var create_goer = function(start) {

	var sex = (Math.random() > 0.5) ? 'male' : 'female'
	var shape = create_person(start, sex);

	var destVect, inHouse, age, minDist, curDest, speed, repCount, repDropProb, 
		stayDuration, enterTime;
	minDist = 5;
	repCount = 3;
	repDropProb = .40;
	stayDuration = Math.floor(600 + rnd_snd()*150);
	age = 0;
	speed = 2;
	shape.alive = true;
	shape.state = 'born';
	
	//This is arbitrary and should depend on something
	var enterProb = 0.8;
	
	var entryPath = [ start, new Point(house.bounds.bottomCenter.x, shape.position.y),
				house.bounds.bottomCenter,
				shape.randomTarget(house)];

	var exitPath = [house.bounds.center, house.bounds.bottomCenter, 
				new Point(house.bounds.bottomCenter.x, shape.position.y),
				new Point(house.bounds.left, start.y)];
				
	var passingPath = [start,new Point(house.bounds.bottomCenter.x, shape.position.y), 
					new Point(house.bounds.left, shape.position.y)];

	var setDestVector = function(destination) {
		destVect = destination.subtract(shape.position);
		destVect = destVect.normalize().multiply(speed);
	}
	

	var talkProb = 0.7;
	var keepTalkProb = 0.8;
	var talkCount = 0;
	shape.step = function() {
		age++;
		switch (shape.state) {
			case 'born':
				if (Math.random() < enterProb) {
					shape.state = 'entering';
					moveAlongPath(entryPath);
				} else {
					shape.state = 'passing';
					moveAlongPath(passingPath);
				}
				//shape.position += destVect;
				break;
				
			case 'entering':
				if (!moveAlongPath(entryPath)) {
					enterTime = age;
					shape.state = "inside";
					speed = speed/3;
				}
				break;
				
			case 'inside':
				speed = 1;
				if (nearTarget()) {
					curDest = this.randomTarget(house);
					setDestVector(curDest);
				}
				if (Math.random() < talkProb) {
					shape.tryTalk();
				}
				shape.position = shape.position.add(destVect);
				if (age > enterTime + stayDuration) {
					curDest = 0;
					moveAlongPath(exitPath)
					shape.state = 'leaving';
				}
				break;
			case 'leaving':
				if (!moveAlongPath(exitPath)) {
					shape.die();
				}
				break;
			
			case 'passing':
				if (!moveAlongPath(passingPath)) {
					shape.die();
				}
				break;
				
			case 'talking':
				if (!shape.talk()) {
					talkCount++;
					if (shape.talkTarget.type == "member") {
						generateRep();	
					}
					
					var ktp = Math.pow(keepTalkProb, talkCount);
					if (Math.random() > ktp) {
						shape.state = "inside";
						talkCount = 0;
						curDest = this.randomTarget(house);
						setDestVector(curDest);
					}
				}
				break;
		}
	}
	
	function moveAlongPath(path) {
		if (!curDest) {
			curDest = path.shift();
			setDestVector(curDest);
		}
		
		if (nearTarget()) {
			if (path.length > 0) {
				curDest = path.shift();
				setDestVector(curDest);
			} else {
				return false;
			}
		}
		
		shape.position = shape.position.add(destVect);
		return true;
	}


	function nearTarget() {
		return shape.position.isClose(curDest, minDist);
	}

	function generateRep() {
		if (Math.random() > repDropProb && repCount > 0) {
			var pos = shape.bounds.center.subtract({x:0, y:personHeight/1.5});
			
			repClicks.push(createRep(pos));
			repCount--;
		}
	}
	return shape;
}

var create_person = function(start, imageName) {
	imageName = imageName || 'male';
	var shape = new Raster(imageName);
	shape.fitBounds(personRect.bounds);
	shape.position = start;
	shape.visible = true;
	
	shape.type = "person";
	
	shape.die = function() {
		shape.alive = false;
		shape.remove();
		console.log("DEAD!!");
	}

	function randomTarget(rect) {
		var temp = rect.bounds.topLeft.add(shape.bounds.size.divide(2));
		temp = temp.add(Point.random().multiply(rect.bounds.size.subtract(shape.bounds.size)));

		return temp;
	}
	
	shape.randomTarget = randomTarget;
	
	function tryTalk() {
		var hitResult = project.hitTest(shape.position, hitOptions);
		if (hitResult && hitResult.item && hitResult.item.state == "inside" || hitResult.item.type == "member") {
			hitResult.item.state = "talking";
			shape.state = "talking";
			shape.talkTarget = hitResult.item;
			hitResult.item.talkTarget = shape;
		}
	}
	
	shape.tryTalk = tryTalk;
	
	var talkFrame = 0;
	function talk() {
		if (talkFrame < 5) {
			shape.rotate(2);
		} else if (talkFrame < 15) {
			shape.rotate(-2);
		} else if (talkFrame < 20) {
			shape.rotate(2);
		} else {
			talkFrame = 0;
			return false;
		}
		talkFrame++;
		return true;
	}
	
	shape.talk = talk;
	
	return shape;
}

function createRep(position) {

	var shape = new Path.Circle(position, game.UNIT);
	shape.fillColor = "blue";
	shape.type = "rep";
	var frameCount, age, duration, alive;
	shape.alive = true;
	age = 0;
	duration = 200;
	game.frat.rep += 1;
	updateStatsBar();

	shape.step = function() {
		age++;
		if (age % 10 == 0) {
			shape.opacity = shape.opacity*0.5;
			shape.position = shape.position.add({x:0, y:-1});
		}
		
		if (age > duration || shape.opacity < 0.1) {
			shape.die();
		}
	}
	
	shape.die = function() {
		shape.alive = false;
		shape.remove();

	}

	return shape;
}

function rnd_snd() {
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}