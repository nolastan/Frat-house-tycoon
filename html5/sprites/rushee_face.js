function drawRusheeFace(ctx, x, y, scale, eye_color, hair_color, hair_style, skin_color) {
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
  
  ctx.fill();
  // ctx.stroke();
  ctx.restore();
  
  ctx.restore();
};

