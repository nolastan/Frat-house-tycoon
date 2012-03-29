function drawResultsScreen(){
  	$("#simulation").hide();
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$("#results").show();

/*
	// @TODO change to jQuery
	document.getElementById("philanthropyMessage").innerHTML = results['cs'].string();
	document.getElementById("rushMessage").innerHTML = results['rush'].string();
	document.getElementById("partyMessage").innerHTML = results['party'].string();
	document.getElementById("studyMessage").innerHTML = results['study'].string();
	document.getElementById('results').style.display = "block";
	document.getElementById('simulation').style.display = "none";
*/
	
}

$(document).ready(function(){
  $("#results .continue").click(function(){
	plan();

  });
});