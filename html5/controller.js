$(document).ready(function(){

	initializeScreen();

});

function initializeScreen(){
	drawPlanningScreen();
}

function plan(){
	console.log("load plan screen");
	
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
	game.frat.update();
};

function bidMeeting(){
	
	
	drawBidScreen();
};



