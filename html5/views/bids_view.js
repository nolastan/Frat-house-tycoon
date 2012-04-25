var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  	$("nav.bidMeeting .continue").click(plan);
});

function drawBidScreen(info){
    turnFound = false;
	$(".screens").hide();
	bidScreen.show();
 	$("nav.bidMeeting").removeClass("over");
  	$("#screens button").removeClass("active");
  	$("#screens .rush button").addClass("active");
  	
	console.log(info.bidDay);
  	if(info.bidDay){
  		$("nav.main #screens, nav.main #run").hide();
  		$("nav.bidMeeting").show();
  		$("nav.bidMeeting .val").html(game.frat.bids);
  	}

	// clear list
	$("#bidScreen .rushees").html("");
	
	if(Object.size(game.frat.rushees) == 0){
		var html = "<li>No one is rushing your fraternity.</li>";
		$("#bidScreen .rushees").html(html);
		endBidMeeting();
	}else{
		for(key in game.frat.rushees){
			console.log(key);
			var rushee = game.frat.rushees[key];
			var html = "";
			var ctx;
			
			var maxSkill = Math.max(rushee.skills.rush, rushee.skills.party, rushee.skills.cs, rushee.skills.study);
					
			html += '<li class="rushee" id="rushee_' +rushee.id + '">';
			html += '<p class="name">' + rushee.name + '</p>';
			html += '<canvas height="100" width="100" class="face"></canvas>';
			html += '<ul class="skills">';
			html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.rush / maxSkill * 100 + '%"></div></div></li>';
			html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.party / maxSkill * 100 + '%"></div></div></li>';
			html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.cs / maxSkill* 100 + '%"></div></div></li>';
			html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.study / maxSkill* 100 + '%"></div></div></li>';
			html += '</ul>';
			html += '<canvas width="100" height="50" class="gauge"></canvas>';
			html += '<p class="interest">reputation</p>';
			html += '<button class="bid">Bid</button>';
			html += "</li>";
			$("#bidScreen .rushees").append(html);
	
			ctx = $("#rushee_"+rushee.id+" .gauge")[0];
			drawGauge(ctx.getContext("2d"), (rushee.skills.rush + rushee.skills.party + rushee.skills.cs + rushee.skills.study) / 100);
			
			ctx = $("#rushee_"+rushee.id+" .face")[0];
			drawRusheeFace(ctx.getContext("2d"), rushee);
		}
		
		if(game.frat.bids == 0){
			$("#bidScreen .rushees button").hide();
		}else{
			$("#bidScreen .rushees button").show();		
		}
	  	
	  	$("#bidScreen .rushees li button").click(function(){
			var id = $(this).parent().attr("id");
			id = id.replace("rushee_", "");
	  		if(bidRushee(id)){
	  			$(this).addClass("accepted");
	  			$(this).html("Accepted");
	  		}else{
	  			$(this).addClass("declined");
	  			$(this).html("Declined");
	    	}
	    	$(this).unbind("click");
	  	});
	}
}

function drawFaceCard(member, divId) {
			var html = "";
					
			html += '<li class="rushee" id="rushee_' +member.id + '">';
			html += '<p class="name">' + member.name + '</p>';
			html += '<canvas height="100" width="100" class="face"></canvas>';
			html += '<ul class="skills">';
			html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.rush + '%"></div></div></li>';
			html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.party + '%"></div></div></li>';
			html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.cs + '%"></div></div></li>';
			html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.study + '%"></div></div></li>';
			html += '</ul>';
			html += "</li>";
			$(divId).html(html);
			
			ctx = $(divId + " .face")[0];
			drawRusheeFace(ctx.getContext("2d"), member);

}


function endBidMeeting() {
		$("nav.bidMeeting").addClass("over");
		$("#bidScreen .rushees li button").unbind("click");
		game.frat.bids = 0;  			
		game.frat.rushees.length = 0;  
}

function bidRushee(id){
	var rushee = game.frat.rushees[id];
	var accepted;
	game.frat.bids--;
	
	if(Math.random() < rushee.chanceWillJoin()){
		game.frat.members.push(rushee);
		PlanView_AddPiece(rushee);
		accepted = true;
	}else{	
		accepted = false;
	}
	delete game.frat.rushees[id];
	
	if(game.frat.bids == 0 || Object.size(game.frat.rushees) == 0){
			endBidMeeting();
	}
	updateStatsBar();	
	return accepted;
}
