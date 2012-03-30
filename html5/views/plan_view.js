function drawPlanningScreen(){
	// Temporary fix for poor performance of board screen
	//$("#planScreen").html('<div id="board" style="position: absolute;"></div><h3  style="position:absolute; top:95%;">Next //Turn: <span id="nextTurn"></span></h3>');
	game.nextTurn = game.turns.getNext();

	$("nav.bidMeeting").hide();
	$("nav.main").show();
	$("#bidScreen").hide();
	$("#planScreen").show();
	$("#simulation").hide();
	$("#results").hide()
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#run").show();
	$("#nextTurn").html(game.nextTurn.title);
  	$("#screens button").removeClass("active");
  	$("#screens .board button").addClass("active"); 

	for(key in game.frat.members){
		console.log(key);
		var member = game.frat.members[key];
		var html = "";
		var ctx;
				
		html += '<li class="member" id="member_' +member.id + '">';
		html += '<p class="name">' + member.name + '</p>';
		html += '<canvas height="100" width="100" class="face"></canvas>';
		html += '<ul class="skills">';
		html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.rush + '%"></div></div></li>';
		html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.party + '%"></div></div></li>';
		html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.cs + '%"></div></div></li>';
		html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.study + '%"></div></div></li>';
		html += '</ul>';
		html += "</li>";
		$("#planScreen .members").append(html);
		
		ctx = $("#member_"+member.id+" .face")[0];
		drawRusheeFace(ctx.getContext("2d"), member.eye_color, member.hair_color, member.hair_style, member.skin_color);
	}
}

$(document).ready(function(){
	$("#run").click(function(){simulate()});

	
});