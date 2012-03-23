function drawResultsScreen(){

}

$(document).ready(function(){
  $("#results .continue").click(function(){
	bidScreen.show();
  	$("#results").hide();
  document.getElementById('sim').className = '';

  });
});