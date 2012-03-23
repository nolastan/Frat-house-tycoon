function drawPlanningScreen(){
	game.board.drawBoard().update();
	$("#simulation").hide();
	$("#results").hide()
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	
 
}

$(document).ready(function(){
	$("#sim").click(function(){simulate()});
});