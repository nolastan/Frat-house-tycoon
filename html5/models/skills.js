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
	var basesd = 3;
	var skillsd = 5;
	var maxSkillVal = 100;
	var minSkillVal = 2;


	function gen_rand_skills(score) {
		//Takes in a score and generates 4 attributes based on it
		
		//First get the mean for the attribute
		var base = (score/scorediv) + basesd*rnd_snd();
		var skills = [];
		for (i = 0; i < 4; i++) {
			var skillval = base + skillsd*rnd_snd();
			skillval = Math.round(skillval);
			if (skillval < minSkillVal) {
				skillval = minSkillVal;
			}
			if (skillval > maxSkillVal) {
			    skillval = maxSkillVal;
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
		
		that.improve = function(category, increase, decrease) {
			increase = increase || 4;
			decrease = decrease || 1;
			var cat;
			for (var i = 0; i < categories.length; i++) {
				cat = categories[i];
				if (cat == category) {
					that[cat] += increase;
					if (that[cat] >= maxSkillVal) that[cat] = maxSkillVal;
				} else {
					that[cat] -= decrease;
					if (that[cat] <= minSkillVal) that[cat] = minSkillVal;
				}	
			}
			
			
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