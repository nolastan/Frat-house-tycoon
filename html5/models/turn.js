//Class representing turns
var create_turn = function (info) {

	that = {};
	var rushCount = 9;
	var info = info || events[Math.floor(Math.random()*events.length)];
	that.title = info.descript;
	that.categories = {};
	
	for (category in info.categories) {
		that.categories[category] = create_threshold(info.categories[category]);
	}
	
	that.getThresholds = function() {
		return [this.partyThresh, this.csThresh, this.rushThresh, this.studyThresh];
	}
	
	that.run = function(frat) {
		var play = frat.getPlayValues();
		var i = 0;
		var effect;
		var rushCount;
		var repMult = 0.6;
		var scoreMult = 0.4;
		
		console.log("Running " + this.title);
		var results = {};
		var rushScore = 0;
		for (var cat in this.categories) {
			curThresh = this.categories[cat];
			effect = curThresh.get_effect(play[cat]);
			rushCount += effect.rush;
			effect.apply(frat);
			results[cat] = effect;
			i++;
		}
		
		// Add bids after Rush
		if(info.descript == "Rush Weekend"){
			game.frat.bids += 10;
		}
		
		
		return results;
	}
	
	
	return that;
}

//Class for determining what reward a play gets
var create_threshold = function(spec) {
	var that = {};
	
	that.get_effect = function(score) {
		var i = 0;
		for (i = spec.cutoffs.length - 1; i >= 0; i--) {
			if (score >= parseInt(spec.cutoffs[i])) {
				return create_effect(spec.rewards[i], spec.msgs[i], score);
			}
		}
		return create_effect({}, "Nothing happened", score);
	}

	return that;
}


//Class for storing the effect of a turn
function create_effect(values, msg, score) {
	var that = {};
	values = values || {};
	if (values.cash) {
		that.cash = parseInt(values.cash.base) + score*parseInt(values.cash.mult);
	}
	if (values.rep) {
		that.rep = parseInt(values.rep.base) + score*parseInt(values.rep.mult);
	}
	
	if (values.rush) {
		that.rush = Math.round(parseInt(values.rush.base) + score*parseInt(values.rush.mult));
	}
	
	that.cash = that.cash || 0;
	that.rep = that.rep || 0;
	that.rush = that.rush || 0;
	
	
	that.apply = function(frat) {
		frat.cash += that.cash;
		frat.rep += that.rep;
		
		for (var i = 0; i < that.rush; i++) {
			var rushee = create_member(frat.rep);
		    frat.rushees[rushee.id] = rushee;
			PlanView_AddPiece(rushee);
		}
	}
	
	that.string = function() {
		return msg + "&nbsp;&nbsp;&nbsp;&nbsp;Rep: " + this.rep + " Cash : " + this.cash + " Rush: " + this.rush;
	}
	
	return that;
}