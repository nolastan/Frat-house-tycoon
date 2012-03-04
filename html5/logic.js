
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

//Class for determining what reward a play gets
function Threshold(cutoffs, effects, msgs) {
	this.cutoffs = cutoffs;
	this.effects = effects;
	this.msgs = msgs;
}

//This checks the play against the threshold and returns
//the appropriate effect
Threshold.prototype.getEffect = function(play) {
    var i = 0;
    for (i = this.cutoffs.length - 1; i <= 0; i--) {
        if (play >= this.cutoffs[i]) {
            return new Effect(this.effects[i], this.msgs[i]);
        }
    }
}
//Super class for turns
function Turn(infoIn) {
    var info = infoIn || TurnTemplateInfo;
	this.title = info.descript;
	this.partyThresh = new Threshold(info.party.cutoffs, info.party.rewards, info.party.msgs);
	this.csThresh = new Threshold(info.cs.cutoffs, info.cs.rewards, info.cs.msgs);
	this.rushThresh = new Threshold(info.rush.cutoffs, info.rush.rewards, info.rush.msgs);
	this.studyThresh = new Threshold(info.study.cutoffs, info.study.rewards, info.study.msgs);
}

Turn.prototype.getThresholds = function() {
	return [this.partyThresh, this.csThresh, this.rushThresh, this.studyThresh];
}

Turn.prototype.run = function(frat) {
	play = frat.play
	var i = 0;
	var effect;
	log("running...");
	thresholds = this.getThresholds();
	log("Running " + this.title);
	for (i = 0; i < thresholds.length; i++) {
		curThresh = thresholds[i];
		effect = curThresh.getEffect(play[i]);
		log(effect.string());
		//simulate here
		
		effect.apply(frat);
	}
}

var MardGrasTurn = new Turn(MardiGrasInfo);
var GLOTurn = new Turn(GLOCrackDownInfo);



function Frat() {
	this.name = "Sigma Phi Nothing";
	this.rep = 100;
	this.cash = 100;
	this.members = 10;
	this.play = [0, 0, 0, 0];
}

Frat.prototype.display = function() {
	log(this.name + "- Cash: " + this.cash + " Rep: " + this.rep + " Members:" + this.members);
}

Frat.prototype.GetNumOfBros = function() {
	return frat.members;
}

function log(msg) {
	$(".log").append(msg + "<br>");
}



