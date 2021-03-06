window.globals = {};
paper.install(window);
var house, personRect, personHeight, frontLawn, shirtBox, table, repClicks = [];
var goers = [];
var hitOptions;

var sim = {};
var tableShirts;
var talkHitOptions = {
    bounds: true,
    tolerance: 35
};
	
var repPlusSym;
sim.admissionCost = 5;
var fastSpeed, slowSpeed;
$(function() {

	var canvas = document.getElementById('canvas');
	paper.setup(canvas);
	//Draws house
/* 	audioContext = new webkitAudioContext(); */

	var tr = new Point(sg.width -100, 0);
	var bl = new Point(0, sg.height - 200);
	house = new Path.Rectangle(tr, bl);
	house.fillColor = 'yellow';
	//Create bounds for person
	personHeight = sg.height / 10;
	
	//Add grass
	tr.x = sg.width;
	bl.y = sg.height;
	var lawnRect = new Rectangle(tr, bl);
	var grass = new Raster("grass");
	grass.fitBounds(lawnRect, true);
	
	
	frontLawn = new Path.Rectangle(house.bounds.bottomRight, {x:0, y:sg.height});
	frontLawn.fillColor = 'green';
	frontLawn.visible = false;
	
	var wood = new Raster("wood");
	wood.fitBounds(house.bounds);
	
	var woodSym = new Symbol(wood);
	var wd = woodSym.place(house.position);
	var delta = wd.position.subtract(house.bounds.leftCenter).multiply(-1).add({x:wd.bounds.width/2, y:0});
	wd.translate(delta);
	
	var woodNeeded = wd.bounds.width/house.bounds.width;
	var startPos = wd.position.add({x:wd.bounds.width, y:0});
	for (var i = 0; i < woodNeeded+2; i++) {
	    woodSym.place(startPos);
	    startPos = startPos.add({x:wd.bounds.width, y:0});
	}
	
	
	
	//var woodSym = new Symbol(wood);
	//var wd = woodSym.place(wood.position);
	//wd.position.add({x:wd.bounds.width, y:0});

	var size = new Size(personHeight, personHeight);
	personRect = new Path.Rectangle(tr, size);
	
	hitOptions = {
    segments: false,
    stroke: false,
    fill: true,
    tolerance: personHeight,
	bounds: true
};
	
	//Create person sprite
	
	//personImage.visible = false;
	
	var clickedMember;
	var organizers = [];
	var philOrgs = [];
	var philgoers = [];
	tableShirts = [];

	game.sim.partyGoersCount = 0;
	
	fastSpeed = Math.round(personHeight*0.08);
	slowSpeed = Math.round(personHeight*0.05);
	
	//================================Party Phase Step===============================
	
	
	game.sim.partyStep = function() {

		if (!game.sim.stopped) { 
			if (Math.random() > 0.95 && game.sim.partyGoersCount > 0 && goers.length < 15) {
				goers.push(create_party_goer(new Point(sg.width, sg.height-50)));
				game.sim.partyGoersCount--;
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
			if (goers.length  == 0 && game.sim.partyGoersCount <= 0) {
				game.sim.phase = "over";
			}
		}
	}
	
	//=================End the simulation
	
	game.sim.end = function() {

		if (game.sim.phase == "phil") {
		    game.sim.cleanUpPhil();
		    game.sim.setupParty();
		    game.sim.phase = "party";
		} else {
		    game.sim.stopped = true;
		    game.sim.cleanUpParty();
		    view.onFrame = false;
		    game.sim.cleanUpParty();
		    results();
		}
	}
	
	//==================Start the simulation
	game.sim.start = function() {
		

		game.sim.phase = "phil";
		game.sim.setupPhil();
		game.sim.stopped = false;
		view.onFrame = frameFunction;
	}
	
	//=====================Clean up what is left from a sim
	game.sim.cleanUp = function() {

		
		for (var i = 0; i < repClicks.length; i++) {
			repClicks[i].remove();
		}
		game.sim.partyGoersCount = 0;
		game.sim.philGoersCount = 0;
		philgoers = [];

		
	}
	
	game.sim.cleanUpPhil = function() {
		for (var i= 0; i < philgoers.length; i++) {
			philgoers[i].die();
		}
		for (var i = 0; i < philOrgs.length; i++) {
			philOrgs[i].remove();
		}
		table.visible = false;
		shirtBox.visible = false;
		for (var i = 0; i < tableShirts.length; i++) {
		    tableShirts[i].remove();
		}
	}
	
	game.sim.cleanUpParty = function() {
		for (var i= 0; i < goers.length; i++) {
			goers[i].die();
		}
		for (var i = 0; i < organizers.length; i++) {
			organizers[i].remove();
		}
		
		goers = [];
		repClicks = [];
		organizers = [];
		sim.cashBox.clean();
	}
	
	game.sim.setupPhil = function() {
	    table.visible = true;
	    shirtBox.visible = true;
		pOrgs = game.frat.getPlay().cs;
		for (var i = 0; i < pOrgs.length; i++) {
			var curId = pOrgs[i];
			var newOrg = create_organizer(game.frat.getMemberById(curId));
			philOrgs.push(newOrg);
		}
		
		shirtBox.fillTable();
	}
	

	
	game.sim.setupParty = function() {
		partyOrgs = game.frat.getPlay().party;
		for (var i = 0; i < partyOrgs.length; i++) {
			var curId = partyOrgs[i];
			var newOrg = create_organizer(game.frat.getMemberById(curId));
			organizers.push(newOrg);
		}
		sim.cashBox = create_cash_box();
	}
	
	//=========================Philanthropy Step
	
	game.sim.philStep = (function() {
		var philgoer;
		var philDur = 0, philEnd = 1000;
		var tr = new Point(sg.width/3, 0);
		var bl = new Point(0, sg.height/15);
		table = new Path.Rectangle(tr, bl);
		table.fillColor = 'brown';
		table.position = {x: house.bounds.width/3, y: house.bounds.height/2};
		table.visible = false;
		
		var shirtPoint = table.bounds.topLeft.subtract({x:table.bounds.height*1.1, y:0});
		shirtBox = new Path.Rectangle(shirtPoint, {width:table.bounds.height, height:table.bounds.height});
		shirtBox.fillColor = 'black';
		
		return function() {
			if (!game.sim.stopped) {

				philDur++;
				if (Math.random() > 0.95 && game.sim.philGoersCount > 0 && philgoers.length < 15) {
    				philgoers.push(create_phil_goer(new Point(sg.width, sg.height-50)));
    				game.sim.philGoersCount--;
    			}
				
				for (var k =0; k < philOrgs.length; k++) {
					philOrgs[k].step();
				}

				for (var k =0; k < philgoers.length; k++) {
				    if (philgoers[k].alive) {
				        philgoers[k].step();
				    } else {
				        philgoers.splice(k, 1);
				    }
				}
				
				for (var i = 0; i < repClicks.length; i++) {
    				repClicks[i].step();
    				if (!repClicks[i].alive) {
    					repClicks.splice(i, 1);
    				}
    			}
				
                if (philgoers.length <= 0 && game.sim.philGoersCount <= 0) {
                    

    				game.sim.cleanUpPhil();
    				game.sim.phase = "party";
    				game.sim.setupParty();
                }

			}
		}
	})();
	
	shirtBox.fillTable = function() {
	    if (tableShirts.length > 0) {
	        for (var i =0; i < tableShirts.length; i++) {
	            tableShirts[i].remove();
	            
	        }
	        tableShirts = [];
	    }
	    
		var x = table.bounds.topLeft.x + tshirt.bounds.width/2;
		var delta = new Point(tshirt.bounds.width*1.1, 0);
		var y = table.bounds.topLeft.y + tshirt.bounds.height/2;
		var placePoint = new Point(x, y);
		while (table.bounds.contains(placePoint.add(delta))) {
			var tshirtP = tshirtSym.place(placePoint);
			placePoint = placePoint.add(delta);
			tableShirts.push(tshirtP);
		}
	}
	//========================Fire correct step based on phase
	
	game.sim.phase = "phil";
	
	
	var frameFunction = function(event) {
		switch (game.sim.phase) {
			case "party":
				game.sim.partyStep();
				break;
			case "phil":
				game.sim.philStep();
				break;
				
			case "over":
			default:
				game.sim.end();
		}
	}
	
	


	var tool = new Tool();
	
	
	
	//=====================Mouse Clicks=======================
	
	tool.onMouseDown = function(event) {
	
		if (game.sim.phase == "party") {
			for (var i = 0; i < organizers.length; i++) {
				var curOrg = organizers[i];
				
				if (curOrg.bounds.contains(event.point)) {
					curOrg.clicked(event.point);
					return;
				}
			}
		} else {
			for (var i = 0; i < philOrgs.length; i++) {
				var curOrg = philOrgs[i];
				
				if (curOrg.bounds.contains(event.point)) {
					curOrg.clicked(event.point);
					return;
				}
			}
		
		}
		

		if (clickedMember) {
			clickedMember.directTo(event.point);
		}
		
	};

	/*==== Rep Plus ====*/
	var repImage = new Raster('rep-plus');
	repImage.fitBounds({width:8*game.UNIT, height:game.UNIT*8});
	repPlusSym = new Symbol(repImage);
	
	//Shirt symbol
	
	var tshirt = new Raster("tshirt");
	tshirt.fitBounds(table.bounds);
	//tshirt.visible = false;
	var tshirtSym = new Symbol(tshirt);
	
	
	/*
================ MEMBER SPRITE ============
*/
var create_organizer = (function () {

	var posCount = 0;
	var speed = fastSpeed;
	var startingPositions = [
		house.bounds.bottomCenter.add(new Point(personHeight*1.5, personHeight*.5)), new Point(300, 300)
	];

	return function(member) {
		var position = new Point(0, 0);
		var shape = create_person(position, 'organizer');
		var moving = false;
		var destVect, curDest, path;
		
		var pauseCount = 0, pauseLength = 15;
		
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
			speed = fastSpeed;
			//shape.setDestVector(point);
			//shape.state = "moving";
			
		}
		
		shape.directTo = function(point) {
			speed = fastSpeed;
			shape.setDestVector(point);
		}
		
		shape.setDestVector = function(point) {
			shape.state = "moving";
			curDest = point;
			destVect = curDest.subtract(shape.position);
			destVect = destVect.normalize().multiply(speed);
		}
		
		shape.step = function() {
		
			switch(shape.state) {
			
			case "moving":
				shape.position = shape.position.add(destVect);
				if (shape.position.isClose(curDest, 5)) {
					curDest = false;
					//shape.tryTalk();
					shape.state = "pausing";
				}
				break;
			case "pausing":
				if (pauseCount < pauseLength) {
					pauseCount++;
					if (game.sim.phase == "party"){
					    shape.tryTalk(goers);
					} else {
					    shape.tryTalk(philgoers);
					}
					if (sim.cashBox && shape.bounds.intersects(sim.cashBox.box.bounds)) {
						sim.cashBox.collectMoney();
					}
					if (game.sim.phase == "phil" && shirtBox && shape.bounds.intersects(shirtBox.bounds)) {
					    console.log("Shirts!");
					    shirtBox.fillTable();
					}
				} else {
					pauseCount = 0;
					speed = slowSpeed/2;
					shape.setDestVector(shape.randomTarget(house));
				}
				break;
			case "talking":
				if (!shape.talk()) {
					shape.state = "pausing";
				}
				break;
		}
	}
	
	shape.state = "pausing";
		
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
	
    that.clean = function() {
        that.collectMoney();
        that.box.remove();
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
	var sex = (Math.random() > 0.5) ? 'male' : 'female';
	var shape = create_person(start, sex);
  var minDist = 5;
	shape.speed = fastSpeed;
	
	
	var setDestVector = function(destination) {
		shape.destVect = destination.subtract(shape.position);
		shape.destVect = shape.destVect.normalize().multiply(shape.speed);
	}
	shape.setDestVector = setDestVector;
	
	function moveAlongPath(path) {
	
		if (!shape.curDest) {
			shape.curDest = path.shift();
			setDestVector(shape.curDest);
		}
		
		if (shape.nearTarget()) {
			if (path.length > 0) {
				shape.curDest = path.shift();
				setDestVector(shape.curDest);
			} else {
				return false;
			}
		}
		shape.moveToTarget();
		return true;
	}

	shape.moveAlongPath = moveAlongPath;

	shape.nearTarget = function() {
		return shape.position.isClose(shape.curDest, minDist);
	}
	
	shape.moveToTarget = function() {
		shape.position = shape.position.add(shape.destVect);
	
	}
	
	return shape;
}


//====== Goer class for Phil

var create_phil_goer = function(start) {
    var age = 0;
    var stayDur = Math.floor(600 + rnd_snd()*150);
	var shape = create_goer(start);

	var entryPath = [new Point(house.bounds.bottomCenter.x, shape.position.y),
				house.bounds.bottomCenter];
	
	var tablePath = [ table.bounds.bottomLeft, table.bounds.bottomRight];
	
	var exitPath = [house.bounds.bottomCenter, 
			new Point(house.bounds.bottomCenter.x, shape.position.y),
			new Point(house.bounds.left, start.y)];
		

	shape.state = "wandering";
	
	shape.step = function() {
		age++;
		switch(shape.state) {
		    case "wandering":
		        if (!shape.curDest || shape.position.isClose(shape.curDest, 5)) {
		            shape.curDest = shape.randomTarget(frontLawn);
		            shape.setDestVector(shape.curDest);
		        }
		        
		        shape.moveToTarget();
		        
		        if (age > stayDur) {
		            shape.state = "exiting";
		        }
		        break;
			case "entering":
				
				if (!shape.moveAlongPath(entryPath)) {
					shape.state = "table";
				}
				
				break;
			case "table":
				if (!shape.moveAlongPath(tablePath)) {
				    
				    if (tableShirts.length > 0) {
				        var boughtShirt = tableShirts.pop();
				        boughtShirt.remove();
				        generateRep();
				    }
					
					shape.state = "exiting";
				}
				break;
			case "talking":
				if (!shape.talk()) {
				    shape.notTalking = true;
					shape.state = "entering";
				}
				break;
			case "exiting":
			default:
				if (!shape.moveAlongPath(exitPath)) {
					shape.die();
				}
				break;
		
		}
	}
	
	function generateRep() {
		var pos = shape.bounds.center.subtract({x:0, y:personHeight/1.5});
		repClicks.push(createRep(pos));
	}
	
	return shape;
}

//============================Goer class for Party Phase
var create_party_goer = function(start) {


	var shape = create_goer(start);

	var inHouse, age, repCount, repDropProb, 
		stayDuration, enterTime;

	repCount = 3;
	repDropProb = .10;
	stayDuration = Math.floor(600 + rnd_snd()*150);
	age = 0;
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

	var setDestVector = shape.setDestVector;
	

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
					shape.moveAlongPath(entryPath);
				} else {
					shape.state = 'passing';
					shape.moveAlongPath(passingPath);
				}
				//shape.position += destVect;
				break;
				
			case 'entering':
				if (!shape.moveAlongPath(entryPath)) {
					enterTime = age;
					shape.state = "dispersing";
					shape.curDest = this.randomTarget(house);
					setDestVector(shape.curDest);
					sim.cashBox.addMoney(sim.admissionCost);
				}
				break;
			case 'dispersing':
			    //Moves the people around so they don't get stuck in the entrance
			    shape.speed = slowSpeed;
			    if (shape.nearTarget()) {
			        shape.state = 'inside';
			        curDest = this.randomTarget(house);
					setDestVector(shape.curDest);
			    }
			    shape.moveToTarget();
			    break;
			case 'inside':
				shape.speed = slowSpeed;
				if (shape.nearTarget()) {
					if (pauseCount < 20) {
						pauseCount++;
						if (Math.random() < talkProb) {
							shape.tryTalk(goers);
						}
					} else {
						pauseCount = 0;
						shape.curDest = this.randomTarget(house);
						setDestVector(shape.curDest);
					}
				} else {
					shape.moveToTarget();
				}
				
				if (age - enterTime > stayDuration) {
					curDest = 0;
					shape.moveAlongPath(exitPath)
					shape.state = 'leaving';
				}
				break;
			case 'leaving':
				if (!shape.moveAlongPath(exitPath)) {
					shape.die();
				}
				break;
			
			case 'passing':
				if (!shape.moveAlongPath(passingPath)) {
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
						shape.curDest = this.randomTarget(house);
						setDestVector(shape.curDest);
					}
				}
				break;
		}
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

						console.log("new person");
	imageName = imageName || 'male';
	var shape = new Raster(imageName);
	shape.fitBounds(personRect.bounds);
	shape.position = start;
	shape.visible = true;
	shape.alive = true;
	shape.type = "person";
	
	shape.die = function() {
		shape.alive = false;
		shape.remove();
		console.log("DEAD!!");
	}

	function randomTarget(rect) {
	    
	    if (typeof rect.bounds !== undefined) {
	        rect = rect.bounds;
	    }
		var temp = rect.topLeft.add(shape.bounds.size.divide(2));
		temp = temp.add(Point.random().multiply(rect.size.subtract(shape.bounds.size)));

		return temp;
	}
	
	shape.randomTarget = randomTarget;
	
	function tryTalk(talkGroup) {
	    
	    
		for (var i = 0; i < talkGroup.length; i++) {
			var curGoer = talkGroup[i];
			if (curGoer !== shape && shape.bounds.intersects(curGoer.bounds) && !shape.notTalking) {
				shape.state = "talking";
				shape.talkTarget = curGoer;
				curGoer.state = "talking";
				curGoer.talkTarget = shape;
				return;
			}
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
	duration = 40;
	game.frat.rep += 1;
	updateStatsBar();

	shape.step = function() {
		age++;
		
		if (age % 5 == 0) {
			//shape.opacity = shape.opacity*0.6;
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
