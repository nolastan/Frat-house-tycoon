var goalScreen;

$(document).ready(function(){
	goalScreen = $("#goalScreen");
});

function drawGoalScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#goalScreen").show();
	$("#buyScreen").hide();
  	$("#screens button").removeClass("active");	  	
	
}