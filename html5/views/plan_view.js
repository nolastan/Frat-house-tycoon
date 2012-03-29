function drawPlanningScreen(){
	game.board.DrawBoard();
	game.board.update();

	game.board.DrawPieces();
	game.nextTurn = game.turns.getNext();


	$("#bidScreen").hide();
	$("#planScreen").show();
	$("#simulation").hide();
	$("#results").hide()
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#run").show();
	$("#nextTurn").html(game.nextTurn.title);
  	$("#screens button").removeClass("active");
  	$("#screens .board button").addClass("active");
 
}

$(document).ready(function(){
	$("#run").click(function(){simulate()});
});