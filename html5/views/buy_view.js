/*
 * Info of the items
 */

var tv = {
	"name": 'Television',
	"price": 100,
	"descript": '106 inch 1080P HD 3D LCD TV! Good for parties and rush event!',
	"img": 'sprites/items/tv.svg'
};

var dj = {
		"name": 'DJ Equipments',
		"price": 150,
		"descript": 'Premium DJ equipment with high performance sound card! It can rock your party!',
		"img": 'sprites/items/dj.svg'
	};

var pc = {
		"name": 'Computer Workstation',
		"price": 100,
		"descript": 'Dual screen workstation with 2*4 core AMD Opteron! This will definitely improve your GPA because you will only use it for studying.',
		"img": 'sprites/items/computer.svg'
	};

var swim = {
		"name": 'Swimming Pool',
		"price": 200,
		"descript": 'Cool swimming pool with heating system! Great for party and rush events!',
		"img": 'sprites/items/swim.svg'
	};

var items = [tv, dj, pc, swim];

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
		html += '<img src="' + item.img + '"/>';
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