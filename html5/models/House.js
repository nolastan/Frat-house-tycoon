
var House = function(){  
  
  	var height, width, x, y;
  
	this.draw = function(){
		this.update(); 
		// draw grass
		var img = new Image();
		img.src = 'images/grass.png';
		img.onload = function(){
			sg.bg.fillStyle = sg.bg.createPattern(img,'repeat');
			sg.bg.fillRect(0,0,sg.width, sg.height);
		}
		// draw house
		var wood = new Image();
		wood.src = 'images/wood.png';
		wood.onload = function(){
			sg.bg.fillStyle = sg.bg.createPattern(wood,'repeat');
			sg.bg.fillRect(x,y,width,height);	
		}
  	}
  	
  	this.update = function(){
  		height = 100 * game.UNIT;
			width = 100 * game.UNIT;
			x = 75 * game.UNIT;
			y = 10;
  	}
  	
  	this.update(); 
  	
  	// getters
    this.getX = function(){return x;}
    this.getY = function(){return y;}
    this.getHeight = function(){return height;}
    this.getWidth = function(){return width;}
    this.getDoorX = function(){return width/2 + x;}
    this.getDoorY = function(){return height + y;}
    
}