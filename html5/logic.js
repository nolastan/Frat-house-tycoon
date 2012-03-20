
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
	
	//**This needs to be changed, play should have arrays of brothers
  //Private play object to store allocation of brothers
	var play = { party: [],
								cs: [],
								rush: [],
								study: []};
	
	
	//Basic display funciton
	that.display = function() {
		console.log(that.name + "- Cash: " + that.cash + " Rep: " + that.rep + " Members:" + that.members);
	}
	
	
	that.get_play = function() {
		return play;
	}
	
	that.getSkillTotals = function() {
		var totals = {party: 0, cs: 0, rush: 0, study:0};
		for (var i = 0; i < this.members.length; i++) {
			var member = this.members[i];
			totals.party += member.skills.party;
			totals.cs += member.skills.cs;
			totals.rush += member.skills.rush;
			totals.study += member.skills.study;
		}
		return totals;
	}
	
	that.getSkillAvgs = function() {
		var avgs = {};
		var totals = this.getSkillTotals();
		
		avgs.party = totals.party/members.length;
		avgs.cs = totals.cs/members.length;
		avgs.rush = totals.rush/members.length;
		avg.study = totals.study/members.length;
		return avgs;
	}
	
	var getMemberById = function(id) {
		for (var i = 0; i < this.members.length; i++) {
			var member = this.members[i];
			if (member.id == id) {
				return member;
			}
		}
		return -1;
	}
	
	that.getMemberById = getMemberById;
	return that;
}

var create_member = (function() {
	var count = 0;
	var rep_weight = 0.6;
	var skills_weight = 0.4;
	var base_acceptance = 0.5;
	var rep_divider = 50;

	
	return function(skills) {
		var that = {};
		var age = 0;
		that.skills = skills;
		that.id = count++;
		that.getAge = function () {
			return age;
		}
		
		that.incrementAge = function() { 
			age = age + 1;
			return this;
		}
		
		var avgSkill = function() {
			var sum = skills.party + skills.cs + skills.rush + skills.study;
			return sum/4;
		}
		
		
		that.chanceWillJoin = function(frat) {
			//First we get the component based solely on rep
			var repscore = frat.rep / rep_divider;
			
			//This is a logistic decay graph which has the probability of joining
			//be 75% if the skill average is the same as the rep divided by the repdivider
			// i.e. 200 rep / 50 = 4, so if this guy's avg skill is 4, he will join 75% of the
			// time
			var repprob = 1 - (1/(1 + Math.pow(3, -avgSkill() + repscore + 1)));
			
			//Next we get the component based on how similar their interests are
			
			//First we get the sum of the frat avg scores, and this members skills
			var categories = ["party", "cs", "rush", "study"];
			var fratAvgs = frat.getSkillAvgs();
			var fsum = 0, msum = 0, cat;
			for (int i = 0; i < categories.length; i++) {
				cat = categories[i];
				fsum += fratAvgs[cat];
				msum += skills[cat];
			}
			
			//Then we normalize the values and square their differences
			var diff = 0, fnorm, mnorm;
			for (int i = 0; i < categories.length; i++) {
				cat = categories[i];
				fnorm = fratAvgs[cat]/fsum;
				mnorm = skills[cat]/msum;
				diff += Math.pow(fnorm - mnorm, 2);
			}
			
			//Finally we put this in an exponential decay function
			var skillprob = Math.pow(3, -50*diff);
			
			return repprob*rep_weight + skillprob*skill_weight;
		}
		return that;
	}
})();



