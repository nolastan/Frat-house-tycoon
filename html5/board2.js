//********************************************************************************************			
// Globals
//********************************************************************************************
var Board = function() {

var   partyRect, studyRect, csRect, rushRect;
var   stage;
var   piecesArray = new Array();
var   first_piece_x, first_piece_y;

//********************************************************************************************

this.AddPiece = function (new_member)
{
   var piece = new PlayingPiece(stage, new_member);  
   piece.drawPiece(first_piece_x, first_piece_y);
   piecesArray.push(piece);   
}   

//********************************************************************************************

this.getPiecesArray = function() {
	return piecesArray;
}

//********************************************************************************************	

this.IsPieceInsidePartyRect = function (member)
{
   var returnVal = false;
   
   for(var i=0; i<piecesArray.length; i++)
   {
	   var value = piecesArray[i];
	   if(member.id == value.member.id)
	   {
	      returnVal = IsPieceInsideRect(value, partyRect);
	   }
   }
   
   return returnVal;
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
	
	//console.log("height"+CANVAS_HEIGHT);
	//console.log("width"+CANVAS_WIDTH);
	
	//stage = new Kinetic.Stage("container", CANVAS_WIDTH*0.98, CANVAS_HEIGHT-100);
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


this.inRect = function(piece, rect) {
	//Can check if piece is in certain rect in this function
	 return true;
}
}