function simulate(play, results){
  game.sim = new simulation(play, results);
  document.getElementById('container').style.display = "none";
  document.getElementById('results').style.display = "none";
  document.getElementById('simulation').style.display = "block";

  game.sim.run();
  
}
  
	/** -----------------
	
	BEGIN SIMULATION OBJECT
	
	----------------- **/

function simulation(play, results){


  // game variables
  var FPS = 30;
  var intervalsPerDay = 100;
  var sim; //  simulation loop
  var party = play.party;
  var philanthropy = play.cs;
  var rush = play.rush;
  var result;
  var gameTime = new GameTime();
  this.gameTime = gameTime; // having scoping issues
  var people = new Array();
  var partyGoerCount = 0;
  
  
  // public access to private functions
  this.end = function() { endSim();}
	// resizing{
	$(window).resize(function(){
		game.house.draw();
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
  
  Partygoer.prototype = new PersonViz();
  Partygoer.prototype.constructor = Partygoer;
  Partygoer.superclass = PersonViz.prototype;
  function Partygoer(){
  	this.construct();
    this.color = "blue";
  }

  Rushee.prototype = new PersonViz();
  function Rushee(){
  	this.construct();
    this.color = "red";
  }

  Philanthropist.prototype = new PersonViz();
  function Philanthropist(){
  	this.construct();
    this.color = "green"
  }

  // Each step
  function step(){


    // Generate people
    if(Math.floor(Math.random()*101) < party / gameTime.max * 100 *10){
      people.push(new Partygoer());

    }

    // Generate rushees
    if(Math.floor(Math.random()*101) < rush / gameTime.max * 100 *10){
    	people.push(new Rushee());

    }

    // Generate philanthropists
    if(Math.floor(Math.random()*101) < philanthropy / gameTime.max * 100 *10){
      people.push(new Philanthropist());
    }


    for(i = 0; i < people.length; i++){
      people[i].step();
      }


  }
	function endSim(){
	  	clearInterval(sim);
		drawBidScreen(results);
      console.log("sim over");
	var msg = "";
	document.getElementById("philanthropyMessage").innerHTML = results['cs'].string();
	document.getElementById("rushMessage").innerHTML = results['rush'].string();
	document.getElementById("partyMessage").innerHTML = results['party'].string();
	document.getElementById("studyMessage").innerHTML = results['study'].string();
	  game.board.update();
      document.getElementById('normal').className = 'disabled';
      document.getElementById('fast').className = 'disabled';
      document.getElementById('skip').className = 'disabled';
      document.getElementById('results').style.display = "block";
  		document.getElementById('simulation').style.display = "none";
	}

  this.run = function(){
  console.log("sim starting");

    // loop steps (run simulation)
      game.house.draw();
      game.sidewalk.draw();
      sim = setInterval(function() {
        sg.ctx.clearRect(0,0,sg.width,sg.height);
        for(i = 0; i < people.length; i++){
          for(j = 0; j < gameTime.speed; j++){
	          for(k = 0; k < game.UNIT; k++){	  	    
		  	        people[i].move();
	  	        }
          }
  	    people[i].draw();	        
        }
      gameTime.update();
    }, 1000/FPS);
  }
}


