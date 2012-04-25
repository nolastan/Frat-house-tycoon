function drawRusheeFace(ctx, person) {
	ctx.save();
	console.log("Drawing a face with " + person.eye_color + "eyes, " + person.hair_style + " " + person.hair_color + " hair, and " + person.skin_color + " skin");
	ctx.scale(.7, .7);
	ctx.translate(20, 20);
	
	// head
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = person.skin_color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();
 
 	// left eyeball
    ctx.beginPath();
    ctx.arc(32, 35, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();   
    
 	// right eyeball
    ctx.beginPath();
    ctx.arc(68, 35, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();   
    
    // left pupil
    ctx.beginPath();
    ctx.arc(32, 35, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = person.eye_color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();   
    
 	// right pupil
    ctx.beginPath();
    ctx.arc(68, 35, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = person.eye_color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();   
    
	// mouth
    ctx.beginPath();
    ctx.arc(50, 50, 30, .2 * Math.PI, .8 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();
    
    // hair
    if(person.hair_style == "short"){
		ctx.save();
		ctx.scale(1.13, 1.1);
		ctx.translate(7,-1);
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(78,0);
		ctx.lineTo(78,28);
		ctx.lineTo(0,28);
		ctx.closePath();
		ctx.clip();
		ctx.translate(0,0);
		ctx.translate(0,0);
		ctx.scale(1,1);
		ctx.translate(0.362,0.676);
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 4;
		ctx.save();
		ctx.fillStyle = person.hair_color;
		ctx.strokeStyle = "#000000";
		ctx.miterLimit = 10;
		ctx.beginPath();
		ctx.moveTo(0.94,18.062);
		ctx.bezierCurveTo(0.94,18.062,32.823,27.880000000000003,29.907,18.062);
		ctx.bezierCurveTo(26.991,8.244,31.852,14.772000000000002,31.852,14.772000000000002);
		ctx.bezierCurveTo(31.852,14.772000000000002,53.519000000000005,32.133,46.019,20.883000000000003);
		ctx.bezierCurveTo(38.51899999999999,9.633000000000003,55.879999999999995,17.688000000000002,55.879999999999995,17.688000000000002);
		ctx.bezierCurveTo(55.879999999999995,17.688000000000002,69.074,34.911,63.379999999999995,22.411);
		ctx.bezierCurveTo(57.68599999999999,9.911000000000001,75.118,20.731,75.118,20.731);
		ctx.bezierCurveTo(75.118,20.731,41.974,-22.954,0.94,18.062);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		ctx.restore();
	}
    else if(person.hair_style == "spiked"){
		ctx.save();
		ctx.scale(1.11, 1.1);
		ctx.translate(10,-10);
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(72,0);
		ctx.lineTo(72,28);
		ctx.lineTo(0,28);
		ctx.closePath();
		ctx.clip();
		ctx.translate(0,0);
		ctx.translate(0,0);
		ctx.scale(1,1);
		ctx.translate(0.78,0.342);
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 4;
		ctx.save();
		ctx.fillStyle = person.hair_color;
		ctx.strokeStyle = "#000000";
		ctx.miterLimit = 10;
		ctx.beginPath();
		ctx.moveTo(34.861,19.549);
		ctx.bezierCurveTo(48.055,19.549,59.971999999999994,21.622,68.508,25.438);
		ctx.lineTo(70,13.938);
		ctx.lineTo(62.5,18.438000000000002);
		ctx.lineTo(62.5,6.188);
		ctx.lineTo(52.61,14.974);
		ctx.lineTo(53.5,2.938);
		ctx.lineTo(44.75,11.549000000000001);
		ctx.lineTo(40,1.438);
		ctx.lineTo(33.486,11.571);
		ctx.lineTo(29.25,1.438);
		ctx.lineTo(23.5,11.549);
		ctx.lineTo(15.5,1.4379999999999988);
		ctx.lineTo(15.5,15.937999999999999);
		ctx.lineTo(7.5,5.437999999999999);
		ctx.lineTo(7.5,18.938);
		ctx.lineTo(0.5,11.437999999999999);
		ctx.lineTo(0.5,26.409);
		ctx.bezierCurveTo(9.079,22.19,21.295,19.549,34.861,19.549);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		ctx.restore();
	}    
	ctx.restore();
};