/*
 * Info of the items
 */

var testItem = {
	"name": 'test',
	"price": 10,
	"descript": 'this is a test item 11111 1111111 11111111 1111 1111',
	"img": 'sprites/buy_icon.svg'
};

var testItem2 = {
		"name": 'test2',
		"price": 20,
		"descript": 'this is the test item2',
		"img": 'sprites/build_icon.svg'
	};

var testItem3 = {
		"name": 'test3',
		"price": 300,
		"descript": 'this is the test item3 333 3 3 3 33 3 33 3 ',
		"img": 'sprites/build_icon.svg'
	};

var items = [testItem, testItem2, testItem3];

/***********************************************************************/

/* 
 * Add the name of the item bought to game.frat.items
 */

function buyItem(id) {
	item = items[id];
	var index = game.frat.items.indexOf(item);
	if (index != -1) {
		alert("You already have this item!");
		return false;
	}
	else if (game.frat.cash < item.price) {
		alert("You don't have enough cash!");
		return false;
	}
	else {
		game.frat.cash -= item.price;
		game.frat.items.push(item.name);
		console.log('Item ' + item.name + ' is bought');
		console.log('now you have: '+ game.frat.items);
		return true;
	}
}

/***********************************************************************/

/*
 * the buy view
 */

var buyScreen;

$(document).ready(function(){
	buyScreen = $("#buyScreen");
});

function drawBuyScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#buyScreen").show();
  	$("#screens button").removeClass("active");
  	$("#screens .buy button").addClass("active");
  	
	$("#buyScreen .items").html("");

  	for(i in items){
  		var item = items[i];
  		var html = "";
  		  		  		
		html += '<li class="item" id="' + i + '">';
		html += '<p class="name">' + item.name + '</p>';
		html += '<img width="100" src="' + item.img + '"/>';
		html += '<p class="descript">' + item.descript + '</p>';
		html += '<p class="price"> $' + item.price + '</p>';
		html += '<button class="buy">Buy</button>';
		html += "</li>";
		
		$("#buyScreen .items").append(html);
  	}
  	
	$("#buyScreen .items li button").click(function(){
		var id = $(this).parent().attr("id");
		if (buyItem(id)){
			$(this).addClass("bought");
			$(this).html("Bought");
			$(this).unbind("click");
		}
  	});

}