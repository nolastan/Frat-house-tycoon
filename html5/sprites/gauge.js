function drawGauge(ctx, value) {

    var centerX = 49;
    var centerY = 50;
    var radius = 48;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, value * Math.PI, (1+value) * Math.PI, false);
    ctx.fillStyle = "#0a0";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.closePath();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 1;
    ctx.closePath();
    ctx.stroke();
    
};