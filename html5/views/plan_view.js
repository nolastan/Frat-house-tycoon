function drawPlanningScreen(){
	// Temporary fix for poor performance of board screen
	$("#planScreen").html('<div id="board" style="position: absolute;"></div><h3  style="position:absolute; top:95%;">Next //Turn: <span id="nextTurn"></span></h3>');
	game.board.DrawBoard();
	game.board.update();

	game.board.DrawPieces();
	game.nextTurn = game.turns.getNext();

	$("nav.bidMeeting").hide();
	$("nav.main").show();
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