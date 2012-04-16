function drawResultsScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#results").show();
	console.log("RESULTS:");
	
	// Find Social Committee Chair
	var highest_party = 0;
	var social_chair;
	for(key in planViewPlay.party){
		member_id = planViewPlay.party[key];
		member = game.frat.members[member_id];
		if(member.skills.party > highest_party){
			highest_party = member.skills.party
			social_chair = member;
		}
	}
	
	// Find Rush Committee Chair
	var highest_rush = 0;
	var rush_chair;
	for(key in planViewPlay.rush){
		member_id = planViewPlay.rush[key];
		member = game.frat.members[member_id];
		if(member.skills.rush > highest_rush){
			highest_rush = member.skills.rush
			rush_chair = member;
		}
	}
	
	// Find Philanthropy Committee Chair
	var highest_cs = 0;
	var cs_chair;
	for(key in planViewPlay.cs){
		member_id = planViewPlay.cs[key];
		member = game.frat.members[member_id];
		if(member.skills.cs > highest_cs){
			highest_cs = member.skills.cs
			cs_chair = member;
		}
	}

	// Find Academic Committee Chair
	var highest_study = 0;
	var study_chair;
	for(key in planViewPlay.study){
		member_id = planViewPlay.study[key];
		member = game.frat.members[member_id];
		if(member.skills.study > highest_study){
			highest_study = member.skills.study
			study_chair = member;
		}
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