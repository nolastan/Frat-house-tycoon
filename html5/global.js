var CANVAS_HEIGHT, CANVAS_WIDTH, canvas, ctx, SCALE;
var CANVAS_SCALE_X = 3;
var CANVAS_SCALE_Y = 2;
var game = {};
//variable for Simulation Graphics global variables
var sg = {};
function updateScreenSize(){
	SCALE = Math.min($(window).width()/CANVAS_SCALE_X, ($(window).height()-90)/CANVAS_SCALE_Y);
	CANVAS_WIDTH = CANVAS_SCALE_X * SCALE;
	CANVAS_HEIGHT = CANVAS_SCALE_Y * SCALE;
	UNIT = Math.round(SCALE / 100);
	console.log(SCALE);
	$("#canvas, #background").attr('width', CANVAS_WIDTH);
	$("#canvas, #background").attr('height', CANVAS_HEIGHT);
}

$(document).ready(function(){


	/** declare variables **/
	sg.canvas = document.getElementById("canvas");  
    sg.ctx = sg.canvas.getContext("2d");
    sg.bg = document.getElementById("background").getContext("2d");
  
	game.frat = create_frat();
	
	game.frat.addMember(create_member()).addMember(create_member());
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
	updateScreenSize();
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
		simulate(game.frat.get_play(), turn.run(game.frat));
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
  	if(game.sim.isRunning()){
    	game.sim.end();
  	}
  });
  
  $("#showBoard").click(function(){
  	$("#container").show();
  	$("#results").hide();
  document.getElementById('sim').className = '';

  });
  

  
});