function drawResultsScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#results").show();
	console.log("RESULTS:");
	
	curPlay = game.frat.getPlay();
	
	// Find Social Committee Chair
	var highest_party = 0;
	var party_chair;
	for(key in curPlay.party){
		member_id = curPlay.party[key];
		member = game.frat.members[member_id];
		if(member.skills.party > highest_party){
			highest_party = member.skills.party
			party_chair = member;
		}
	}
	
	// Find Rush Committee Chair
	var highest_rush = 0;
	var rush_chair;
	for(key in curPlay.rush){
		member_id = curPlay.rush[key];
		member = game.frat.members[member_id];
		if(member.skills.rush > highest_rush){
			highest_rush = member.skills.rush
			rush_chair = member;
		}
	}
	
	// Find Philanthropy Committee Chair
	var highest_cs = 0;
	var cs_chair;
	for(key in curPlay.cs){
		member_id = curPlay.cs[key];
		member = game.frat.members[member_id];
		if(member.skills.cs > highest_cs){
			highest_cs = member.skills.cs
			cs_chair = member;
		}
	}

	// Find Academic Committee Chair
	var highest_study = 0;
	var study_chair;
	for(key in curPlay.study){
		member_id = curPlay.study[key];
		member = game.frat.members[member_id];
		if(member.skills.study > highest_study){
			highest_study = member.skills.study
			study_chair = member;
		}
	}
	
	
	
	
	
	ctx = $("#results .party canvas.chair")[0].getContext("2d");
	ctx.clearRect(0,0,100,100);
	if(highest_party > 0){
		drawRusheeFace(ctx, party_chair);
	} 
	
	ctx = $("#results .rush canvas.chair")[0].getContext("2d");
	ctx.clearRect(0,0,100,100);
	if(highest_rush > 0){
		drawRusheeFace(ctx, rush_chair);
	} 
	

	ctx = $("#results .cs canvas.chair")[0].getContext("2d");
	ctx.clearRect(0,0,100,100);
	if(highest_cs > 0){
		drawRusheeFace(ctx, cs_chair);
	} 

	ctx = $("#results .study canvas.chair")[0].getContext("2d");
	ctx.clearRect(0,0,100,100);
	if(highest_study > 0){
		drawRusheeFace(ctx, study_chair);
	} 
			
	$("#results .cs .val").html(game.results.cs.string());
	$("#results .party .val").html(game.results.party.string());
	$("#results .rush .val").html(game.results.rush.string());
	$("#results .study .val").html(game.results.study.string());

	
}

$(document).ready(function(){
  $("#results .continue").click(function(){
	plan();

  });
});