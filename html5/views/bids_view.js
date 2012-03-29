var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  
});

function drawBidScreen(){
	bidScreen.show();
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

/* // FOR TESTING:
	var rushees = { 
	    0: { name: "Paul Carleton", id: 0, skills: {rush: 25, party: 15, study: 7, cs: 32}, chanceWillJoin: .33, skin_color: "#F5DACC", eye_color: "blue", hair_style: "short", hair_color: "yellow"}, 
	    1: { name: "Stan Rosenthal", id: 1, skills: {rush: 25, party: 15, study: 7, cs: 32}, chanceWillJoin: .50, skin_color: "#EDBFA6", eye_color: "brown", hair_style: "short", hair_color:  "brown"}, 
	    2: { name: "Greg Villeneuve", id: 2, skills: {rush: 25, party: 15, study: 7, cs: 32},  chanceWillJoin: .15, skin_color:  "#D38D6F", eye_color: "green", hair_style: "spiked", hair_color: "red"} 
	    }
*/
	// clear list
	$("#bidScreen .rushees").html("");
	
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
  			console.log("accepted");
  		}else{
  			console.log("declined");
  		}
  	});

}

