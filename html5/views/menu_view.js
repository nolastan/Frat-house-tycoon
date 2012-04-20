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
	    console.log('quest started');	    
		var id = $(this).parent().attr("id");
		newGame(id);
	})
	
	
	$("nav.bidMeeting").hide();
	$("nav.main").hide();
	$(".screens").hide();
	$("#menu").show()
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
	    console.log('sandbox started');
		for (var i = 0; i < 10; i++) {	
			game.frat.addMember(create_member());
		}
		plan();
	});
	$("div.quest button.cancel").click(function(){
		$("div.quest").hide();
		$(".options").show();
	});
}