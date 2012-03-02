
//********************************************************************************************			
// Globals
//********************************************************************************************
var   INIT_NUM_BROTHERS = 5;
var   numBrothers       = INIT_NUM_BROTHERS;
var   broRectAray;
var   partyRect, studyRect, csRect, rushRect;
var   stage;
var   piecesLayer;
var	  frat = new Frat();

//********************************************************************************************			

// to-do
function getNumOfBros() {
	return frat.members;
}

// to-do
function simulate2() {
	turn = new Turn();
	GetCount();
	turn.run(frat);
	
	update();
}

function update() {
	RemovePieces();
	numBrothers = getNumOfBros();
	DrawPieces();
	
}

//********************************************************************************************			

function GetCount()
{
    partyCount = 0;
	csCount = 0;
	rushCount = 0;
	studyCount = 0;
	for (var n = 0; n < numBrothers; n++)
	{
	    if (broRectAray[n].x                              >  partyRect.x                     &&
	       (broRectAray[n].x + broRectAray[n].width - 1)  < (partyRect.x + partyRect.width)  &&
		    broRectAray[n].y + 1                          >  partyRect.y                     &&
		   (broRectAray[n].y + broRectAray[n].height - 1) < (partyRect.y + partyRect.height))
	    {
	      partyCount = partyCount + 1;
	    }
		else if (broRectAray[n].x                              >  csRect.x                     &&
	       (broRectAray[n].x + broRectAray[n].width - 1)  < (csRect.x + csRect.width)  &&
		    broRectAray[n].y + 1                          >  csRect.y                     &&
		   (broRectAray[n].y + broRectAray[n].height - 1) < (csRect.y + csRect.height))
	    {
	      csCount = csCount + 1;
	    }
		else if (broRectAray[n].x                              >  rushRect.x                     &&
	       (broRectAray[n].x + broRectAray[n].width - 1)  < (rushRect.x + rushRect.width)  &&
		    broRectAray[n].y + 1                          >  rushRect.y                     &&
		   (broRectAray[n].y + broRectAray[n].height - 1) < (rushRect.y + rushRect.height))
	    {
	      rushCount = rushCount + 1;
	    }
		else if (broRectAray[n].x                              >  studyRect.x                     &&
	       (broRectAray[n].x + broRectAray[n].width - 1)  < (studyRect.x + studyRect.width)  &&
		    broRectAray[n].y + 1                          >  studyRect.y                     &&
		   (broRectAray[n].y + broRectAray[n].height - 1) < (studyRect.y + studyRect.height))
	    {
	      studyCount = studyCount + 1;
	    }
	}			
	document.getElementById("partyCount").innerHTML=partyCount;
	document.getElementById("csCount").innerHTML=csCount;
	document.getElementById("rushCount").innerHTML=rushCount;
	document.getElementById("studyCount").innerHTML=studyCount;
	
	frat.play = [partyCount, csCount, rushCount, studyCount];
}

//********************************************************************************************			

function RemovePieces()
{
    for (var n = 0; n < numBrothers; n++) 
	{
	   piecesLayer.remove(broRectAray[n]);				
	}		
	
	piecesLayer.draw();
}

//********************************************************************************************			

function IncrementPieceCount()
{
    RemovePieces();
    numBrothers = numBrothers + 1;			    
	DrawPieces();
}

//********************************************************************************************			

function DrawPieces()
{
    broRectAray = new Array(numBrothers);
	
     // Make the pieces layer
    for (var n = 0; n < numBrothers; n++) 
	{
		// anonymous function to induce scope
		(function()
		{
		    var i = n;
			broRectAray[i] = new Kinetic.Rect({
				x: i * 24 + 10,
                y: 10,
				width: 20,
				height: 20,
				fill: "#00D2FF",
				stroke: "black",
				strokeWidth: 1,
				draggable: true
			});
 
			piecesLayer.add(broRectAray[i]);			
			
		})();                    					
	}
	stage.add(piecesLayer);

}

function drawBoard() 
{
	numBrothers = getNumOfBros();
	stage = new Kinetic.Stage("container", 600, 650);
	var boardLayer   = new Kinetic.Layer();
	piecesLayer      = new Kinetic.Layer();
	var messageLayer = new Kinetic.Layer();				

	// Make the board layer
    partyRect = new Kinetic.Rect({
		x: 0,
		y: 50,
		width: stage.width / 2,
		height: (stage.height-50) / 2,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(partyRect);
	
	csRect = new Kinetic.Rect({
		x: 300,
		y: 50,
		width: stage.width / 2,
		height: (stage.height-50) / 2,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(csRect);	
	
	rushRect = new Kinetic.Rect({
		x: 0,
		y: 350,
		width: stage.width / 2,
		height: (stage.height-50) / 2,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(rushRect);	
	
	studyRect = new Kinetic.Rect({
		x: 300,
		y: 350,
		width: stage.width / 2,
		height: (stage.height-50) / 2,
		//fill: "#00D2FF",
		stroke: "black",
		strokeWidth: 2
	});				
	boardLayer.add(studyRect);	
	
	stage.add(boardLayer);	

	// Draw the "Party" text inside of the Party Rect
	stage.add(messageLayer);
	var context = messageLayer.getContext();
	context.font = "bold 18pt Calibri";
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText("Party", partyRect.width / 2, 50 + (partyRect.height / 2));
	context.fillText("Community Services", 300+partyRect.width / 2, 50 + (partyRect.height / 2));
	context.fillText("Rush", partyRect.width / 2, 50 + (300+partyRect.height / 2));
	context.fillText("Study", 300+partyRect.width / 2, 50 + (300+partyRect.height / 2));
	DrawPieces();
	

}