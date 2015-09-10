define(function(){
	
	var Rectangle = function(x, y, width, height, rotation, originX, originY){
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
		this.rotation = rotation || 0;
		this.originX = originX || 0;
		this.originY = originY || 0;
	};
	
	Rectangle.prototype.draw = function(context, fillStyle){
		// Save the current transformation matrix before messing with it
		context.save();
		
		if (typeof fillstyle !== undefined){
			context.fillStyle = fillStyle;
		}
		
		// Remember, multiplied transformation matrices are applied in reverse order!
		context.translate(this.x, this.y);               // Final positioning
		context.rotate(this.rotation);                   // We're rotating the canvas, not the rectangle - so we go the opposite way
		context.translate(-this.originX, -this.originY); // Initial translation to rotate about the origin
		
		context.fillRect(0, 0, this.width, this.height);
		
		// Reset the transformation matrix back to how it was initially
		context.restore();
	};
	
	return Rectangle;
});