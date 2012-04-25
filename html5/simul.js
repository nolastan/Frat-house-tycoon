window.globals = {};
paper.install(window);
var house, personRect, personHeight, repClicks = [];

var hitOptions = {
    segments: false,
    stroke: false,
    fill: true,
    tolerance: 10,
	bounds: true
};

var talkHitOptions = {
    bounds: true,
    tolerance: 35
};
	
var cashBox, repPlusSym;
var admissionCost = 5;

$(function() {

	var canvas = document.getElementById('canvas');
	paper.setup(canvas);
	//Draws house
/* 	audioContext = new webkitAudioContext(); */

	var tr = new Point(sg.width, 0);
	var bl = new Point(0, sg.height - 100);
	house = new Path.Rectangle(tr, bl);
	house.fillColor = 'yellow';
	//Create bounds for person
	personHeight = sg.height / 10;
	var size = new Size(personHeight, personHeight);
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
				goers.push(create_goer(new Point(sg.width, sg.height-50)));
				game.sim.goersCount--;
			}
			for (var i = 0; i < goers.length; i++) {
				goers[i].step();
				if (!goers[i].alive) {
					goers.splice(i, 1);
				}
			}
			
			for (var i = 0; i < organizers.length; i++) {
				organizers[i].step();
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
		
		for (var i = 0; i < repClicks.length; i++) {
			repClicks[i].remove();
		}
		game.sim.goersCount = 0;
		goers = [];
		repClicks = [];
		organizers = [];
		
	}


	var tool = new Tool();
	cashBox = create_cash_box();
	
	
	tool.onMouseDown = function(event) {
		var hitResult = project.hitTest(event.point, hitOptions);
		if (hitResult && hitResult.item.hasOwnProperty("clicked")) {
			hitResult.item.clicked(event.point);
			
		}else if (clickedMember) {
			console.log(clickedMember);
			clickedMember.setDestVector(event.point);
		}
	};
	
	// tool.onMouseDrag = function(event) {
		// if (clickedMember && clickedMember.dragging) {
			// clickedMember.position = event.point;
		// }
	// };
	
	
	// tool.onMouseUp = function(event) {
	
		// if (clickedMember) {
			// clickedMember.tryTalk();
			// clickedMember.dragging = false;
		// }
		
		
	// };
	/*==== Rep Plus ====*/
	var repImage = new Raster('rep-plus');
	repImage.fitBounds({width:5*game.UNIT, height:game.UNIT*5});
	repPlusSym = new Symbol(repImage);
	
	
	
	/*
================ MEMBER SPRITE ============
*/
var create_organizer = (function () {

	var posCount = 0;
	var speed = 2;
	var startingPositions = [
		house.bounds.bottomCenter.add(new Point(personHeight*1.5, personHeight*.5)), new Point(300, 300)
	];

	return function(member) {
		var position = new Point(0, 0);
		var shape = create_person(position, 'organizer');
		var moving = false;
		var destVect, curDest, path;
		
		shape.selected = false;
		if (posCount < startingPositions.length) {
			shape.position = startingPositions[posCount];
			posCount++;
			
		} else {
			shape.position = shape.randomTarget(house);
		}
		
		
		shape.type = "member";
		shape.member = member;
		shape.clicked = function(point) {
			if (typeof clickedMember !== 'undefined') {
				clickedMember.selected = false;
			}
			clickedMember = shape;
			console.log(shape.member.id);
			shape.selected = true;
			shape.dragging = true;
			drawFaceCard(member, "#simulation .members");
			shape.setDestVector(point);
			moving = true;
			
		}
		
		shape.setDestVector = function(point) {
			moving = true;
			curDest = point;
			destVect = curDest.subtract(shape.position);
			destVect = destVect.normalize().multiply(speed);
		}
		
		shape.step = function() {
			if (moving) {
				shape.position = shape.position.add(destVect);
				if (shape.selected) {
					//draw path to dest
				}
				
				
				if (shape.position.isClose(curDest, 5)) {
					shape.tryTalk();
					moving = false;
				}
			}
		}
		
		return shape;
		
	}

})();

	
});


