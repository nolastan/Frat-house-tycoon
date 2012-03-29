//********************************************************************************************			
// Globals
//********************************************************************************************
var Board = function(frat) {

var   partyRect, studyRect, csRect, rushRect;
var   stage;
var   piecesArray = new Array();
var   first_piece_x, first_piece_y;
const RECT_SCALE_FACTOR = 0.30;
const STAGE_WIDTH_SCALE_FACTOR = 1.6;
const STAGE_HEIGHT_SCALE_FACTOR = 1.4;


//********************************************************************************************
this.update = function() {
	
	
	for (var i = 0; i < piecesArray.length; i++) {
		piecesArray[i].remove();
		delete piecesArray[i];
	}
	
	piecesArray = [];
	for (var i = 0; i < frat.members.length; i++) {
		this.AddPiece(frat.members[i]);
	}
}

//********************************************************************************************

this.DrawPieces = function ()
{
   var x_inc = 0;
   var y_inc = 0;
   var columnCnt = 0;   
   var rowCnt = 0;
   const maxRowInCol = 6;
    
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

this.update_play = function() {
	var play = {};
	play.party = this.MembersInsidePartyRect();
	play.rush = this.MembersInsideRushRect();
	play.cs = this.MembersInsideCsRect();
	play.study = this.MembersInsideStudyRect();
	frat.setPlay(play);
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
	if(stage)
	{
	   stage.clear();
	}
    else
    {
	
	   stage = new Kinetic.Stage("board", 
	                            sg.width, 
	                            sg.height);
    } 

	var boardLayer   = new Kinetic.Layer();
	var messageLayer = new Kinetic.Layer();			
    var partyPicLayer = new Kinetic.Layer();
	var servicePicLayer = new Kinetic.Layer();
	var rushPicLayer = new Kinetic.Layer();
	var studyPicLayer = new Kinetic.Layer();

	// Make the board layers
    partyRect = new Kinetic.Rect({
		x: 10,
		y: 10,
		width: stage.width * RECT_SCALE_FACTOR,
		height: stage.height * RECT_SCALE_FACTOR,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(partyRect);	
	
	csRect = new Kinetic.Rect({
		x: partyRect.x + partyRect.width,
		y: 10,
		width: stage.width * RECT_SCALE_FACTOR,
		height: stage.height * RECT_SCALE_FACTOR,
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
		width: stage.width * RECT_SCALE_FACTOR,
		height: stage.height * RECT_SCALE_FACTOR,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(rushRect);	
	
	studyRect = new Kinetic.Rect({
		x: partyRect.x + partyRect.width,
		y: partyRect.y + partyRect.height,
		width: stage.width * RECT_SCALE_FACTOR,
		height: stage.height * RECT_SCALE_FACTOR,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(studyRect);
	
	stage.add(boardLayer);

	// Add party picture
    var partyImageObj = new Image();
	partyImageObj.onload = function() 
	{
		var image = new Kinetic.Image(
		{
			x: partyRect.x + partyRect.width / 3.75,
			y: partyRect.y + partyRect.height / 2.75,
			image: partyImageObj,
			width: partyRect.width / 5,
			height: partyRect.height / 2
		});
		
		// add the shape to the layer
	    partyPicLayer.add(image);
		
		stage.add(partyPicLayer);		
    };	
	partyImageObj.src = "images/party_icon.png";
	
	// Add service picture
    var serviceImageObj = new Image();
	serviceImageObj.onload = function() 
	{
		var image = new Kinetic.Image(
		{
			x: csRect.x + csRect.width / 3.75,
			y: csRect.y + csRect.height / 2.75,
			image: serviceImageObj,
			width: csRect.width / 3,
			height: csRect.height / 2.5
		});
		
		// add the shape to the layer
	    servicePicLayer.add(image);
		
		stage.add(servicePicLayer);		
    };	
	serviceImageObj.src = "images/cs_icon.png";
	
    // Add rush picture
    var rushImageObj = new Image();
	rushImageObj.onload = function() 
	{
		var image = new Kinetic.Image(
		{
			x: rushRect.x + rushRect.width / 3.25,
			y: rushRect.y + rushRect.height / 2.75,
			image: rushImageObj,
			width: rushRect.width / 3,
			height: rushRect.height / 2.5
		});
		
		// add the shape to the layer
	    rushPicLayer.add(image);
		
		stage.add(rushPicLayer);		
    };	
	rushImageObj.src = "images/rush_icon.png";
		
	// Add study picture
    var studyImageObj = new Image();
	studyImageObj.onload = function() 
	{
		var image = new Kinetic.Image(
		{
			x: studyRect.x + studyRect.width / 3.25,
			y: studyRect.y + studyRect.height / 2.75,
			image: studyImageObj,
			width: studyRect.width / 3,
			height: studyRect.height / 2.5
		});
		
		// add the shape to the layer
	    studyPicLayer.add(image);
		
		stage.add(studyPicLayer);		
    };	
	studyImageObj.src = "images/study_icon.png";

	// Draw the text inside of the rectangles
	stage.add(messageLayer);
	var context = messageLayer.getContext();
	context.font = "bold 18pt Calibri";
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText("Party", partyRect.x + partyRect.width / 2, partyRect.y + partyRect.height / 3.5);
	context.fillText("Community Service", csRect.x + csRect.width / 2, csRect.y + csRect.height / 3.5);
	context.fillText("Rush", rushRect.x + rushRect.width / 2, rushRect.y + rushRect.height / 3.5);
	context.fillText("Study", studyRect.x + studyRect.width / 2, studyRect.y + studyRect.height / 3.5);
	return this;
}

//********************************************************************************************

}