function drawSkillsChart(ctx, rushee){
	var myColor = ["#9E352C","#E6E8A9","#2E5A5C","#93C28C"];
	var myData = [rushee.skills.rush, rushee.skills.party, rushee.skills.cs, rushee.skills.study];
	var lastend = 0;
	
	var myTotal = 0;
	for (var j = 0; j < myData.length; j++) {
		myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
	}
	
/* 	ctx.clearRect(0, 0, 200, 200); */
	ctx.save();
	ctx.scale(.25*.8, .25*.8);
	for (var i = 0; i < myData.length; i++) {
		ctx.fillStyle = myColor[i];
		ctx.beginPath();
		ctx.moveTo(200,200);
		ctx.arc(200,200,200,lastend,lastend+
		  (Math.PI*2*(myData[i]/myTotal)),false);
		ctx.lineTo(200,200);
		ctx.fill();
		lastend += Math.PI*2*(myData[i]/myTotal);
	}
	ctx.restore();
}