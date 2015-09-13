define(['utils/vector2'], function(Vector2){
	
	var Rectangle = function(x, y, width, height, rotation, originX, originY){
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
		this.rotation = rotation || 0;
		this.originX = originX || 0;
		this.originY = originY || 0;
	};
	
	Rectangle.prototype.draw = function(context, outline){
		outline = outline || false;
		
		// Save the current transformation matrix before messing with it
		context.save();
		
		// Remember, multiplied transformation matrices are applied in reverse order!
		context.translate(this.x, this.y);               // Final positioning
		context.rotate(this.rotation);                   // We're rotating the canvas, not the rectangle - so we go the opposite way
		context.translate(-this.originX, -this.originY); // Initial translation to rotate about the origin
		
		if (outline){
			context.strokeRect(0, 0, this.width, this.height);
		} else {
			context.fillRect(0, 0, this.width, this.height);
		}
		
		// Reset the transformation matrix back to how it was initially
		context.restore();
	};
	
	// Gets an array of Vector2 containing the corners of this rectangle.
	// Order: top-left, top-right, bottom-left, bottom-right (when not rotated).
	Rectangle.prototype.getCorners = function(){
		var position = new Vector2(this.x, this.y);
		return [
			Vector2.add(position, Vector2.rotate(new Vector2(-this.originX, -this.originY), this.rotation)),
			Vector2.add(position, Vector2.rotate(new Vector2(-this.originX, this.height-this.originY), this.rotation)),
			Vector2.add(position, Vector2.rotate(new Vector2(this.width-this.originX, -this.originY), this.rotation)),
			Vector2.add(position, Vector2.rotate(new Vector2(this.width-this.originX, this.height-this.originY), this.rotation))
		];
	};
	
	// Tests whether this rectangle collides with otherRect. Compatible with rotated rectangles.
	Rectangle.prototype.collidesWith = function(otherRect){
		// Rather than checking pixels, use the separating axis theorem to detect if there's a lack of collision
		var collides = true;
		
		var axes = [
            Vector2.fromComponents(this.width, this.rotation),
            Vector2.fromComponents(this.height, this.rotation + 0.5 * Math.PI),
            Vector2.fromComponents(otherRect.width, otherRect.rotation),
            Vector2.fromComponents(otherRect.height, otherRect.rotation + 0.5 * Math.PI),
        ];
		
		// Find corners of both rectangles
		var corners = this.getCorners(),
			otherCorners = otherRect.getCorners();
		
		for (var i in axes){
			var axis = axes[i];
			
			// Project the corners onto the axis and find the dot products. Keep the highest and lowest for each rectangle.
			var highDot = null,
				lowDot = null,
				otherHighDot = null,
				otherLowDot = null;
			
			for (var i = 0; i < 4; i++){
				var dot = Vector2.project(corners[i], axis).dot(axis),
					otherDot = Vector2.project(otherCorners[i], axis).dot(axis);
				
				if (highDot === null || dot > highDot){
					highDot = dot;
				}
				if (lowDot === null || dot < lowDot){
					lowDot = dot;
				}
				
				if (otherHighDot === null || otherDot > otherHighDot){
					otherHighDot = otherDot;
				}
				if (otherLowDot === null || otherDot < otherLowDot){
					otherLowDot = otherDot;
				}
			}
			
			// Compare dot products. If both sets are separate, no collision.
			if (otherLowDot > highDot || otherHighDot < lowDot){
				// Clear axis found, no collision!
				collides = false;
				break;
			}
		}
		
		return collides;
	};
	
	return Rectangle;
});