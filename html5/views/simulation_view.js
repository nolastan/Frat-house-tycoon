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
	if (game.frat.getPlayValues().party > 0) {
		game.sim.goersCount = calcNumGoers(results.party.rep);
	} else {
		game.sim.goersCount = 0;
	}
	game.sim.start();
}

function calcNumGoers(skill) {
	return (-50/(1+Math.pow(2,0.1*(skill-50)))) + 55; 
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
		//game.sim.end();
		game.sim.stopped = true;
		game.sim.cleanUp();

		results();
	});
	

});