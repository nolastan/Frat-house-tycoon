$(document).ready(function(){

	initializeScreen();
	$("#screens .rush").click(bidMeeting);
	$("#screens .board").click(plan);
	$("#screens .build").click(build);
	$("#screens .buy").click(buy);
	$("nav.bidMeeting").hide();
	
	
	
});

function initializeScreen(){
	menu();
	updateStatsBar();
}

function menu(){
	drawMenuScreen();
}

function newGame(quest_key){
	var quest = quests[quest_key];
	var spec = Array();
	spec.skills = quest.start;
/* 	game.frat = create_frat(quest); */
	game.frat.members.length = 0;
	for (var i = 0; i < 5; i++) {	
		game.frat.addMember(create_member(spec));
		console.log('f');
	}
	$("nav #skills .study .bar").css("backgroundPosition", quest.goal.study + "%, 0%");
	$("nav #skills .party .bar").css("backgroundPosition", quest.goal.party + "%, 0%");
	$("nav #skills .cs .bar").css("backgroundPosition", quest.goal.cs + "%, 0%");
	$("nav #skills .rush .bar").css("backgroundPosition", quest.goal.rush + "%, 0%");
	updateStatsBar();
	plan();
}

function buy(){
	drawBuyScreen();
	updateStatsBar();
}

function build(){
	drawBuildScreen();
	updateStatsBar();
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
    PlanView_UpdatePlay();
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
	updateStatsBar();
};

function updateStatsBar() {
	// show indicators on status bars
	$(".rush .bar").css("backgroundPosition", game.frat.getSkillAvgs().rush + "%");
	
	
	$("#stats .rep .val").html(game.frat.rep);
	$("#stats .money .val").html(game.frat.cash);
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