var create_cash_box = function() {
	var that = {};
	
	var maxHeight = personHeight;
	var maxWidth = personHeight/2;
	var maxCapacity = 30;
	var deposited = 0;
	
	var tl = house.bounds.bottomCenter.add({x:-20, y:10});
	box = new Path.Rectangle(tl, {width:maxWidth, height:maxHeight});
	box.fillColor = 'black';
	
	that.box = box;
	
	box.clicked = that.collectMoney;
	var cashTl = tl.add({x:0, y:box.bounds.height})
	//moneyLevel = new Path.Rectangle(cashTl, {width:maxWidth, height:0});
	
	function calc_cash_tl() {
	    var yChange = maxHeight - maxHeight*(deposited/maxCapacity);
	    
	    var newTop = tl.add({x:0, y:yChange});
	    return newTop;
	    
	}
	
	moneyLevel = box.clone()
	moneyLevel.fillColor = 'green';
	moneyLevel.scale(1, deposited/maxCapacity);
	that.addMoney = function(increment) {
	    increment = increment || 10;
	    if (deposited + increment <= maxCapacity) {
	        deposited += 10;
	        update();
	    } else {
	        moneyLevel.fillColor = 'red';
	    }
		return that;
	}
	
	that.collectMoney = function() {
	    game.frat.cash += deposited;
	    deposited = 0;
	    update();
	    updateStatsBar();
	    return that;
	}
	
	var update = function() {
		moneyLevel.remove();
		moneyLevel = new Path.Rectangle(calc_cash_tl(), box.bounds.bottomRight);
		moneyLevel.fillColor = 'green';
		moneyLevel.clicked = that.collectMoney;
	}
	
	return that;
}
	

	
var create_goer = function(start) {

	var sex = (Math.random() > 0.5) ? 'male' : 'female'
	var shape = create_person(start, sex);

	var destVect, inHouse, age, minDist, curDest, speed, repCount, repDropProb, 
		stayDuration, enterTime;
	minDist = 5;
	repCount = 3;
	repDropProb = .20;
	stayDuration = Math.floor(600 + rnd_snd()*150);
	age = 0;
	speed = 2;
	shape.alive = true;
	shape.state = 'born';
	
	//This is arbitrary and should depend on something
	var enterProb = 0.8;
	
	var entryPath = [ start, new Point(house.bounds.bottomCenter.x, shape.position.y),
				house.bounds.bottomCenter];

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
	var pauseCount = 0;
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
					shape.state = "dispersing";
					curDest = this.randomTarget(house);
					setDestVector(curDest);
					cashBox.addMoney(admissionCost);
				}
				break;
			case 'dispersing':
			    //Moves the people around so they don't get stuck in the entrance
			    speed = 1;
			    if (nearTarget()) {
			        shape.state = 'inside';
			        curDest = this.randomTarget(house);
					setDestVector(curDest);
			    }
			    shape.position = shape.position.add(destVect);
			    break;
			case 'inside':
				speed = 1;
				if (nearTarget()) {
					if (pauseCount < 20) {
						pauseCount++;
						if (Math.random() < talkProb) {
							shape.tryTalk();
						}
					} else {
						pauseCount = 0;
						curDest = this.randomTarget(house);
						setDestVector(curDest);
					}
				} else {
					shape.position = shape.position.add(destVect);
				}
				
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
		var hitResult = project.hitTest(shape.position, talkHitOptions);
		if (hitResult && hitResult.item && hitResult.item != shape && (hitResult.item.state == "inside" || hitResult.item.type == "member")) {
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

	//var shape = new Path.Circle(position, game.UNIT);
	//shape.fillColor = "blue";
	
	var shape = repPlusSym.place(position);
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
			shape.opacity = shape.opacity*0.6;
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
