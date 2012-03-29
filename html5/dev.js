$(document).ready(function(){
	$("#addRushees").click(addRushees);
	$("#addBids").click(addBids);
});

function addRushees(){
	for(i = 0; i < 5; i++){
		var rushee = create_member(game.frat.rep);
	    game.frat.rushees[rushee.id] = rushee;
	}
	console.log(game.frat.rushees);
	updateStatsBar();
}
function addBids(){
	game.frat.bids++;
	console.log(game.frat.bids + " bids");
}