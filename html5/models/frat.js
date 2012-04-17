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
	
	setPlay: Sets this frats play to the specified object;


=======================================================================================
*/
var create_frat = function(spec, members) {
    var categories = ["party", "cs", "rush" , "study"];
    var maxAge = 10;
    
	var that = {};
	spec = spec || {};
	that.name = spec.name || "Sigma Phi Nothing";
	that.rep = spec.rep || 100;
	that.cash = spec.cash || 0;
	that.members = members || [];
	that.rushees = [];
	
	that.items = [];
	that.numOfBedrooms = 0;
	
	// item multipliers
	that.itemMult = {'party':1, 'cs':1, 'rush':1, 'study':1};

	
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
	
	that.getPlay= function() {
		return play;
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
	
	//Put all turn by turn changes to apply in here
	that.update = function() {
	    console.log("UPDATED");
        increaseSkills();
        getDues();
        updateAges();
	    
	}
	
	
	//Increases the skills of what a member is doing
	//Right now it's a flat increase, but we may want to change that later
    var increaseSkills = function() {
        var category, curMem, catMems, increase;
	    increase = 4;
		decrease = 1;
	    for (var i = 0; i < categories.length; i++) {
	        category  = categories[i];
	        catMems = play[category];
	        
	        for (var k = 0; k < catMems.length; k++) {
				
	            curMem = getMemberById(catMems[k]);
	            curMem.skills.improve(category);
				PlanView_UpdateSkills(curMem);
	        }
			
	    }
    }
    
    //Get dues every week from members
    var getDues = function(amount) {
        amount = amount || 5;
        that.cash += amount*that.members.length;
    }
    
    var updateAges = function() {
        var curMem;
        for (var i = 0; i < that.members.length; i++) {
            curMem = that.members[i];
            
            curMem.incrementAge();
            
            //If the member is too old, graduate
            if (curMem.getAge() > maxAge) {
                that.members.splice(i, 1);
                console.log(curMem.name + " graduated");
            }
        }
        
    }
	
	that.setPlay = function(newPlay) {
	    console.log(newPlay);
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