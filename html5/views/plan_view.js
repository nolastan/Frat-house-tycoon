function drawPlanningScreen(){
	game.board.drawBoard().update();
	$("#bidScreen").hide();
	$("#container").show();
	$("#simulation").hide();
	$("#results").hide()
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#run").show();
 
}

$(document).ready(function(){
	$("#run").click(function(){simulate()});
});