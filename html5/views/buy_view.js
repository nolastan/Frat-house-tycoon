/*
 * Info of the items
 */

var kitchen = {
		"name": 'Kitchen',
		"price": 900,
		"descript": 'Kitchen with all stainless steel appliances! Reduces food cost for parties and philanthropy!',
		"img": 'sprites/items/kitchen.svg',
		"mult": {'party':0.2, 'rush':0, 'cs': 0.2, 'study':0}
};

var tv = {
		"name": 'Television',
		"price": 250,
		"descript": '106 inch 1080P HD 3D LCD TV! Good for parties and rush event!',
		"img": 'sprites/items/tv.svg',
		"mult": {'party':0.1, 'rush':0.1, 'cs':0, 'study':0}
};

var dj = {
		"name": 'DJ Equipments',
		"price": 400,
		"descript": 'Premium DJ equipment with high performance sound card! It can rock your party!',
		"img": 'sprites/items/dj.svg',
		"mult": {'party':0.2, 'rush':0, 'cs':0, 'study':0}
	};

var pc = {
		"name": 'Computer Workstation',
		"price": 600,
		"descript": 'Dual screen workstation with 2*4 core AMD Opteron! This will definitely improve your GPA.',
		"img": 'sprites/items/computer.svg',
		"mult": {'party':0, 'rush':0, 'cs':0, 'study':0.2}
	};

var swim = {
		"name": 'Swimming Pool',
		"price": 1500,
		"descript": 'Cool swimming pool with heating system! Great for party and rush events!',
		"img": 'sprites/items/swim.svg',
		"mult": {'party':0.2, 'rush':0.2, 'cs':0, 'study':0}
	};

var pool = {
		"name": 'Pool Table',
		"price": 1000,
		"descript": 'Awesome pool table with automatic pool ball return! Super good for parties and rush event!',
		"img": 'sprites/items/pooltable.svg',
		"mult": {'party':0.15, 'rush':0.15, 'cs':0, 'study':0}
};

var items = [tv, dj, pc, swim, pool, kitchen];

/***********************************************************************/

/* 
 * Add the name of the item bought to game.frat.items
 */

function buyItem(id) {
	item = items[id];
	var index = game.frat.items.indexOf(item.name);
	if (index != -1) {
		alert("You already have this item!");
		return false;
	}
	else if (game.frat.cash < item.price) {
		console.log('you have: '+ game.frat.items);
		alert("You don't have enough cash!");
		return false;
	}
	else {
		console.log('you used to have $' +game.frat.cash);
		
		game.frat.cash -= item.price;
		game.frat.items.push(item.name);
		
		game.frat.itemMult.party += item.mult.party;
		game.frat.itemMult.cs += item.mult.cs;
		game.frat.itemMult.rush += item.mult.rush;
		game.frat.itemMult.study += item.mult.study;
		
		console.log('Item ' + item.name + ' is bought');
		console.log('now you have: '+ game.frat.items);
		console.log('the new itemMult.party is '+ game.frat.itemMult.party);

		return true;
	}
}

function clickBuy(){
	var id = $(this).parent().attr("id");
	if (buyItem(id)){
		updateStatsBar();
		$(this).addClass("bought");
		$(this).html("Bought");
		$(this).unbind("click");
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
  	$("#goal button").removeClass("active");
  	$("#screens .buy button").addClass("active");
  	
	$("#buyScreen .items").html("");
		
  	for(i in items){
  		var item = items[i];
  		var html = "";
  		
		html += '<li class="item" id="' + i + '">';
		html += '<p class="name">' + item.name + '</p>';
		html += '<img src="' + item.img + '"/img>';
		html += '<p class="descript">' + item.descript + '</p>';
		html += '<p class="price"> $' + item.price + '</p>';
		if (game.frat.items.indexOf(item.name) == -1){html += '<button class="buy">Buy</button>';}
		else {html += '<button class="bought" disabled="disabled">Bought</button>';}
		html += "</li>";
		
		$("#buyScreen .items").append(html);
  	}
  	
	$("#buyScreen .items li button").click(clickBuy);
}