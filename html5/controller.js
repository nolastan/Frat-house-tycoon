$(document).ready(function(){

	initializeScreen();

});

function initializeScreen(){
	drawPlanningScreen();
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
	updateStatsBar()
	drawSimulationScreen(turn);
};

function results(){
	drawBidScreen(game.results);
	var msg = "";
	
	drawResultsScreen();
	game.frat.update();
};

function bidMeeting(){
	
	
	drawBidScreen();
	updateStatsBar()
};

function updateStatsBar() {
	$("#repCount").html(game.frat.rep);
	$("#cashCount").html(game.frat.cash);
	$("#brothersCount").html(game.frat.members.length);
}



