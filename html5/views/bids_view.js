var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  	$("nav.bidMeeting .continue").click(plan);
});

function drawBidScreen(){
	bidScreen.show();
 	$("nav.bidMeeting").removeClass("over");
 	$("#results").hide();
  	$("#planScreen").hide();
  	$("#simulation").hide();
  	$("#buy").hide();
  	$("#screens button").removeClass("active");
  	$("#screens .rush button").addClass("active");
  	
  	if(game.frat.bids > 0 && game.frat.rushees.length){
  		$("nav.main").hide();
  		$("nav.bidMeeting").show();
  		$("nav.bidMeeting .val").html(game.frat.bids);
  	}

	// clear list
	$("#bidScreen .rushees").html("");
	
	if(Object.size(game.frat.rushees) == 0){
		var html = "<li>No one is rushing your fraternity.</li>";
		$("#bidScreen .rushees").html(html);		
	}else{
		for(key in game.frat.rushees){
			console.log(key);
			var rushee = game.frat.rushees[key];
			var html = "";
			var ctx;
					
			html += '<li class="rushee" id="rushee_' +rushee.id + '">';
			html += '<p class="name">' + rushee.name + '</p>';
			html += '<canvas height="100" width="100" class="face"></canvas>';
			html += '<ul class="skills">';
			html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.rush + '%"></div></div></li>';
			html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.party + '%"></div></div></li>';
			html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.cs + '%"></div></div></li>';
			html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + rushee.skills.study + '%"></div></div></li>';
			html += '</ul>';
			html += '<canvas width="100" height="50" class="gauge"></canvas>';
			html += '<p class="interest">interest</p>';
			html += '<button class="bid">Bid</button>';
			html += "</li>";
			$("#bidScreen .rushees").append(html);
	
			ctx = $("#rushee_"+rushee.id+" .gauge")[0];
			drawGauge(ctx.getContext("2d"), rushee.chanceWillJoin(game.frat))
			
			ctx = $("#rushee_"+rushee.id+" .face")[0];
			drawRusheeFace(ctx.getContext("2d"), rushee.eye_color, rushee.hair_color, rushee.hair_style, rushee.skin_color);
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
			$(divId).append(html);
			
			ctx = $(divId + " .face")[0];
			drawRusheeFace(ctx.getContext("2d"), member.eye_color, member.hair_color, member.hair_style, member.skin_color);

}

