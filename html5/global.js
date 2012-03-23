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
	
	for (var i = 0; i < 10; i++) {	
		game.frat.addMember(create_member());
	}
	
	/* TEMPORARY */
	game.checkstats = function(member) {
		$("#memname").html(member.name);
		$("#memparty").html(member.skills.party);
		$("#memcs").html(member.skills.cs);
		$("#memrush").html(member.skills.rush);
		$("#memstudy").html(member.skills.study);
	}
	/** define functions **/
    game.board = new Board();
	game.turns = [new Turn(mardiGrasInfo), 
	              new Turn(gloCrackDownInfo),
	              new Turn(finalsWeekInfo)];
	game.turns.getNext = function () {
		var nextTurn = this.pop();
		if (this.length ==0) {
			this.push(new Turn());
		}
		return nextTurn;
	}

	
	/** elements beyond the canvas **/
	$(window).resize(function(){
		updateScreenSize();
	});

  
});