var bidScreen;

$(document).ready(function(){
	bidScreen = $("#bidScreen");
  
});

function drawBidScreen(results){
	var html = "";
	html += "<h2>Bid Meeting!</h2>";
	html += '<ul class="rushees">';
	for(i = 0; i < results.rushees.length; i++){
		var rushee = results.rushees[i];
		html += '<li id="rushee_' + i + '">';
		html += "rushee #" + i + "<br/>";
		html += "<strong>Rush</strong> " + rushee.skills.rush + "<br />";
		html += "<strong>Party</strong> " + rushee.skills.party + "<br />";
		html += "<strong>CS</strong> " + rushee.skills.cs + "<br />";
		html += "<strong>Study</strong> " + rushee.skills.study + "<br />";
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

