var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  
});

function drawBidScreen(results){
	var html = "";
	html += "<h2>Bid Meeting!</h2>";
	html += '<ul class="rushees">';
	for(i = 0; i < game.frat.rushees.length; i++){
		var rushee = game.frat.rushees[i];
		
		if(rushee.chanceWillJoin(game.frat) > .8) 
		
		html += '<li class="rushee" id="rushee_' +rushee.id + '">';
		html += '<p class="name">' + rushee.name + '</p>';
		html += '<ul class="skills">';
		html += '<li class="rush"><label>R</label><div class="bar"><div class="fill" style="width:' + rushee.skills.rush + '%"></div></div></li>';
		html += '<li class="party"><label>P</label><div class="bar"><div class="fill" style="width:' + rushee.skills.party + '%"></div></div></li>';
		html += '<li class="cs"><label>S</label><div class="bar"><div class="fill" style="width:' + rushee.skills.cs + '%"></div></div></li>';
		html += '<li class="study"><label>A</label><div class="bar"><div class="fill" style="width:' + rushee.skills.study + '%"></div></div></li>';
		html += '</ul>';
		html += "<p style='font-size:200%'>" + Math.round(rushee.chanceWillJoin(game.frat) * 100) + "%</p>";
		html += "</li>";
	}
	html += '</ul>';
	html += '<button class="continue">OK</button>';
	
	bidScreen.html(html);
		
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

