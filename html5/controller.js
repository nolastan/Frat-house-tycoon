$(document).ready(function(){

	initializeGame();

});

function initializeGame(){
	drawPlanningScreen();
}

function plan(){
	
	
	drawPlanningScreen();
};

function simulate(){
   	game.board.update_play();
	var turn = game.turns.getNext();
	game.sim = new simulation(game.frat.getPlayValues(), turn.run(game.frat));
	game.sim.run();

	drawSimulationScreen(turn);
};

function results(){
	drawBidScreen(results);
	var msg = "";
	game.board.update();
	
	drawResultsScreen();
};

function bidMeeting(){
	
	
	drawBidScreen();
};



