
//Class for storing the effect of a turn
function create_effect(values, msg, score) {
	var that = {};
	
	if (values.cash) {
		that.cash = parseInt(values.cash.base) + score*parseInt(values.cash.mult);
	}
	if (values.rep) {
		that.rep = parseInt(values.rep.base) + score*parseInt(values.rep.mult);
	}
	
	if (values.rush) {
		that.rush = parseInt(values.rush.base) + score*parseInt(values.rush.mult);
	}
	
	that.cash = that.cash || 0;
	that.rep = that.rep || 0;
	that.rush = that.rush || 0;
	
	
	that.apply = function(frat) {
		frat.cash += that.cash;
		frat.rep += that.rep;
	}
	
	that.string = function() {
		return msg + "&nbsp;&nbsp;&nbsp;&nbsp;Rep: " + this.rep + " Cash : " + this.cash + " Rush: " + this.rush;
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

//This checks the play against the threshold and returns
//the appropriate effect

//Super class for turns
function Turn(info) {
	var rushCount = 9;
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
	play = frat.getPlayValues();
	var i = 0;
	var effect;
	var rushCount = 9;
	var repMult = 0.6;
	var scoreMult = 0.4;
	
	console.log("Running " + this.title);
	var results = {};
	var rushScore = 0;
	for (var cat in this.categories) {
		curThresh = this.categories[cat];
		effect = curThresh.get_effect(play[cat]);
		rushScore += effect.rush;
		effect.apply(frat);
		results[cat] = effect;
		i++;
	}
	//Need to do something with the rush score here.
	results.rushees = [];
	
	var overallRushScore = repMult*frat.rep + scoreMult*rushScore;
	for (var i = 0; i < rushCount; i++) {
		results.rushees.push(create_member(overallRushScore));
	}
	
	
	return results;
}

/*
======================================================================================
Frat Class


Properties --
	name: name of fraternity
	rep: amount of rep
	cash: amount of cash
	members: array of members objects

Methods --
	display: logs the fraternities name, cash, and number of members

	getPlayValues: returns the play values for each category by adding up the skills of all
		the members who are included in that play

	getSkillAvgs: returns a skills object of the average skills of the fraternity. 
		You can call getNormalized on this to see the relative interests of the frat
	
	getMemberById: takes in an id and returns the member if it is present and false
		otherwise.
		
	addMember: takes a member object and adds it to the members if it's not already present


=======================================================================================
*/
var create_frat = function(spec, members) {
	var that = {};
	spec = spec || {};
	that.name = spec.name || "Sigma Phi Nothing";
	that.rep = spec.rep || 100;
	that.cash = spec.cash || 100;
	that.members = members || [];
	var categories = ["party", "cs", "rush" , "study"];
	
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
		//Calculates the play values by adding up the skills of each member in the
		//category
		
		var thisVal, cat, curMem;
		var playVals = {party:0, cs:0, rush:0, study:0};
		
		//Go through each category
		for (var i = 0; i < categories.length; i++) {
			thisVal = 0;
			cat = categories[i];
			
			//Get the members in that category
			memberArray = play[cat];
			
			//Add up their skill values
			for (var k = 0; k < memberArray.length; k++) {
				curMem = getMemberById(memberArray[k]);
				
				thisVal += curMem.skills[cat];
			}
			playVals[cat] = thisVal;
		}
		
		return playVals;
	}
	
	that.setPlay = function(newPlay) {
		play = newPlay;
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
		
		avgs.party = totals.party/this.members.length;
		avgs.cs = totals.cs/this.members.length;
		avgs.rush = totals.rush/this.members.length;
		avgs.study = totals.study/this.members.length;
		return create_skills(0, avgs);
	}
	
	var getMemberById = function(id) {
		for (var i = 0; i < that.members.length; i++) {
			var member = that.members[i];
			if (member.id == id) {
				return member;
			}
		}
		return false;
	}
	
	that.getMemberById = getMemberById;
	
	that.addMember = function (newMember) {
		if (!this.getMemberById(newMember.id)) {
			this.members.push(newMember);
		}
		return this;
	}
	
	that.numBrothers = function() {
		return that.members.length;
	}
	
	return that;
}

/*
======================================================================================
Skills Class


Properties --
party, cs, rush, study - values corresponding to skill values

Methods --
getNormalized: returns an object of normalized skills, so each adds to one to determine
	relative interests
getAvg: returns the average of the all the categories of skills


=======================================================================================
*/


var create_skills = (function() {
	//Variables for determining distribution of randomly
	//generated skills
	var scorediv = 12;
	var basesd = 2;
	var skillsd = 2;


	function gen_rand_skills(score) {
		//Takes in a score and generates 4 attributes based on it
		
		//First get the mean for the attribute
		var base = (score/scorediv) + basesd*rnd_snd();
		var skills = [];
		for (i = 0; i < 4; i++) {
			var skillval = base + skillsd*rnd_snd();
			skillval = Math.round(skillval);
			if (skillval < 1.5) {
				skillval = 1;
			}
			skills.push(skillval);
		}
		return skills;
	}
	
	function rnd_snd() {
		return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
	}
	

	return function(score, spec) {
		var that = {};
		var categories = ["party", "cs", "rush", "study"];
		
		
		//if a spec isnt passed in, create skills based on score
		if (typeof spec === 'undefined') {
			score = score || 0;
			spec = gen_rand_skills(score);
		} 
		
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
			norm = that.getNormalized();
			//console.log("repprob: " + this);*******
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
	};
})();


/*
======================================================================================
Member Class

Construction --
Creating a member takes in a "specification" object.  This can contain a score and a name object and
a skills object.

The score will determine how good of skills this member will have.
The name object determines the members name
The skills object can predefine skills if you want to prevent random generation.


Properties --
id: Unique identifier for this member
skills: object containing this members skills, i.e. party, cs (community service), rush, study
firstname: member's first name
lastname: member's last name
name: first and last name as one string

Methods -- 
getAge: Returns how many turns this member has been around
incrementAge: Increases this members age by 1
chanceWillJoin: Returns the probability this person will join the given fraternity
	(based on rep and skills)

=======================================================================================
*/

var create_member = (function() {
	//count for determining id
	var count = 0;
	
	//Variables for helping determine joining probability
	//How much the frat's rep weighs in join prob
	var rep_weight = 0.6;
	//How much the similarity in skills weighs in join prob.
	var skill_weight = 0.4;
	//How to mod the rep to determine it's influence
	var rep_divider = 50;

	
	return function(spec) {
		var that = {};
		var age = 0;
		spec = spec || {};
		
		var score = spec.score || 100;
		
		that.skills = create_skills(score, spec.skills);
		//Get name from spec or randomly generate
		var name = spec.name || {};
		that.firstname = name.first || firstnames[Math.floor(Math.random()*firstnames.length)];
		that.lastname = name.last || lastnames[Math.floor(Math.random()*lastnames.length)];
		that.name = that.firstname + " " + that.lastname;
		
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
			mylog("fa", fratAvgs);
			var diff = this.skills.getDifference(fratAvgs);
			//Finally we put this in an exponential decay function
			var skillprob = Math.pow(3, -50*diff);
			
			return repprob*rep_weight + skillprob*skill_weight;
		}
		return that;
	}
})();


function mylog(msg, object) {
	console.log(msg);
	console.log(object);
}


