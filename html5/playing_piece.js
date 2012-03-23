var PlayingPiece = function(stage, member) 
{
	this.stage = stage;
	this.member = member;
	var xPosStart;
	var yPosStart;
	
	//********************************************************************************************

	this.height = function ()
	{
	   return 60;
	}
	
	//********************************************************************************************

	this.width = function ()
	{
	   return this.boxHeader.width;
	}
	
	//********************************************************************************************

	this.xLeftPos = function ()
	{
	   return this.group.x + xPosStart;	   
	}
	
	//********************************************************************************************
	
	this.xRightPos = function ()
	{	   
	   return this.group.x + xPosStart + this.boxHeader.width;
	}
	
	//********************************************************************************************
	
	this.yTopPos = function ()
	{
	   return this.group.y + yPosStart;
	}
	
	//********************************************************************************************

	this.yBottomPos = function ()
	{
	   return this.group.y + yPosStart + this.boxMain.height;
	}

	//********************************************************************************************

	this.getPos = function() {
		return [this.group.x, this.group.y];
	}
	
	//********************************************************************************************

	this.drawPiece = function (xPosIn, yPosIn)
	{
	    xPosStart = xPosIn;
		yPosStart = yPosIn;
		
		var shapesLayer = new Kinetic.Layer();
		var group = new Kinetic.Group({
			draggable: true
		});                
			

		var boxHeader = new Kinetic.Rect({
			x: xPosStart,
			y: yPosStart,
			width: 90,
			height: 15,					
			fill: "#00CCFF",
			stroke: "black",
			strokeWidth: 1
		});
		
		//this.boxHeader = boxHeader;
		
		var headerText = new Kinetic.Text(
		{
			x: boxHeader.x + 2,
			y: boxHeader.y + 2,
			text: member.name,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		

		var boxMain = new Kinetic.Rect({
			x: boxHeader.x,
			y: boxHeader.y + boxHeader.height,
			width: boxHeader.width,
			height: 50,					
			fill: "#99FFFF",
			stroke: "black",
			strokeWidth: 1
		});

		var mainText1 = new Kinetic.Text(
		{
			x: boxMain.x + 2,
			y: boxMain.y + 2,
			text: "Party Skill: " + member.skills.party,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText2 = new Kinetic.Text(
		{
			x: mainText1.x,
			y: mainText1.y + 12,
			text: "Rush Skill:" + member.skills.rush,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText3 = new Kinetic.Text(
		{
			x: mainText2.x,
			y: mainText2.y + 12,
			text: "CS Skill:" + member.skills.cs,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText4 = new Kinetic.Text(
		{
			x: mainText3.x,
			y: mainText3.y + 12,
			text: "Study Skill:" + member.skills.study,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		
		group.add(boxHeader);
		group.add(headerText);
		group.add(boxMain);
		group.add(mainText1);   
		group.add(mainText2); 
		group.add(mainText3);   
		group.add(mainText4);  				
		this.group = group;
		this.boxHeader = boxHeader;
		this.boxMain = boxMain;
		
		shapesLayer.add(group);
		stage.add(shapesLayer);
	}
}