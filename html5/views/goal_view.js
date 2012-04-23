var goalScreen;
var goalViewFirstDraw = true;

function GoalView_GetPercentageComplete(goalName, currentVal){
   var divisor = 0;
   var returnVal = 0;
   
   if(goalName == "rush"){
      divisor = game.quest.goal.rush;
   }
   
   if(goalName == "party"){
      divisor = game.quest.goal.party;
   }
   
   if(goalName == "cs"){
      divisor = game.quest.goal.cs;
   }
   
   if(goalName == "study"){
      divisor = game.quest.goal.study;
   }
   
   if(goalName == "rep"){
      divisor = game.quest.goal.rep;
   }
   
   if(goalName == "cash"){
      divisor = game.quest.goal.cash;
   }
   if(goalName == "members"){
      divisor = game.quest.goal.membership;
   }

   if(divisor > 0){   
      returnVal = (currentVal / divisor) * 100;
   }
   
   if(returnVal > 100){
      returnVal = 100;
   }
   
   return returnVal;   
}


$(document).ready(function(){
	goalScreen = $("#goalScreen");
});

function drawGoalScreen(){
  	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#play").hide();	
	$(".screens").hide();
	$("#goalScreen").show();
	$("#buyScreen").hide();
  	$("#screens button").removeClass("active");	  	
	$("#screens .board button").addClass("active"); 
	
	var html = "";
	if(game.isQuest)
	{	   
	   html += '<h2>Quest Goal</h2>';
	   html += '<ul id="goals">'
	   html += '<ul class="skills">';
	   if(game.quest.goal.rush != null){
		   html += '  <li class="rush">'
		   html += '     <p class="name">Rush</p>';
		   html += '     <div class="bar">'
		   html += '        <div class="fill" style="width: ' + GoalView_GetPercentageComplete("rush", game.frat.getSkillAvgs().rush) + '%"></div>';
		   html += '     </div>';
		   html += '  </li>';
	   }
	   if(game.quest.goal.party != null){
		   html += '  <li class="party">'
		   html += '     <p class="name">Party</p>';
		   html += '     <div class="bar">'
		   html += '        <div class="fill" style="width: ' + GoalView_GetPercentageComplete("party", game.frat.getSkillAvgs().party) + '%"></div>';
		   html += '     </div>';
		   html += '  </li>';
	   }
	   if(game.quest.goal.cs != null){
		   html += '  <li class="cs">'
		   html += '     <p class="name">Community Service</p>';
		   html += '     <div class="bar">'
		   html += '        <div class="fill" style="width: ' + GoalView_GetPercentageComplete("cs", game.frat.getSkillAvgs().cs) + '%"></div>';
		   html += '     </div>';
		   html += '  </li>';
	   }
	   if(game.quest.goal.study != null){
		   html += '  <li class="study">'
		   html += '     <p class="name">Academic</p>';
		   html += '     <div class="bar">'
		   html += '        <div class="fill" style="width: ' + GoalView_GetPercentageComplete("study", game.frat.getSkillAvgs().study) + '%"></div>';
		   html += '     </div>';
		   html += '  </li>';
	   }
	   html += '</ul>';
	   if(game.quest.goal.rep != null){
		   html += '  <li id="goal_rep">'
		   html += '     <p class="name">Reputation</p>';
		   html += '     <p class="goalStatus">  ' + GoalView_GetPercentageComplete("rep", game.frat.rep) + '% Complete</p>';
		   html += '  </li>';
	   }
	   if(game.quest.goal.cash != null){
		   html += '  <li id="goal_cash">'
		   html += '     <p class="name">Financial</p>';
		   html += '     <p class="goalStatus">  ' + GoalView_GetPercentageComplete("cash", game.frat.cash) + '% Complete</p>';
		   html += '  </li>';
	   }
	   if(game.quest.goal.membership != null){
		   html += '  <li id="goal_member">'
		   html += '     <p class="name">Membership</p>';
		   html += '     <p class="goalStatus">  ' + GoalView_GetPercentageComplete("membership", game.frat.members.length) + '% Complete</p>';
		   html += '  </li>';
	   }	   
	   
	   html += '</ul>';
	   $("#goalScreen").html(html);		   
	   
	}
	else
	{
	   html += '<h3>No Quest Selected</h3>';
	   $("#goalScreen").html(html);
	}	
}