$(document).ready(function(){
  
  // Action call
  $("#sim").click(function(){
    simulate(10);
  })

  // setup the canvas
  var CANVAS_WIDTH = 480;
  var CANVAS_HEIGHT = 320;
  var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                        "' height='" + CANVAS_HEIGHT + "'></canvas>");
  var canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');
  
  // game variables
  var partygoers = new Array();
  var timeInDay = 300;
 
  // images
  var partyGoerImg = new Image();
  partyGoerImg.src = "sprites/player.png";
  var houseImg = new Image();
  houseImg.src = "sprites/imgres.jpg";
  
  // Simulate!
  function simulate(rep){
    
    console.log("Simulating with rep: +" + rep)
    
    var intervalLength = timeInDay / rep;
    var interval = 0;
    
    var FPS = 30;
    setInterval(function() {
      
      if(interval > timeInDay){
        stop();
      }
      
      // ---- Update ---- \\
      if(interval % intervalLength == 0){
        partygoers.push(partyGoer());
      }
      for(i = 0; i < partygoers.length; i++){
        partygoers[i].x += i;
      }
        
      // ---- Draw ---- \\
      canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // draw new frame
      house.draw();
      for(i = 0; i < partygoers.length; i++){
        partygoers[i].draw();
      }
      
      interval++;
      
    }, 1000/FPS);
  }
  
  
  // game objects
  function partyGoer(I){
    I = I || {}
    I.sprite = partyGoerImg;
    I.x = 10;
    I.y = 10;
    I.draw = function(){
      canvas.drawImage(this.sprite, this.x, this.y);      
    }
    return I;
  }
    
  var house = {
    color: "#00A",
    x: 120,
    y: 10,
    width: 32,
    height: 32,
    sprite: houseImg,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.drawImage(this.sprite, this.x, this.y);
    }
  };  
  

});


