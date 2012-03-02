var CANVAS_HEIGHT;
var CANVAS_WIDTH, canvas, ctx;

function updateScreenSize(){
	CANVAS_WIDTH = $(window).width();
	CANVAS_HEIGHT = $(window).height() - 100;
	$("#canvas").attr('width', CANVAS_WIDTH);
	$("#canvas").attr('height', CANVAS_HEIGHT);
}

function toggleBoard() {
    $("#container").toggle();
    $("#canvas").toggle();
    
}

function simulate(party, philanthropy, rush){
  var sim = new simulation(party, philanthropy, rush);
  sim.run();
  
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
    console.log("not implemented");
  });

  
}

$(document).ready(function(){
    drawBoard();
    $("#container").toggle();
	/** -----------------
	
	Initiate Screen
	
	----------------- **/
	$("#toggle").click(toggleBoard);
	/** declare variables **/
  canvas = document.getElementById("canvas");  
  ctx = canvas.getContext("2d");
	
	/** define functions **/


	
	/** call functions **/
	updateScreenSize();
	
	/** elements beyond the canvas **/
	$(window).resize(function(){
		updateScreenSize();
	});
	
	$("#normal").addClass('disabled');
	$("#fast").addClass('disabled');
	$("#skip").addClass('disabled');
	
	// Action call
  $("#sim").click(function(){
    simulate(10, 10, 10);
    $(this).addClass("disabled");
		$("#fast").removeClass('disabled');
		$("#skip").removeClass('disabled');
  });
});

  
	/** -----------------
	
	BEGIN SIMULATION OBJECT
	
	----------------- **/

function simulation(party, philanthropy, rush){

    // game variables
    var timeInDay = 60;
    var FPS = 30;
    var intervalsPerDay = 100;
    var sim; //  simulation loop
    var party;
    var philanthropy
    var rush;
    var gameTime = new GameTime();
    this.gameTime = gameTime; // having scoping issues
    var house = new House();
    var people = new Array();
    var partyGoerCount = 0;


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
          clearInterval(sim);
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

    function Person(){
      this.color = "black"
      this.x;
      this.y;
      this.goToX = 10;
      this.goToY = 30;
      this.timeOnScreen = 0;
      this.lengthOfStay = 30;

      this.construct = function(){
      	console.log("hello");
    			if(Math.round(Math.random()) == 0){
    				this.y = Math.floor(Math.random()*CANVAS_HEIGHT);
    				this.x = CANVAS_WIDTH;
    			}else{
    				this.x = Math.floor(Math.random()*CANVAS_HEIGHT);
    				this.y = CANVAS_HEIGHT;
    			}    
      }

      this.draw = function(x, y){
      	// called each frame
        if(this.timeOnScreen < this.lengthOfStay){
          drawPerson(ctx, this.x, this.y, 1, this.color)
        }
      }

      this.move = function(){
      	// called each frame
      	if(this.x > this.goToX) this.x--;
      	if(this.x < this.goToX) this.x++;
      	if(this.y > this.goToY) this.y--;
      	if(this.y < this.goToY) this.y++;
      	if(this.x == this.goToX){
      		this.goToX = Math.floor(Math.random()*house.width); 
      		this.goToY = Math.floor(Math.random()*house.height);     		
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

    function House(){
      this.width = CANVAS_WIDTH/2;
      this.height = CANVAS_HEIGHT/2;
    		this.draw = function(){
    	  var ctx = document.getElementById('canvas').getContext('2d');

    	  // create new image object to use as pattern
    	  var img = new Image();
    	  img.src = 'images/grass.png';
    	  img.onload = function(){
    	    // create pattern
    	    var ptrn = ctx.createPattern(img,'repeat');
    	    ctx.fillStyle = ptrn;
    	    ctx.fillRect(0,0,150,150);

    	  }
    			ctx.strokeRect(10,10,this.width,this.height);	
		
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

    function endSim(){
        console.log("sim over");
        $("#sim").removeClass('disabled');
        $("#normal").addClass('disabled');
        $("#fast").addClass('disabled');
        $("#skip").addClass('disabled');
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

    this.run = function(){
      // loop steps (run simulation)
      sim = setInterval(function() {
          ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
          house.draw();
          for(i = 0; i < people.length; i++){
            for(j = 0; j < gameTime.speed; j++){
    	        people[i].move();
            }
    	    people[i].draw();	        
          }
        gameTime.update();
      }, 1000/FPS);
    }
}


