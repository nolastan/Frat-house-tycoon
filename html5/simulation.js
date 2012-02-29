$(document).ready(function(){
  
  // Action call
  $("#sim").click(function(){
    simulate(10);
  })

  // setup the canvas
  var CANVAS_WIDTH = 480;
  var CANVAS_HEIGHT = 500;
  var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                        "' height='" + CANVAS_HEIGHT + "'></canvas>");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');
  
  // game variables
  var partygoers = new Array();
  var timeInDay = 300;
  var partygoerLife = 75;
  
  // objects
  function Person(){
  }
  function House(){
    var img = new Image();
    img.src = "sprites/imgres.jpg";
  }
  Partygoer.prototype = new Person();
  function Partygoer(){
    this.draw = function(x, y){
      drawPerson(canvas, x, y, 1, "blue")
    }
  }
  Rushee.prototype = new Person();
  function Rushee(){
    this.name = "bob";
    this.draw = function(x, y){
      drawPerson(canvas, x, y, 1, "red")
    }
  }
  Philanthropist.prototype = new Person();
  function Philanthropist(){
    this.draw = function(x, y){
      drawPerson(canvas, x, y, 1, "green")
    }
  }
  
  // Simulate!
  function simulate(rep){
    
    console.log("Simulating with rep: +" + rep)
    
    var intervalLength = timeInDay / rep;
    var interval = 0;
    
    rushee = new Rushee();
    rushee.draw(10,10);

    
    
    // var FPS = 30;
    // setInterval(function() {
    //   
    //   if(interval > timeInDay){
    //     stop();
    //   }
    //   
    //   // ---- Update ---- \\
    // 
    //   // ---- Draw ---- \\
    //   canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // 
    //   // draw new frame
    //   drawPerson(canvas, 10, 10, 4)
    //   
    //   interval++;
    //   
    // }, 1000/FPS);
  }  

});


