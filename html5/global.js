var game = {};
var sg = {}; //Simulation Graphics
function updateScreenSize(){
	sg.scale = Math.min($(window).width()/sg.scale_x, ($(window).height()-90)/sg.scale_y);
	sg.width = sg.scale_x * sg.scale;
	sg.height = sg.scale_y * sg.scale;
	game.UNIT = Math.round(sg.scale / 100);
	$("#canvas, #background").attr('width', sg.width);
	$("#canvas, #background").attr('height', sg.height);
}

$(document).ready(function(){


	/** Initialize Simulation Graphics **/
	sg.canvas = document.getElementById("canvas");  
    sg.ctx = sg.canvas.getContext("2d");
    sg.bg = document.getElementById("background").getContext("2d");
	
    // Constants:
    sg.scale_x = 3;
    sg.scale_y = 2;
    sg.fps = 30;
  	updateScreenSize();

	/** Initialize Game Objects **/
	game.frat = create_frat();
	game.house = new House();
	game.sidewalk = new Sidewalk();
	game.sidewalk.update(); // @TODO: How to call this in constructor??
<<<<<<< HEAD
	game.frat.bids = 0;
	
=======
	game.sim = {};
	game.sim.stopped = true;
>>>>>>> paper
	game.turnNum = 1;
	//How often you get to extend bids
	game.bidFrequency = 5;
	
	for (var i = 0; i < 10; i++) {	
		game.frat.addMember(create_member());
	}
	
	/** define functions **/
    game.board = new Board(game.frat);
	game.turns = [create_turn(mardiGrasInfo), 
	              create_turn(gloCrackDownInfo),
	              create_turn(finalsWeekInfo),
	              create_turn(superBowlInfo),
	              create_turn(coldInfo),
	              create_turn(firstDayOfSpringInfo),
	              create_turn(halloweenInfo),
	              create_turn(forthOfJulyInfo),
	              create_turn(parentWeekendInfo),
	              create_turn(midtermsWeekInfo),
	              create_turn(proStudentWeekInfo),
	              create_turn(stPatricksDay)
	              ];
	              
	game.turns.rushTurn = create_turn(rushWeekendInfo);
	game.turns.turnNum = 1;
	
	game.turns.getNext = function () {
	    
	    if (game.turns.turnNum % game.bidFrequency == 0) {
	        return this.rushTurn;
	    }
		var nextTurn = this.pop();
		if (this.length ==0) {
			this.push(create_turn());
		}
		this.turnNum++;
		return nextTurn;
	}

	
	/** elements beyond the canvas **/
	$(window).resize(function(){
		updateScreenSize();
	});

  
});

// to get the length of assoc. array
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
