var PlayingPiece = function(stage, member) 
{
	this.stage = stage;
	this.member = member;
<<<<<<< HEAD
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

=======
	this.getPos = function() {
		return [this.group.x, this.boxHeader.y];
	}
	
>>>>>>> origin/dummy
	this.drawPiece = function (xPos, yPos)
	{
		var shapesLayer = new Kinetic.Layer();
		var group = new Kinetic.Group({
			draggable: true
		});                
			
<<<<<<< HEAD
		boxHeader = new Kinetic.Rect({
=======
		this.boxHeader = new Kinetic.Rect({
>>>>>>> origin/dummy
			x: xPos,
			y: yPos,
			width: 90,
			height: 15,					
			fill: "#00CCFF",
			stroke: "black",
			strokeWidth: 1
		});
		
		//this.boxHeader = boxHeader;
		
		var headerText = new Kinetic.Text(
		{
			x: this.boxHeader.x + 2,
			y: this.boxHeader.y + 2,
			text: member.name,
			fontSize: 10,
			fontFamily: "Calibri",
			textFill: "black"                    
		});
		
<<<<<<< HEAD
		boxMain = new Kinetic.Rect({
			x: boxHeader.x,
			y: boxHeader.y + boxHeader.height,
			width: boxHeader.width,
=======
		var boxMain = new Kinetic.Rect({
			x: this.boxHeader.x,
			y: this.boxHeader.y + this.boxHeader.height,
			width: this.boxHeader.width,
>>>>>>> origin/dummy
			height: 50,					
			fill: "#99FFFF",
			stroke: "black",
			strokeWidth: 1
		});
		this.boxMain = boxMain;
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
		
		this.boxHeader.on("mouseover", function(){
			document.body.style.cursor = "pointer";
		});
		this.boxHeader.on("mouseout", function(){
			document.body.style.cursor = "default";
		});
		
		this.boxMain.on("mouseover", function(){
			document.body.style.cursor = "pointer";
		});
		this.boxMain.on("mouseout", function(){
			document.body.style.cursor = "default";
		});
		
		group.add(this.boxHeader);
		group.add(headerText);
		group.add(this.boxMain);
		group.add(mainText1);   
		group.add(mainText2); 
		group.add(mainText3);   
		group.add(mainText4);  				
		this.group = group;
		
		shapesLayer.add(group);
		stage.add(shapesLayer);
	}
}