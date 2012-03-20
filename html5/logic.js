
//Class for storing the effect of a turn
function Effect(values, msg) {
	this.rep = values[0];
	this.cash = values[1];
	this.members = values[2];
	this.msg = msg;
}

Effect.prototype.apply = function(frat){
	frat.members = frat.members + this.members;
	frat.rep = frat.rep + this.rep;
	frat.cash = frat.cash + this.cash;
}

Effect.prototype.string = function(){
	return this.msg + "&nbsp;&nbsp;&nbsp;&nbsp;Rep: " + this.rep + " Cash : " + this.cash + " Members: " + this.members;
}

//Class for determining what reward a play gets
var create_threshold = function(spec) {
	var that = {};
	
	that.get_effect = function(num) {
	  console.log(num);
		var i = 0;
    for (i = spec.cutoffs.length - 1; i >= 0; i--) {
			if (num >= spec.cutoffs[i]) {
					return new Effect(spec.rewards[i], spec.msgs[i]);
			}
    }
	}
	return that;
}

//This checks the play against the threshold and returns
//the appropriate effect

//Super class for turns
function Turn(info) {
	var info = info || events[Math.floor(Math.random()*events.length)];
	this.title = info.descript;
	this.categories = {};
	
	for (category in info.categories) {
		this.categories[category] = create_threshold(info.categories[category]);
	}
}

Turn.prototype.getThresholds = function() {
	return [this.partyThresh, this.csThresh, this.rushThresh, this.studyThresh];
}

Turn.prototype.run = function(frat) {
	play = frat.get_play();
	var i = 0;
	var effect;
	console.log("Running " + this.title);
	var results = {};
	for (var cat in this.categories) {
		curThresh = this.categories[cat];
		effect = curThresh.get_effect(play[cat]);
		effect.apply(frat);
		results[cat] = effect;
		i++;
	}
	return results;
}

//Function for creating a frat object
var create_frat = function(spec, members) {
	var that = {};
	that.name = spec.name || "Sigma Phi Nothing";
	that.rep = spec.rep || 100;
	that.cash = spec.cash || 100;
	that.members = members || [];
  //Private play object to store allocation of brothers
	var play = { party:0,
								cs: 0,
								rush: 0,
								study: 0};
	
	
	that.display = function() {
		console.log(that.name + "- Cash: " + that.cash + " Rep: " + that.rep + " Members:" + that.members);
	}
	
	
	that.get_play = function() {
		return { party:play.party,
						 cs:play.cs,
						 rush:play.rush,
						 study:play.study};
	}
	
	that.get_skilltotals = function() {
		totals = {party: 0, cs: 0, rush: 0, study:0};
		for (var i = 0; i < this.members.length; i++) {
			member = members[i];
			totals.party += member.skills.party;
			totals.cs += member.skills.cs;
			total.rush += member.skills.rush;
			total.study += member.skills.study;
		}
		return totals;
	}
	return that;
}

var create_member = function(skills) {
	that = {};
	that.skills = skills;
	
	
	return that;
}



