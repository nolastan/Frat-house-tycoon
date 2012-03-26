function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;


var Simulation = function(play, results){
  
  // @TODO how to make these global?
  //Partygoer.prototype = new PersonViz();
  //Rushee.prototype = new PersonViz();
  //Philanthropist.prototype = new PersonViz();

  /* game variables */
  var party = play.party;
  var philanthropy = play.cs;
  var rush = play.rush;
  var gameTime = new GameTime();
  this.gameTime = gameTime; // having scoping issues
  var people = new Array();  
  
  /* public access to private functions */
  this.end = function() { endSim();}
	// resizing{
	$(window).resize(function(){
		game.house.draw();
		console.log('redrawing house');
	});

  /* objects */
   function GameTime(){
     /* Keeps track of time, independent of sg.fps
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
      if(this.frame % Math.round( sg.fps / this.speed ) == 0){
        this.current++;
        step();          
      }
      this.frame++;
    }
  }


  // Each step
  function step(){


    // Generate people
    if(Math.floor(Math.random()*101) < party / gameTime.max * 100 *10){
      people.push(create_party_goer_viz());

    }

    // Generate rushees
    if(Math.floor(Math.random()*101) < rush / gameTime.max * 100 *10){
    	people.push(create_rushee_viz());

    }

    // Generate philanthropists
    if(Math.floor(Math.random()*101) < philanthropy / gameTime.max * 100 *10){
      people.push(create_philanthropist_viz());
    }


    for(i = 0; i < people.length; i++){
	  var person = people[i];
	  if (person.alive) {
		people[i].step();
	  } else {
		people.pop(person);
	  }
      
    }


  }
  // @TODO move these functions into controller and views
	function endSim(){
	  	clearInterval(sim);
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
    }, 1000/sg.fps);
  }
}


