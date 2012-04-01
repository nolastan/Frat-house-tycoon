function drawPlanningScreen(){
	// Temporary fix for poor performance of board screen
	//$("#planScreen").html('<div id="board" style="position: absolute;"></div><h3  style="position:absolute; top:95%;">Next //Turn: <span id="nextTurn"></span></h3>');
	
	if(!game.board.IsInitialized())
	{
	   game.board.Initialize();
	}
	game.board.update();	
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
	$("#buyScreen").hide();
	$("#nextTurn").html(game.nextTurn.title);
  	$("#screens button").removeClass("active");
  	$("#screens .board button").addClass("active");
 
}

$(document).ready(function(){
	$("#run").click(function(){simulate()});
});