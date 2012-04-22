$(document).ready(function(){

	initializeScreen();
	$("#screens .rush").click(bidMeeting);
	$("#screens .board").click(plan);
	$("#screens .goal").click(goal);
	$("#screens .buy").click(buy);
	$("nav.bidMeeting").hide();
	
	
	
});

function initializeScreen(){
	menu();	
}

function menu(){
	drawMenuScreen();
}

function newGame(quest_key){
    var spec = Array();
	
	game.quest = quests[quest_key];    
	spec.skills = game.quest.start;
	game.isQuest = true;
	game.frat = create_frat(game.quest);	
	for (var i = 0; i < game.quest.start.membership; i++) {	
	    if(game.quest.start.random_skills){
		   game.frat.addMember(create_member());
        }
        else {
		   game.frat.addMember(create_member(spec));
		}
	}
	
	game.frat.bids = 0;	
	
	$("nav #skills .rush .bar").css("backgroundPosition", game.quest.goal.rush + "%");
	$("nav #skills .party .bar").css("backgroundPosition", game.quest.goal.party + "%");
	$("nav #skills .cs .bar").css("backgroundPosition", game.quest.goal.cs + "%");
	$("nav #skills .rush .bar").css("backgroundPosition", game.quest.goal.rush + "%");
	
	plan();
}

function buy(){
	drawBuyScreen();
	updateStatsBar();
}

function goal(){
	drawGoalScreen();	
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



