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
  
  
  // Action call
  $("#sim").click(function(){
    simulate(10);
  });
      
  var canvas = document.getElementById("canvas");  
  if (canvas.getContext) {  
    var ctx = canvas.getContext("2d");  
  }
  
  function simulate(rep){
    var sim = new simulation(rep);
    sim.run();
    
    $("#normal").click(function(){
      sim.gameTime.speed = 3;
    });

    $("#fast").click(function(){
      sim.gameTime.speed = 9;
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
    var house = new House();
    this.gameTime = gameTime;
    var partygoers = new Array();
    var partyGoerCount = 0;


    // objects
     function GameTime(){
       /* Keeps track of time, independent of FPS
          and supporting a variable speed. By default,
          ranges 0-100 */
      this.current = 0;
      this.speed = 3;
      this.max = 100;
      this.frame = 0;
      this.update = function(){
        // end simulation if time is up
        if(this.current >= this.max){
          clearInterval(sim);
          alert("sim over");
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
      this.x = 0;
      this.y = 0;
      this.timeOnScreen = 0;
      this.lengthOfStay = 10;
      this.draw = function(x, y){
        if(this.timeOnScreen < this.lengthOfStay){
          this.x++;
          drawPerson(ctx, this.x, this.y, 1, this.color)
          this.timeOnScreen++;        
        }
      }
    }

    function House(){
        // body
		this.draw = function(){
			ctx.save();
			
			ctx.strokeRect(10,10,CANVAS_WIDTH/2,CANVAS_HEIGHT/2)
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

    // Each step
    function step(){
      ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      house.draw();
      
      // ~2x as many partygoers as rep gained
      if(Math.floor(Math.random()*101) < rep / gameTime.max * 100 *2){
        partygoers.push(new Partygoer());
      }
      
      for(i = 0; i < partygoers.length; i++){
        partygoers[i].x = i*30;
        partygoers[i].y = 10;
        partygoers[i].draw();
      }
    }

    this.run = function(){
      console.log("Simulating with rep: " + rep);

      // loop steps (run simulation)
      sim = setInterval(function() {
        gameTime.update();
      }, 1000/FPS);
    }
  }
});

