/*
 * Info of the items
 */

var kitchen = {
		"name": 'Kitchen',
		"price": 250,
		"descript": 'Kitchen with all stainless steel appliances! Reduces food cost for parties and philanthropy!',
		"img": 'sprites/items/kitchen.svg',
		"mult": {'party':0.2, 'rush':0, 'cs': 0.2, 'study':0}
};

var br = {
		"name": 'Bedroom',
		"price": 100,
		"descript": 'Cozy bedroom with a lot of queen beds! Fits up to 5 people!',
		"img": 'sprites/items/br.svg',
		"mult": {'party':0, 'rush':0, 'cs':0, 'study':0}
	};

var builds = [kitchen, br];

/***********************************************************************/

/* 
 * Add the name of the item bought to game.frat.items
 */

function buildItem(id) {
	item = builds[id];
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
		
		if (item.name=='Bedroom') {
			game.frat.numOfBedrooms += 1;
		}
		
		console.log('Item ' + item.name + ' is bought');
		console.log('now you have: '+ game.frat.items);
		console.log('the new itemMult.party is '+ game.frat.itemMult.party);

		return true;
	}
}

function clickBuild(){
	var id = $(this).parent().attr("id");
	if (buildItem(id)){
		updateStatsBar();
		$(this).addClass("bought");
		$(this).html("Bought");
		$(this).unbind("click");
	}
}

/***********************************************************************/

/*
 * the build view
 */

var buildScreen;

$(document).ready(function(){
	buildScreen = $("#buildScreen");
});

function drawBuildScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#buildScreen").show();
	$("#buyScreen").hide();
  	$("#screens button").removeClass("active");
  	$("#screens .build button").addClass("active");
  	
	$("#buildScreen .items").html("");
		
  	for(i in builds){
  		var item = builds[i];
  		var html = "";
  		
		html += '<li class="item" id="' + i + '">';
		html += '<p class="name">' + item.name + '</p>';
		html += '<img src="' + item.img + '"/img>';
		html += '<p class="descript">' + item.descript + '</p>';
		html += '<p class="price"> $' + item.price + '</p>';
		if (game.frat.items.indexOf(item.name) == -1){html += '<button class="buy">Build</button>';}
		else {html += '<button class="bought" disabled="disabled">Built</button>';}
		html += "</li>";
		
		$("#buildScreen .items").append(html);
  	}
  	
	$("#buildScreen .items li button").click(clickBuild);
}