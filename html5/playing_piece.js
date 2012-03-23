var PlayingPiece = function(stage, member) 
{
	this.stage = stage;
	this.member = member;
	var boxHeader;
	var boxMain;
	
	this.xLeftPos = function ()
	{
	   //return boxHeader.x;
	   return 10;
	}
	
	this.xRightPos = function ()
	{
	   return boxHeader.x + boxHeader.width;
	}
	
	this.yTopPos = function ()
	{
	   return boxHeader.y;
	}
	
	this.yBottomPos = function ()
	{
	   return boxMain.y + boxMain.height;
	}

	this.drawPiece = function (xPos, yPos)
	{
		var shapesLayer = new Kinetic.Layer();
		var group = new Kinetic.Group({
			draggable: true
		});                
			
		boxHeader = new Kinetic.Rect({
			x: xPos,
			y: yPos,
			width: 90,
			height: 15,					
			fill: "#00CCFF",
			stroke: "black",
			strokeWidth: 1
		});
		
		var headerText = new Kinetic.Text(
		{
			x: boxHeader.x + 2,
			y: boxHeader.y + 2,
			text: "Brian",
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		boxMain = new Kinetic.Rect({
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
			text: "Party Skill: 2.0",
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText2 = new Kinetic.Text(
		{
			x: mainText1.x,
			y: mainText1.y + 12,
			text: "Rush Skill: 3.1",
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText3 = new Kinetic.Text(
		{
			x: mainText2.x,
			y: mainText2.y + 12,
			text: "CS Skill: 2.2",
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		var mainText4 = new Kinetic.Text(
		{
			x: mainText3.x,
			y: mainText3.y + 12,
			text: "Study Skill: 3.7",
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
		boxHeader.on("mouseover", function(){
			document.body.style.cursor = "pointer";
		});
		boxHeader.on("mouseout", function(){
			document.body.style.cursor = "default";
		});
		
		boxMain.on("mouseover", function(){
			document.body.style.cursor = "pointer";
		});
		boxMain.on("mouseout", function(){
			document.body.style.cursor = "default";
		});
		
		group.add(boxHeader);
		group.add(headerText);
		group.add(boxMain);
		group.add(mainText1);   
		group.add(mainText2); 
		group.add(mainText3);   
		group.add(mainText4);  				
		
		
		shapesLayer.add(group);
		stage.add(shapesLayer);
	}
}