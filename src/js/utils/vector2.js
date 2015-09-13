define(function(){
	
	// Utility class. Represents a 2D vector.
	var Vector2 = function(x, y){
		this.x = x || 0;
		this.y = y || 0;
	};
	
	
	// Public functions
	// Get the length of this vector.
	Vector2.prototype.length = function(){
		return (Math.sqrt(this.x * this.x + this.y * this.y));
	};
	
	// Get the angle (from the positive x-axis) component of this vector.
	Vector2.prototype.angle = function(){
		return Math.atan2(this.y, this.x);
	};
	
	// Add another vector to this one.
	Vector2.prototype.add = function(vector){
		this.x += vector.x;
		this.y += vector.y;
	};
	
	// Mainly used for debugging. Returns the vector as a human-readable string.
	Vector2.prototype.toString = function(){
		return this.x + ', ' + this.y;
	};
	
	// Returns a new copy of this Vector2's values.
	Vector2.prototype.copy = function(){
		return new Vector2(this.x, this.y);
	};
	
	// Returns true if vector has the same x and y values as this vector.
	Vector2.prototype.equals = function(vector){
		return (vector.x === this.x && vector.y === this.y);
	};
	
	// Returns the dot product of this vector with the other one provided
	Vector2.prototype.dot = function(vector){
		return (this.x * vector.x) + (this.y * vector.y);
	};
	
	
	// Static functions
	// Create a new vector from magnitude and direction
	Vector2.fromComponents = function(mag, dir){
		return new Vector2(mag * Math.cos(dir), mag * Math.sin(dir));
	};
	
	// Add vec1 and vec2, returning the result as a new Vector2
	Vector2.add = function(vec1, vec2){
		return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
	};
	
	// Subtract vec2 from vec1 and return the result as a new Vector2
	Vector2.subtract = function(vec1, vec2){
		return new Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
	};
	
	// Multiply a vector by a given scale factor
	Vector2.multiply = function(vector, factor){
		return new Vector2(vector.x * factor, vector.y * factor);
	};
	
	// Rotate a vector by a given angle
	Vector2.rotate = function(vector, angle){
		var len = vector.length();
		var ang = vector.angle() + angle;
		return new Vector2(len * Math.cos(ang), len * Math.sin(ang));
	};
	
	// Project a vector onto an axis described by another vector.
	Vector2.project = function(vector, axis){
		var x = axis.x * ((vector.x * axis.x + vector.y * axis.y) / (Math.pow(axis.x, 2) + Math.pow(axis.y, 2))),
			y = axis.y * ((vector.x * axis.x + vector.y * axis.y) / (Math.pow(axis.x, 2) + Math.pow(axis.y, 2)));
		
		return new Vector2(x, y);
	}
	
	
	return Vector2;
});