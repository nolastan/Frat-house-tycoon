$(document).ready(function(){
	
	var CANVAS_HEIGHT;
	var CANVAS_WIDTH;
  
	$(window).resize(function(){
		updateScreenSize();
	});
	updateScreenSize();
	function updateScreenSize(){
		CANVAS_WIDTH = $(window).width();
		CANVAS_HEIGHT = $(window).height() - 100;
		$("#canvas").attr('width', CANVAS_WIDTH);
		$("#canvas").attr('height', CANVAS_HEIGHT);
	}
	
	$("#normal").addClass('disabled');
	$("#fast").addClass('disabled');
	$("#skip").addClass('disabled');
  
  
  // Action call
  $("#sim").click(function(){
    simulate(100);
    $(this).addClass("disabled");
		$("#fast").removeClass('disabled');
		$("#skip").removeClass('disabled');
  });
      
  var canvas = document.getElementById("canvas");  
  if (canvas.getContext) {  
    var ctx = canvas.getContext("2d");  
  }
  
  function simulate(rep){
    var sim = new simulation(rep);
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

  function simulation(rep){

    // game variables
    var timeInDay = 60;
    var FPS = 30;
    var intervalsPerDay = 100;
    var sim; // this simulation loop
    var rep;
    var gameTime = new GameTime();
    this.gameTime = gameTime;
    var house = new House();
    var partygoers = new Array();
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
      this.draw = function(x, y){
      	// called each frame
        if(this.timeOnScreen < this.lengthOfStay){
          drawPerson(ctx, this.x, this.y, 1, this.color)
        }
      }
      this.move = function(){
      	// called each frame
      	if(this.x > this.goToX) this.x -= gameTime.speed;
      	if(this.x < this.goToX) this.x += gameTime.speed;
      	if(this.y > this.goToY) this.y -= gameTime.speed;
      	if(this.y < this.goToY) this.y += gameTime.speed;
      }
      this.step = function(){
      	// called each step
      	if(this.timeOnScreen == this.lengthOfStay){
      		console.log("Goodbye!");
      	}
      	if(this.timeOnScreen == 0){
      		console.log("Hello!");
      		if(Math.round(Math.random()) == 0){
	      		this.y = Math.floor(Math.random()*CANVAS_HEIGHT);
	      		console.log(this.y);
	      		this.x = CANVAS_WIDTH;
      		}else{
	      		this.x = Math.floor(Math.random()*CANVAS_HEIGHT);
	      		console.log(this.x);
	      		this.y = CANVAS_HEIGHT;
      		}      	
      	}
    		this.timeOnScreen++;
      }
    }

    function House(){
        // body
		this.draw = function(){
			ctx.save();
			
/*
  			ctx.save();
			ctx.restore();
*/
			ctx.restore();
			ctx.restore();
        }

    }

    Partygoer.prototype = new Person();
    function Partygoer(){
      this.color = "blue";
    }

    Rushee.prototype = new Person();
    function Rushee(){
      this.color = "red";
    }

    Philanthropist.prototype = new Person();
    function Philanthropist(){
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

      
      // ~1x as many partygoers as rep gained
      if(Math.floor(Math.random()*101) < rep / gameTime.max * 100 *1){
        partygoers.push(new Partygoer());
      }
      
      for(i = 0; i < partygoers.length; i++){
        partygoers[i].step();
	    }
	    
	    console.log(gameTime.current);
      
    }

    this.run = function(){
      console.log("Simulating with rep: " + rep);

      // loop steps (run simulation)
      sim = setInterval(function() {
	      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	      house.draw();
				ctx.strokeRect(10,10,CANVAS_WIDTH/2,CANVAS_HEIGHT/2)
	      for(i = 0; i < partygoers.length; i++){
	        partygoers[i].move();
	        partygoers[i].draw();
	      }
        gameTime.update();
      }, 1000/FPS);
    }
  }
});

