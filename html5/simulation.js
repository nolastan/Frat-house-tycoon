function simulate(party, philanthropy, rush, results){
  var sim = new simulation(party, philanthropy, rush, results);
  document.getElementById('container').style.display = "none";
  document.getElementById('simulation').style.display = "block";
  
  $("#normal").click(function(){
    sim.gameTime.speed = 1;
    $(this).addClass("disabled");
    $("#fast").removeClass("disabled");
  });

  $("#fast").click(function(){
    sim.gameTime.speed = 3;
    $(this).addClass("disabled");
    $("#normal").removeClass("disabled");
  });

  $("#skip").click(function(){
  	if(sim.isRunning){
    	sim.end();
  	}
  });

  sim.run();
  
}
  
	/** -----------------
	
	BEGIN SIMULATION OBJECT
	
	----------------- **/

function simulation(party, philanthropy, rush, results){


  // game variables
  this.isRunning = true;
  var FPS = 30;
  var intervalsPerDay = 100;
  var sim; //  simulation loop
  var party;
  var philanthropy
  var rush;
  var result;
  var gameTime = new GameTime();
  this.gameTime = gameTime; // having scoping issues
  var house = new House();
  var sidewalk = new Sidewalk();
  var people = new Array();
  var partyGoerCount = 0;
  
  
  // public access to private functions
  this.end = function(){endSim();}
  
	// resizing{
	$(window).resize(function(){
		house.draw();
		console.log('redrawing house');
	});

  // objects
   function GameTime(){
     /* Keeps track of time, independent of FPS
        and supporting a variable speed. By default,
        ranges 0-100 */
    this.current = 0;
    this.speed = 1;
    this.max = 100;
    this.frame = 0;
    this.update = function(){
      // end simulation if time is up
      if(this.current >= this.max){
        endSim();
      }
      // As speed increases, update time more often
      if(this.frame % Math.round( FPS / this.speed ) == 0){
        this.current++;
        step();          
      }
      this.frame++;
    }
  }


  function House(){  
  
  	var height, width, x, y;
  
		this.draw = function(){
  		this.update(); 
	    // draw grass
  	  var img = new Image();
  	  img.src = 'images/grass.png';
			img.onload = function(){
		    bg.fillStyle = bg.createPattern(img,'repeat');
		    bg.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	    }
	    // draw house
  	  var wood = new Image();
  	  wood.src = 'images/wood.png';
			wood.onload = function(){
		    bg.fillStyle = bg.createPattern(wood,'repeat');
				bg.fillRect(x,y,width,height);	
			}
  	}
  	
  	this.update = function(){
  		height = 100 * UNIT;
			width = 100 * UNIT;
			x = 75 * UNIT;
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
  
  function Sidewalk(){
  	var y;
  	var height;
  	
    this.getY = function(){return y;}
    this.getHeight = function(){return height;}
  	
  	this.update = function(){
  		height = 20 * UNIT;
  		y = CANVAS_HEIGHT - (10 * UNIT + height);
  	}
  	this.update();
  	this.draw = function(){
  		// draw pavement
  	  var img = new Image();
  	  img.src = 'images/concrete.png';
			img.onload = function(){
		    bg.fillStyle = bg.createPattern(img,'repeat');
		    bg.fillRect(0,y,CANVAS_WIDTH, height);
	    }
  	}
  }
  
  function Person(){
		// shouldn't be hard-coded
    var height = UNIT/7*100;
    var width = UNIT/7*30;
  
    this.color = "black"
    this.x;
    this.y;
    this.goToY;
    this.goToX = house.getDoorX();
    this.timeOnScreen = 0;
    this.lengthOfStay = 30;

    this.construct = function(){
  		if(Math.round(Math.random()) == 0){
  			this.x = -Math.round(width);
  		}else{
  			this.x = Math.round(CANVAS_WIDTH + width);
  		}    
  		this.y = Math.round(sidewalk.getY() + Math.floor(Math.random()*sidewalk.getHeight() - height));
	    this.goToY = this.y;
    }

    this.draw = function(x, y){
    	// called each frame
      if(this.timeOnScreen < this.lengthOfStay){
        drawPerson(ctx, this.x, this.y, UNIT, this.color)
				// shouldn't be hard-coded
        height = UNIT/7*100;
        width = UNIT/7*30;
      }
    }

    this.move = function(){
    	// called each frame
    	if(this.x > this.goToX) this.x--
    	if(this.x < this.goToX) this.x++;
    	if(this.y > this.goToY) this.y--;
    	if(this.y < this.goToY) this.y++;
    	if(this.x == this.goToX && this.y == this.goToY){
    		this.goToX = Math.floor(Math.random()*(house.getWidth()-width) + house.getX()); 
    		this.goToY = Math.floor(Math.random()*(house.getHeight()-height) + house.getY());  
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
  
  Partygoer.prototype = new Person();
  Partygoer.prototype.constructor = Partygoer;
  Partygoer.superclass = Person.prototype;
  function Partygoer(){
  	this.construct();
    this.color = "blue";
  }

  Rushee.prototype = new Person();
  function Rushee(){
  	this.construct();
    this.color = "red";
  }

  Philanthropist.prototype = new Person();
  function Philanthropist(){
  	this.construct();
    this.color = "green"
  }

  // Each step
  function step(){


    // Generate people
    if(Math.floor(Math.random()*101) < party / gameTime.max * 100 *1){
      people.push(new Partygoer());

    }

    // Generate rushees
    if(Math.floor(Math.random()*101) < rush / gameTime.max * 100 *1){
    	people.push(new Rushee());

    }

    // Generate philanthropists
    if(Math.floor(Math.random()*101) < philanthropy / gameTime.max * 100 *1){
      people.push(new Philanthropist());
    }


    for(i = 0; i < people.length; i++){
      people[i].step();
      }


  }
	function endSim(){
	  	clearInterval(sim);
      console.log("sim over");
      this.isRunning = false;
      alert(results);
      document.getElementById('sim').className = '';
      document.getElementById('normal').className = 'disabled';
      document.getElementById('fast').className = 'disabled';
      document.getElementById('skip').className = 'disabled';
      document.getElementById('container').style.display = "block";
  		document.getElementById('simulation').style.display = "none";
	}

  this.run = function(){
  console.log("sim starting");
    // loop steps (run simulation)
      house.draw();
      sidewalk.draw();
      sim = setInterval(function() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        for(i = 0; i < people.length; i++){
          for(j = 0; j < gameTime.speed; j++){
	          for(k = 0; k < UNIT; k++){	  	    
		  	        people[i].move();
	  	        }
          }
  	    people[i].draw();	        
        }
      gameTime.update();
    }, 1000/FPS);
  }
}


