//********************************************************************************************			
// Globals
//********************************************************************************************
var Board = function() {

var   partyRect, studyRect, csRect, rushRect;
var   stage;
var   piecesArray = new Array();
var   first_piece_x, first_piece_y;

//********************************************************************************************

this.DrawPieces = function ()
{
   var x_inc = 0;
   var y_inc = 0;
   var columnCnt = 0;   
   var rowCnt = 0;
   const maxRowInCol = 5;
    
   for(var i=0; i<piecesArray.length; i++)
   {
       y_inc =  rowCnt * (piecesArray[i].height() + 10); 
	   x_inc =  columnCnt * (piecesArray[i].width() + 10);
       piecesArray[i].drawPiece(first_piece_x + x_inc, first_piece_y + y_inc);
	   rowCnt++;
	   if(rowCnt == maxRowInCol)
	   {
	      rowCnt = 0;
		  columnCnt++; 
	   }
   }
}

//********************************************************************************************

this.AddPiece = function (new_member)
{   
   var piece = new PlayingPiece(stage, new_member);    
   piecesArray.push(piece);   
}   

//********************************************************************************************

this.getPiecesArray = function() 
{
	return piecesArray;
}

//********************************************************************************************
	
this.MembersInsidePartyRect = function() 
{
   return MembersInsideRect(partyRect);
}

//********************************************************************************************
	
this.MembersInsideRushRect = function() 
{
   return MembersInsideRect(rushRect);
}

//********************************************************************************************
	
this.MembersInsideCsRect = function() 
{
   return MembersInsideRect(csRect);
}

//********************************************************************************************
	
this.MembersInsideStudyRect = function() 
{
   return MembersInsideRect(studyRect);
}

//********************************************************************************************	

var MembersInsideRect = function (rect)
{
   var memberIDArray = new Array();
   
   for(var i=0; i<piecesArray.length; i++)
   {
	   if(IsPieceInsideRect(piecesArray[i], rect))
	   {
		  memberIDArray.push(piecesArray[i].member.id);
	   }	   
   }
   
   return memberIDArray;
}

//********************************************************************************************	

var IsPieceInsideRect = function (piece, quadrant)
{
   var returnVal = false;
   
   if (piece.xLeftPos()        >  quadrant.x                    &&
	  (piece.xRightPos() - 1)  < (quadrant.x + quadrant.width)  &&
       piece.yTopPos() + 1     >  quadrant.y                    &&
	  (piece.yBottomPos() - 1) < (quadrant.y + quadrant.height))
   {
	  returnVal = true;
   }
   
   return returnVal;
}

//********************************************************************************************	

this.DrawBoard = function() 
{
	//numBrothers = game.frat.members;
	//updateScreenSize();
	
	//console.log("height"+sg.height);
	//console.log("width"+sg.width);
	
	//stage = new Kinetic.Stage("container", sg.width*0.98, sg.height-100);
	stage = new Kinetic.Stage("container", 1000, 500);
	var boardLayer   = new Kinetic.Layer();
	var messageLayer = new Kinetic.Layer();				

	// Make the board layers
    partyRect = new Kinetic.Rect({
		x: 10,
		y: 10,
		width: stage.width*0.35,
		height: stage.height*0.35,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(partyRect);
	
	csRect = new Kinetic.Rect({
		x: partyRect.x + partyRect.width,
		y: 10,
		width: stage.width*0.35,
		height: stage.height*0.35,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(csRect);	
	
	first_piece_x = csRect.x + csRect.width + 10;
	first_piece_y = 10;
	
	rushRect = new Kinetic.Rect({
		x: 10,
		y: partyRect.y + partyRect.height,
		width: stage.width*0.35,
		height: stage.height*0.35,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(rushRect);	
	
	studyRect = new Kinetic.Rect({
		x: partyRect.x + partyRect.width,
		y: partyRect.y + partyRect.height,
		width: stage.width*0.35,
		height: stage.height*0.35,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(studyRect);	

	stage.add(boardLayer);	

	// Draw the text inside of the rectangles
	stage.add(messageLayer);
	var context = messageLayer.getContext();
	context.font = "bold 18pt Calibri";
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText("Party", partyRect.x + partyRect.width / 2, partyRect.y + partyRect.height / 2);
	context.fillText("Community Services", csRect.x + csRect.width / 2, csRect.y + csRect.height / 2);
	context.fillText("Rush", rushRect.x + rushRect.width / 2, rushRect.y + rushRect.height / 2);
	context.fillText("Study", studyRect.x + studyRect.width / 2, studyRect.y + studyRect.height / 2);

}

}