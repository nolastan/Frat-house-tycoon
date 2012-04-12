var planViewPlay = {};
planViewPlay.party = new Array();
planViewPlay.rush = new Array();
planViewPlay.cs = new Array();
planViewPlay.study = new Array();
var firstDraw = true;

//************************************************************************************

function PlanView_UpdateSkills(member)
{
   $("#planScreen #member_" + member.id + " .skills .rush .fill").css("width", member.skills.rush + "%");
   $("#planScreen #member_" + member.id + " .skills .party .fill").css("width", member.skills.party + "%");
   $("#planScreen #member_" + member.id + " .skills .cs .fill").css("width", member.skills.cs + "%");
   $("#planScreen #member_" + member.id + " .skills .study .fill").css("width", member.skills.study + "%");   
}

//************************************************************************************

function PlanView_RemovePiece(id)
{
   $("#planScreen #member_"+id).remove();
}

//************************************************************************************

function PlanView_AddPiece(member)
{
    var html = "";
	var ctx;
			
	html += '<li class="member" id="member_' +member.id + '"';
	html += ' draggable="true"';
	html += ' ondragstart="return dragStart(event)"';
	html += ' ondragend="return dragEnd(event)">';
	html += '<p class="name">' + member.name + '</p>';
	html += '<canvas height="100" width="100" class="face"></canvas>';
	html += '<ul class="skills">';
	html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.rush + '%"></div></div></li>';
	html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.party + '%"></div></div></li>';
	html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.cs + '%"></div></div></li>';
	html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.study + '%"></div></div></li>';
	html += '</ul>';
	html += "</li>";
	$("#planScreen .members.pool").append(html);
	
	ctx = $("#member_"+member.id+" .face")[0];
	drawRusheeFace(ctx.getContext("2d"), member.eye_color, member.hair_color, member.hair_style, member.skin_color);
	updateStatsBar();
}

//************************************************************************************

function PlanView_UpdatePlay()
{
    game.frat.setPlay(planViewPlay);
}

//************************************************************************************

function dragStart(ev) 
{
	ev.dataTransfer.effectAllowed='move';
	ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
	ev.dataTransfer.setDragImage(ev.target,0,0);
	return true;
}

//************************************************************************************

function dragEnd(ev) 
{
	ev.dataTransfer.clearData("Text");
	return true
}

//************************************************************************************

function dragEnter(ev) 
{
	var idelt = ev.dataTransfer.getData("Text");
	return true;
}

//************************************************************************************

function dragOver(ev) 
{
    var idelt = ev.dataTransfer.getData("Text");
    var id = ev.target.getAttribute('id');    

    if(id == "partyQuad" ||
       id == "rushQuad" ||
       id == "csQuad" ||
       id == "studyQuad")
    {
       console.log(id);
       return false;  
    }
    else
    {
      return true;
    }    
}

//************************************************************************************

function dragDrop(ev, quadrant) 
{
	var idelt = ev.dataTransfer.getData("Text");
	
	// Track what quadrant members are dropped in
	// using the planViewPlay variable 
	// ***********************************************
	// Get the member id of playing piece being dropped
	var split = idelt.split("_");
	var id = parseInt(split[1]);
	
	// If the playing piece is moved from another quadrant
	// remove the member id from the array of id's for that
	// quadrant in planViewPlay
	PlanView_RemoveId(id);
	
	// Add the member id of the playing piece being dropped
	// in the appropriate array in planViewPlay
	if(quadrant == "rushQ")
	{
	   planViewPlay.rush.push(id);		   
	}
	else if(quadrant == "partyQ")
	{
	   planViewPlay.party.push(id);
	}
	else if(quadrant == "csQ")
	{
	   planViewPlay.cs.push(id);
	}
	else if(quadrant == "studyQ")
	{
	   planViewPlay.study.push(id);
	}
	
	console.log(planViewPlay);
	   
	ev.target.appendChild(document.getElementById(idelt));
	ev.stopPropagation();
	return false; // return false so the event will not be propagated to the browser
}

//************************************************************************************

function PlanView_RemoveId(id)
{
    // If the playing piece was in the Party quadrant
	// remove the id from the party array of planViewPlay
    for(var i = 0; i < planViewPlay.party.length; i++)
    {
	    if(planViewPlay.party[i] == id)
	    {
		    planViewPlay.party.splice(i,1);
		    return;
	    }
    }
   
    // If the playing piece was in the Rush quadrant
	// remove the id from the rush array of planViewPlay
    for(var i = 0; i < planViewPlay.rush.length; i++)
    {
	    if(planViewPlay.rush[i] == id)
	    {
		    planViewPlay.rush.splice(i,1);
		    return;
	    }
    }
   
    // If the playing piece was in the service quadrant
	// remove the id from the cs array of planViewPlay
    for(var i = 0; i < planViewPlay.cs.length; i++)
    {
	    if(planViewPlay.cs[i] == id)
	    {
		    planViewPlay.cs.splice(i,1);
		    return;
	    }
    }
   
    // If the playing piece was in the Academics quadrant
	// remove the id from the study array of planViewPlay
    for(var i = 0; i < planViewPlay.study.length; i++)
    {
	    if(planViewPlay.study[i] == id)
	    {
		    planViewPlay.study.splice(i,1);
		    return;
	    }
    }	   
}

//************************************************************************************

function drawPlanningScreen(){
	game.nextTurn = game.turns.getNext();

	$(".screens").hide();
	$("nav.bidMeeting").hide();
	$("nav.main").show();
	$("#menu").hide();
	$("#planScreen").show();
	$("#normal").hide();
	$("#fast").hide();
	$("#skip").hide();
	$("#run").show();
	$("#nextTurn").html(game.nextTurn.title);
  	$("#screens button").removeClass("active");
  	$("#screens .board button").addClass("active"); 

	if(firstDraw)
	{
		for(key in game.frat.members){
			console.log(key);
			var member = game.frat.members[key];
			var html = "";
			var ctx;
					
			html += '<li class="member" id="member_' +member.id + '"';
			html += ' draggable="true"';
			html += ' ondragstart="return dragStart(event)"';
			html += ' ondragend="return dragEnd(event)">';
			html += '<p class="name">' + member.name + '</p>';
			html += '<canvas height="100" width="100" class="face"></canvas>';
			html += '<ul class="skills">';
			html += '<li class="rush"><object data="sprites/rush_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.rush + '%"></div></div></li>';
			html += '<li class="party"><object data="sprites/party_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.party + '%"></div></div></li>';
			html += '<li class="cs"><object data="sprites/cs_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.cs + '%"></div></div></li>';
			html += '<li class="study"><object data="sprites/study_icon.svg" type="image/svg+xml"></object><div class="bar"><div class="fill" style="width:' + member.skills.study + '%"></div></div></li>';
			html += '</ul>';
			html += "</li>";
			$("#planScreen .members.pool").append(html);
			
			ctx = $("#member_"+member.id+" .face")[0];
			drawRusheeFace(ctx.getContext("2d"), member.eye_color, member.hair_color, member.hair_style, member.skin_color);
		}
		
		firstDraw = false;
		updateStatsBar();
	}
}

//************************************************************************************

$(document).ready(function(){
	$("#run").click(function(){simulate()});	
});