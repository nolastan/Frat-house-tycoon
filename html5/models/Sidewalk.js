var Sidewalk = function(){
  	var y;
  	var height;
  	
    this.getY = function(){return y;}
    this.getHeight = function(){return height;}
  	
  	this.update = function(){
  		height = 20 * game.UNIT;
  		y = sg.height - (10 * game.UNIT + height);
  	}
  	this.draw = function(){
  		// draw pavement
  	  var img = new Image();
  	  img.src = 'images/concrete.png';
			img.onload = function(){
		    sg.bg.fillStyle = sg.bg.createPattern(img,'repeat');
		    sg.bg.fillRect(0,y,sg.width, height);
	    }
  	}
  	
}