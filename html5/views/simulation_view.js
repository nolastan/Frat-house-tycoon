function drawSimulationScreen(turn, results){
	document.getElementById("currentTurn").innerHTML = turn.title + " results";
	$(this).hide();
	$("nav.main #screens").hide();
	$("#run").hide();
	$("#results").hide();
	$(".screens").hide();
	$("#simulation").show();
	$("#normal").show();
	$("#normal").addClass("active");
	$("#fast").show();
	$("#skip").show();
	/*
	if (game.frat.getPlayValues().party > 0) {
		game.sim.partyGoersCount = calcNumGoers(results.party.rep);
	} else {
		game.sim.partyGoersCount = 0;
	}*/
	
	setGoers(game.frat.getPlayValues(), results)
	game.sim.start();
}

function calcNumGoers(skill) {
	return (-50/(1+Math.pow(2,0.1*(skill-50)))) + 55; 
}

function setGoers(play, results) {
	//Set how many people will go to the party
	if (play.party > 0) {
		game.sim.partyGoersCount = calcNumGoers(results.party.rep);
	} else {
		game.sim.partyGoersCount = 0;
	}
	
	//Set how many people will go to the philanthropy event
	if (play.cs > 0) {
		game.sim.philGoersCount = calcNumGoers(results.cs.rep);
	} else {
		game.sim.philGoersCount = 0;
	}
}

$(document).ready(function(){

	$("#normal").click(function(){
		//game.sim.gameTime.speed = 1;
		$(this).addClass("active");
		$("#fast").removeClass("active");
	});
	
	$("#fast").click(function(){
		//game.sim.gameTime.speed = 3;
		$(this).addClass("active");
		$("#normal").removeClass("active");
	});
	
	
	$("#skip").click(function(){
		game.sim.end();
		//game.sim.stopped = true;
		//game.sim.cleanUp();

		//results();
	});
	

});