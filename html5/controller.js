$(document).ready(function(){

	initializeScreen();

});

function initializeScreen(){
/* 	drawPlanningScreen(); */
	plan();
	updateStatsBar()
}

function plan(){
	console.log("load plan screen");
	console.log(game.turns.turnNum);
	drawPlanningScreen();
};

function simulate(){
   	game.board.update_play();
	var turn = game.nextTurn;
	game.results = turn.run(game.frat);
	game.sim = new Simulation(game.frat.getPlayValues(), game.results);
	game.sim.run();
	updateStatsBar();
	drawSimulationScreen(turn);
};

function results(){
	drawBidScreen(game.results);
	var msg = "";
	
	drawResultsScreen();
	game.frat.update();
};

function bidMeeting(){
	bidScreen.show();
  	$("#results").hide();
	drawBidScreen();
	updateStatsBar()
};

function updateStatsBar() {
	$("#stats .rep .val").html(game.frat.rep);
	$("#stats .cash .val").html(game.frat.cash);
	$("#stats .brothers .val").html(game.frat.members.length);
}



