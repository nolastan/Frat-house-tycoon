function PersonViz(){
	// shouldn't be hard-coded
    var height = game.UNIT/7*100;
    var width = game.UNIT/7*30;
  
    this.color = "black"
    this.x;
    this.y;
    this.goToY;
    this.goToX = game.house.getDoorX();
    this.timeOnScreen = 0;
    this.lengthOfStay = 30;

    this.construct = function(){
  		if(Math.round(Math.random()) == 0){
  			this.x = -Math.round(width);
  		}else{
  			this.x = Math.round(sg.width + width);
  		}    
		this.y = Math.round(game.sidewalk.getY() + Math.floor(Math.random()*game.sidewalk.getHeight() - height));
	    this.goToY = this.y;
    }

    this.draw = function(x, y){
    	// called each frame
      if(this.timeOnScreen < this.lengthOfStay){
        drawPerson(sg.ctx, this.x, this.y, game.UNIT, this.color)
				// shouldn't be hard-coded
        height = game.UNIT/7*100;
        width = game.UNIT/7*30;
      }
    }

    this.move = function(){
    	// called each frame
    	if(this.x > this.goToX) this.x--
    	if(this.x < this.goToX) this.x++;
    	if(this.y > this.goToY) this.y--;
    	if(this.y < this.goToY) this.y++;
    	if(this.x == this.goToX && this.y == this.goToY){
    		this.goToX = Math.floor(Math.random()*(game.house.getWidth()-width) + game.house.getX()); 
    		this.goToY = Math.floor(Math.random()*(game.house.getHeight()-height) + game.house.getY());  
    	}
    }
    this.step = function(){
    	// called each step
    	if(this.timeOnScreen == this.lengthOfStay){
    		console.log("Goodbye!");
    		people.pop(this);
    	}
  		this.timeOnScreen++;
    }
}