var create_person_viz = function(spec) {
	var that = {};
	
	
		// shouldn't be hard-coded
    var height = game.UNIT/7*100;
    var width = game.UNIT/7*30;
  
    that.color = "black"
    that.x;
    that.y;
    that.goToY;
    that.goToX = game.house.getDoorX();
    that.timeOnScreen = 0;
    that.lengthOfStay = 30;
	
	//Set variables according to spec
	for (property in spec) {
		if (spec.hasOwnProperty(property)) {
			that[property] = spec[property];
		}
	}
	
    that.construct = function(){
  		if(Math.round(Math.random()) == 0){
  			this.x = -Math.round(width);
  		}else{
  			this.x = Math.round(sg.width + width);
  		}    
		this.y = Math.round(game.sidewalk.getY() + Math.floor(Math.random()*game.sidewalk.getHeight() - height));
	    this.goToY = this.y;
    }

    that.draw = function(x, y){
    	// called each frame
      if(this.timeOnScreen < this.lengthOfStay){
        drawPerson(sg.ctx, this.x, this.y, game.UNIT, this.color)
				// shouldn't be hard-coded
        height = game.UNIT/7*100;
        width = game.UNIT/7*30;
      }
    }

    that.move = function(){
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
    that.step = function(){
    	// called each step
    	if(this.timeOnScreen == this.lengthOfStay){
    		console.log("Goodbye!");
    		people.pop(this);
    	}
  		this.timeOnScreen++;
    }
	
	that.construct();
	
	return that;
}


var create_party_goer = function(spec){
	var that = create_person_viz(spec);
	that.color = "blue";
	return that;
}

var create_rushee = function(spec){
	var that = create_person_viz(spec);
	that.color = "red";
	return that;
}

var create_philanthropist = function(spec){
	var that = create_person_viz(spec);
	that.color = "green";
	return that;
}