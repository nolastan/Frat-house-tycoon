$(document).ready(function(){

	initializeScreen();
	$("#screens .rush").click(bidMeeting);
	$("#screens .board").click(plan);
	$("nav.bidMeeting").hide();
	
});

function initializeScreen(){
	plan();
	updateStatsBar()
}

function plan(){
	if(game.frat.bids > 0 && game.frat.rushees.length > 0){
		console.log("Bid meeting!")
		bidMeeting();
	}else{
		drawPlanningScreen();	
	}
};

function simulate(){
	var turn = game.nextTurn;
	game.results = turn.run(game.frat);
	//game.sim = new Simulation(game.frat.getPlayValues(), game.results);
	//game.sim.run();
	updateStatsBar();
	drawSimulationScreen(turn, game.results);
};

function results(){

	var msg = "";
	
	drawResultsScreen();
	game.frat.update();
};

function bidMeeting(){
	drawBidScreen();
	updateStatsBar()
};

function updateStatsBar() {
	$("#stats .rep .val").html(game.frat.rep);
	$("#stats .cash .val").html(game.frat.cash);
	$("#stats .brothers .val").html(game.frat.members.length);
	$("#screens .rush .val").html(Object.size(game.frat.rushees));
	$("nav.bidMeeting .val").html(game.frat.bids);
	if(Object.size(game.frat.rushees) == 0){
		$("#screens .rush .val").hide();
	}else{
		$("#screens .rush .val").show();	
	}
	$("nav #skills .rush .fill").css("width", game.frat.getSkillAvgs().rush + "%");
	$("nav #skills .party .fill").css("width", game.frat.getSkillAvgs().party + "%");
	$("nav #skills .cs .fill").css("width", game.frat.getSkillAvgs().cs + "%");
	$("nav #skills .study .fill").css("width", game.frat.getSkillAvgs().study + "%");
}



