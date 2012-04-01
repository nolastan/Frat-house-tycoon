var testItem = {
	"name": 'test',
	"price": 10,
	"descript": 'this is a test item',
	"img": 'sprites/buy_icon.svg'
};

var testItem2 = {
		"name": 'test2',
		"price": 10,
		"descript": 'this is the test item2',
		"img": 'sprites/build_icon.svg'
	};


var items = [testItem, testItem2];
var buyScreen;


$(document).ready(function(){
	buyScreen = $("#buyScreen");
});


function drawBuyScreen(){
  	$("#simulation").hide();
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$("#bidScreen").hide();
	$("#planScreen").hide();
	$("#results").hide();
	$("#buyScreen").show();
  	$("#screens button").removeClass("active");
  	$("#screens .buy button").addClass("active");
  	
	$("#buyScreen .items").html("");

  	for(i in items){
  		var item = items[i];
  		var html = "";
  		
  		console.log("xxx"+item.img);
  		
		html += '<li class="items">';
		html += '<p class="name">' + item.name + '</p>';
		html += '<img width="100" src="' + item.img + '"/>';
		html += '<p class="descript">' + item.descript + '</p>';
		html += '<button>Buy</button>';
		html += "</li>";
		
		$("#buyScreen .items").append(html);
  	}
  	
	$("#buyScreen. items button").show();	
	$("#bidScreen. items li button").click(function(){
		console.log("item clicked!")
  	});
  	
}
