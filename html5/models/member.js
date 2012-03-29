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
		
		that.hair_color = hair_color[Math.floor(Math.random()*hair_color.length)];
		that.eye_color = eye_color[Math.floor(Math.random()*eye_color.length)];
		that.hair_style = hair_style[Math.floor(Math.random()*hair_style.length)];
		that.skin_color = skin_color[Math.floor(Math.random()*skin_color.length)];

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
		
		
		that.chanceWillJoin = function() {
			//First we get the component based solely on rep
			var repscore = game.frat.rep / rep_divider;
			
			//This is a logistic decay graph which has the probability of joining
			//be 75% if the skill average is the same as the rep divided by the repdivider
			// i.e. 200 rep / 50 = 4, so if this guy's avg skill is 4, he will join 75% of the
			// time
			var repprob = 1 - (1/(1 + Math.pow(3, -this.skills.getAvg() + repscore + 1)));
			
			//Next we get the component based on how similar their interests are
			
			//First we get the sum of the frat avg scores
			var categories = ["party", "cs", "rush", "study"];
			var fratAvgs = game.frat.getSkillAvgs();
			var diff = this.skills.getDifference(fratAvgs);
			//Finally we put this in an exponential decay function
			var skillprob = Math.pow(3, -50*diff);
			
			return repprob*rep_weight + skillprob*skill_weight;
		}
		
		that.facial_expression = function(){
			if(that.chanceWillJoin > 80) return 5;
			else if(that.chanceWillJoin > 60) return 4;
			else if(that.chanceWillJoin > 40) return 3;
			else if(that.chanceWillJoin > 20) return 2;
			else return 1;
		}
		
		return that;
	}
})();

function bidRushee(id){
	var rushee = game.frat.rushees[id];
	var accepted;
	game.frat.bids--;
	
	if(Math.random() < rushee.chanceWillJoin()){
		game.frat.members.push(rushee);
		accepted = true;
	}else{	
		accepted = false;
	}
	delete game.frat.rushees[id];
	updateStatsBar();
	
	if(game.frat.bids == 0 || Object.size(game.frat.rushees) == 0){
		$("nav.bidMeeting").addClass("over");
		$("#bidScreen .rushees li button").unbind("click");
		game.frat.bids = 0;  			
	}
	
	return accepted;
}