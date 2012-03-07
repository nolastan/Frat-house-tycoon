
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
	return "Result: " +this.msg + "\t\t Rep: " + this.rep + " Cash : " + this.cash + " Members: " + this.members;
}

var effectzz = new Effect([0, 0, 0], "YOu lose");

//Class for determining what reward a play gets
var threshold = function(spec) {
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
	this.thresholds = {};
	for (sector in info.sectors) {
		this.thresholds[sector] = threshold(info.sectors[sector]);
	}
}

Turn.prototype.getThresholds = function() {
	return [this.partyThresh, this.csThresh, this.rushThresh, this.studyThresh];
}

Turn.prototype.run = function(frat) {
	play = frat.play
	var i = 0;
	var effect;
	console.log("Running " + this.title);
	var results = Array();
	for (var threshold in this.thresholds) {
		curThresh = this.thresholds[threshold];
		effect = curThresh.get_effect(play[i]);
		results[i] = effect.string();
		//simulate here
		effect.apply(frat);
		i++;
	}
	console.log(results, play);
	
	simulate(play[0], play[1], play[2], results);
}


var frat = function() {
	var that = {};
	that.name = "Sigma Phi Nothing";
	that.rep = 100;
	that.cash = 100;
	that.members = 10;
	that.play = [0, 0, 0, 0]; // partyCount, csCount, rushCount, studyCount
	
	that.display = function() {
		console.log(that.name + "- Cash: " + that.cash + " Rep: " + that.rep + " Members:" + that.members);
	}
	return that;
}



