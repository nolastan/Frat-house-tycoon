$(document).ready(function(){
	var html = "";
	for(key in quests){
		var quest = quests[key];
		html += "<li id='"+ key + "'>";
		html += "<h3>" + quest.name + "</h3>";
		html += "<p class='description'>" + quest.description + "</p>";
		html += '<button class="start">Start</button>';
		html += "</li>";
	}
	$("ul.quests").html(html);
	$("ul.quests li button.start").click(function(){
		var id = $(this).parent().attr("id");
		newGame(id);
	})
	
	
	$("nav.bidMeeting").hide();
	$("nav.main").hide();
	$("#bidScreen").hide();
	$("#planScreen").hide();
	$("#simulation").hide();
	$("#results").hide()
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#run").show();
	$("#buyScreen").hide();
  	$("#screens button").removeClass("active");
  	$("#screens .board button").addClass("active");
	
});

function drawMenuScreen(){
	$("#menu div.quest").hide();
	$("#menu button.quest").click(function(){
		$("#menu div.quest").show();
		$("#menu .options").hide();
	});
	$("#menu").show();
	$("#menu button.sandbox").click(function(){
		plan();
	});
	$("div.quest button.cancel").click(function(){
		$("div.quest").hide();
		$(".options").show();
	});
}