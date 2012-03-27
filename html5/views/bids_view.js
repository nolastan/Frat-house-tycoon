var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  
});

function drawBidScreen(results){
console.log("here");
/* // FOR TESTING:
	var rushees = { 
	    0: { name: "Paul Carleton", id: 0, skills: {rush: 25, party: 15, study: 7, cs: 32}, chanceWillJoin: .33, skin_color: "#F5DACC", eye_color: "blue", hair_style: "short", hair_color: "yellow"}, 
	    1: { name: "Stan Rosenthal", id: 1, skills: {rush: 25, party: 15, study: 7, cs: 32}, chanceWillJoin: .50, skin_color: "#EDBFA6", eye_color: "brown", hair_style: "short", hair_color:  "brown"}, 
	    2: { name: "Greg Villeneuve", id: 2, skills: {rush: 25, party: 15, study: 7, cs: 32},  chanceWillJoin: .15, skin_color:  "#D38D6F", eye_color: "green", hair_style: "spiked", hair_color: "red"} 
	    }
*/

	for(i = 0; i < game.frat.rushees.length; i++){
		var rushee = game.frat.rushees[i];
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
	

	$("#bidScreen .continue").click(plan);  
	
	// @TODO change to jQuery
	document.getElementById("philanthropyMessage").innerHTML = results['cs'].string();
	document.getElementById("rushMessage").innerHTML = results['rush'].string();
	document.getElementById("partyMessage").innerHTML = results['party'].string();
	document.getElementById("studyMessage").innerHTML = results['study'].string();
	document.getElementById('normal').className = 'disabled';
	document.getElementById('fast').className = 'disabled';
	document.getElementById('skip').className = 'disabled';
	document.getElementById('results').style.display = "block";
	document.getElementById('simulation').style.display = "none";

	

}

