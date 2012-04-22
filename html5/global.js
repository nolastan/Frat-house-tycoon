var game = {};
var sg = {}; //Simulation Graphics
function updateScreenSize(){
	sg.scale = Math.min($(window).width()/sg.scale_x, ($(window).height()-90)/sg.scale_y);
	sg.width = sg.scale_x * sg.scale;
	sg.height = sg.scale_y * sg.scale;
	game.UNIT = Math.round(sg.scale / 100);
	$("#canvas, #background").attr('width', sg.width);
	$("#canvas, #background").attr('height', sg.height);
	$("ul.quadrants li.quadrant, ul.quadrants .members, #menu .logo").css("height", (sg.height-37)/2);
	$("ul.quadrants, .nextEvent").css("width", $(window).width()-310);
  	$("ul.quadrants li object.quadrant_icon").css("max-height", sg.height/3);
  	$("ul.quadrants li object.quadrant_icon").css("max-width", $(window).width()/3);
  	$("#planScreen ul.members.pool").css("height", sg.height-20);
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
	game.quest = {};
	game.isQuest = false;
	game.house = new House();
	game.sidewalk = new Sidewalk();
	game.sidewalk.update(); // @TODO: How to call this in constructor??	

	game.sim = {};
	game.sim.stopped = true;
	game.turnNum = 1;
	//How often you get to extend bids
	game.bidFrequency = 5;	
	
	/** define functions **/
    game.turns = Array();
    for(key in events){
    	game.turns[key] = create_turn(events[key]);
    }
	              
	game.turns.rushTurn = create_turn(rushWeekendInfo);
	game.turns.turnNum = 1;
	
	game.turns.getNext = function () {	    
	    if (game.turns.turnNum % game.bidFrequency == 0) {
	        this.turnNum++;
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
