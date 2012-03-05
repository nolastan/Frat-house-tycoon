var CANVAS_HEIGHT, CANVAS_WIDTH, canvas, ctx, SCALE;
var CANVAS_SCALE_X = 3;
var CANVAS_SCALE_Y = 2;

function updateScreenSize(){
	SCALE = Math.min($(window).width()/CANVAS_SCALE_X, ($(window).height()-90)/CANVAS_SCALE_Y);
	CANVAS_WIDTH = CANVAS_SCALE_X * SCALE;
	CANVAS_HEIGHT = CANVAS_SCALE_Y * SCALE;
	UNIT = Math.round(SCALE / 100);
	console.log(SCALE);
	$("#canvas, #background").attr('width', CANVAS_WIDTH);
	$("#canvas, #background").attr('height', CANVAS_HEIGHT);
}

$(document).ready(function(){
    drawBoard();
    $("#simulation").hide();

	/** declare variables **/
  canvas = document.getElementById("canvas");  
  ctx = canvas.getContext("2d");

  bg = document.getElementById("background").getContext("2d");
  	
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
    simulate2();
    $(this).addClass("disabled");
		$("#fast").removeClass('disabled');
		$("#skip").removeClass('disabled');
  });
  

  
});