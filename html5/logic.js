
//Class for storing the effect of a turn
function Effect(values, play) {
	this.rep = values[0];
	this.cash = values[1];
	this.members = values[2];
	this.play = play;
}

Effect.prototype.apply = function(frat){
	frat.members = frat.members + this.members;
	frat.rep = frat.rep + this.rep;
	frat.cash = frat.cash + this.cash;
}

Effect.prototype.string = function(){
	return "Rep: " + this.rep + "Cash :" + this.cash + " Members: " + this.members;
}

//Class for determining what reward a play gets
function Threshold(low, med, effects) {
	this.low = low;
	this.med = med;
	this.effects = effects;
}

//This checks the play against the threshold and returns
//the appropriate effect
Threshold.prototype.getEffect = function(play) {
		if (play <= this.low) {
			return new Effect(this.effects[0], play);
		} else if (play <= this.med) {
			return new Effect(this.effects[1], play);
		} else {
			return new Effect(this.effects[2], play);
		}
	}
//Super class for turns
function Turn() {
	this.title = "Normal Week";
	partyEffects = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	this.partyThresh = new Threshold(0, 5, partyEffects);
	this.csThresh = this.partyThresh;
	this.rushThresh = this.partyThresh;
	this.studyThresh = this.partyThresh;
}

Turn.prototype.getThresholds = function() {
	return [this.partyThresh, this.csThresh, this.rushThresh, this.studyThresh];
}

Turn.prototype.run = function(frat) {
	play = frat.play
	var i = 0;
	thresholds = this.getThresholds();
	for (i = 0; i < thresholds.length; i++) {
		curThresh = thresholds[i];
		effect = curThresh.getEffect(play[i]);
		log(this.title + "-->" + effect.string());
		//simulate here
		
		effect.apply(frat);
	}
}

function MardiGrasTurn() {}

MardiGrasTurn.prototype = new Turn();

MardiGrasTurn.prototype.title = "Mardi Gras!";
MardiGrasTurn.prototype.partyThresh = new Threshold(0, 5, [[-5, 0, 0], [2, 0, 0], [3, 0, 0]]);
MardiGrasTurn.prototype.csThresh = new Threshold(0, 2, [[-1, -50, 0], [0, 0, 0], [2, 0, 0]]);
MardiGrasTurn.prototype.rushThresh = new Threshold(0, 5, [[0, 0, 0], [0, 0, 1], [0, 0, 3]]);
MardiGrasTurn.prototype.studyThresh = new Threshold(0, 5, [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

function GLOCrackDown() {}
GLOCrackDown.prototype = new Turn();

GLOCrackDown.prototype.title = "GLO Crackdown";
GLOCrackDown.prototype.partyThresh = new Threshold(0, 5, [[5, 0, 0], [0, 0, -3], [-6, 0, 0]]);
MardiGrasTurn.prototype.csThresh = new Threshold(0, 3, [[0, 0, 0], [0, 0, 0], [3, 0, 0]]);
MardiGrasTurn.prototype.rushThresh = new Threshold(0, 2, [[-1, 0, 0], [-2, 0, 1], [2, 0, 2]]);
MardiGrasTurn.prototype.studyThresh = new Threshold(1, 5, [[-1, 0, 0], [0, 0, 0], [0, 0, 0]]);


function Frat() {
	this.name = "Sigma Phi Nothing";
	this.rep = 100;
	this.cash = 100;
	this.members = 20;
	this.play = [0, 0, 0, 0];
}

Frat.prototype.display = function() {
	log(this.name + "- Cash: " + this.cash + " Rep: " + this.rep + " Members:" + this.members);
}
function log(msg) {
	$(".log").append(msg + "<br>");
}

