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
			html += '<li class="rush"><label>R</label><div class="bar"><div class="fill" style="width:' + rushee.skills.rush + '%"></div></div></li>';
			html += '<li class="party"><label>P</label><div class="bar"><div class="fill" style="width:' + rushee.skills.party + '%"></div></div></li>';
			html += '<li class="cs"><label>S</label><div class="bar"><div class="fill" style="width:' + rushee.skills.cs + '%"></div></div></li>';
			html += '<li class="study"><label>A</label><div class="bar"><div class="fill" style="width:' + rushee.skills.study + '%"></div></div></li>';
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

