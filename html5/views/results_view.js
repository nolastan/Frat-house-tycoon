function drawResultsScreen(){
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();
	

	
}

$(document).ready(function(){
  $("#results .continue").click(function(){
	bidScreen.show();
  	$("#results").hide();
  document.getElementById('sim').className = '';

  });
});