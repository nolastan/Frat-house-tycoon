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

	
	/** call functions **/
	game.board.drawBoard().update();
	$("#simulation").hide();
	$("#results").hide()
	/** elements beyond the canvas **/
	$(window).resize(function(){
		updateScreenSize();
	});
	
	$("#normal").addClass('disabled');
	$("#fast").addClass('disabled');
	$("#skip").addClass('disabled');
	
	// Action call
  $("#sim").click(function(){
    game.board.update_play();
		var turn = game.turns.getNext();
		simulate(game.frat.getPlayValues(), turn.run(game.frat));
		document.getElementById("currentTurn").innerHTML = turn.title + " results";

    $(this).addClass("disabled");
		$("#fast").removeClass('disabled');
		$("#skip").removeClass('disabled');
  });
	
	$("#normal").click(function(){
    game.sim.gameTime.speed = 1;
    $(this).addClass("disabled");
    $("#fast").removeClass("disabled");
  });

  $("#fast").click(function(){
    game.sim.gameTime.speed = 3;
    $(this).addClass("disabled");
    $("#normal").removeClass("disabled");
  });

	
	$("#skip").click(function(){
  	console.log("here");
   	game.sim.end();
  });
  
  $("#showBidMeeting").click(function(){
	bidScreen.show();
  	$("#results").hide();
  document.getElementById('sim').className = '';

  });

  
});