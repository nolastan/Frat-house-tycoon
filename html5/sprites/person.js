function drawPerson(ctx, x, y, scale, color) {
  ctx.save();
  // apply variables
  ctx.fillStyle = color;
  ctx.translate(x,y);
  ctx.scale(scale/7,scale/7);
  ctx.save();
  
  // head
  ctx.beginPath();
  ctx.arc(18.118,8.159,8.159,0,6.283185307179586,true);
  ctx.closePath();
  ctx.fill();
  // ctx.stroke();
  ctx.restore();
  ctx.save();

  // body
  ctx.beginPath();
  ctx.moveTo(8.472,95.426);
  ctx.bezierCurveTo(8.472,97.95,10.52,100,13.046,100);
  ctx.bezierCurveTo(15.575,100,17.622,97.95,17.622,95.426);
  ctx.lineTo(17.626,57.052);
  ctx.lineTo(19.663,57.052);
  ctx.lineTo(19.65,95.426);
  ctx.bezierCurveTo(19.65,97.95,21.698,100,24.2,100);
  ctx.bezierCurveTo(26.7,100,28.8,97.95,28.8,95.426);
  ctx.lineTo(28.8,29.268);
  ctx.lineTo(30.8,29.268);
  ctx.lineTo(30.8,53.65);
  ctx.bezierCurveTo(30.8,58.553,37.221,58.553,37.21,53.65);
  ctx.lineTo(37.2,28.748);
  ctx.bezierCurveTo(37.2,23.33,34.02,18.02,27.7,18.02);
  ctx.lineTo(9.396,18.012);
  ctx.bezierCurveTo(3.619,18.012,0,22.722,0,28.599);
  ctx.lineTo(0,53.649);
  ctx.bezierCurveTo(0,58.518,6.433,58.518,6.433,53.649);
  ctx.lineTo(6.433,29.27);
  ctx.lineTo(8.481,29.27);
  ctx.lineTo(8.472,95.426);
  ctx.closePath();
  
  ctx.fill();
  // ctx.stroke();
  ctx.restore();
  
  ctx.restore();
};

