function drawSimulationScreen(turn, results){
	document.getElementById("currentTurn").innerHTML = turn.title + " results";
	$(this).hide();
	$("#run").hide();
	$("#planScreen").hide();
	$("#results").hide();
	$("#simulation").show();
	$("#normal").show();
	$("#normal").addClass("active");
	$("#fast").show();
	$("#skip").show();
	game.sim.goerCount = results.party;
	game.sim.stopped = false;
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
		console.log(game.sim);
		game.sim.cleanUp();
		game.sim.stopped = true;
		results();
	});
	

});