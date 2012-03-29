$(document).ready(function(){
	$("#addRushees").click(addRushees);
});

function addRushees(){
	for(i = 0; i < 5; i++){
		game.frat.rushees.push(create_member(game.frat.rep));
	}
	updateStatsBar();
}