
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
	spec = spec || {};
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
		console.log(that.name + "- Cash: " + that.cash + " Rep: " + that.rep + " Members:" + that.members.length);
	}
	
	
	that.getPlayValues = function() {	
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
		avgs.study = totals.study/members.length;
		
		return create_skills(avgs);
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
	
	that.addMember = function (newMember) {
		if (!this.getMemberById(newMember.id)) {
			this.members.push(newMember);
		}
		return this;
	}
	
	return that;
}

var create_skills = function(spec) {
	spec = spec || {};
	var that = {};
	var party, cs, rush, study;
	var categories = ["party", "cs", "rush", "study"];
	//Allow spec to be either object or array
	that.party = spec.party || spec[0] || 0;
	that.cs = spec.cs || spec[1] || 0;
	that.rush = spec.rush || spec[2] || 0;
	that.study = spec.study || spec[3] || 0;


	that.getNormalized = function() {
		var total = this.party + this.cs + this.rush + this.study;
		var result = {party:this.party/total, cs:this.cs/total, rush:this.rush/total, study:this.study/total};
		return result;
	}
	
	that.getAvg = function() {
		return (this.party + this.cs + this.rush + this.study)/4;
	}
	
	
	that.getDifference = function(other) {
		//Returns the difference between the normalized values of two skill levels
		var norm, othernorm, diff, cat;
		norm = this.getNormalized();
		othernorm = other.getNormalized();
		diff = 0;
		
		//Add up the squares of the differences of each of the values
		for (var i = 0; i < 4; i++) {
			cat = categories[i];
			diff += Math.pow(norm[cat] - othernorm[cat], 2);		
		}
		
		return diff;
	}
	
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
		
		if (skills.hasOwnProperty("getDifference")) {
			that.skills = skills;
		} else {
			that.skills = create_skills(skills);
		}
		
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
			var repprob = 1 - (1/(1 + Math.pow(3, -this.skills.getAvg() + repscore + 1)));
			
			//Next we get the component based on how similar their interests are
			
			//First we get the sum of the frat avg scores
			var categories = ["party", "cs", "rush", "study"];
			var fratAvgs = frat.getSkillAvgs();
			var diff = this.skills.getDifference(fratAvgs);
			
			//Finally we put this in an exponential decay function
			var skillprob = Math.pow(3, -50*diff);
			
			return repprob*rep_weight + skillprob*skill_weight;
		}
		return that;
	}
})();



