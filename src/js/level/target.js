define(['utils/rectangle'], function(Rectangle){
	
	var Target = function(x, y, angle){
		// Using the same dimensions and origin as the trailer makes it easy to detect how far out it is
		var boundingBox = new Rectangle(x, y, 152, 36, angle, 144, 18);
		
		var animTimer = 0,
			trailerInArea = false;
		
		this.getBoundingBox = function(){
			return boundingBox;
		};
		
		this.setTrailerInArea = function(val){
			trailerInArea = val;
		};
		
		this.update = function(deltaTime){
			animTimer += deltaTime;
		};
		
		this.draw = function(context){
			context.fillStyle = null;
			context.fillStyle = '#3A15A8';
			context.strokeStyle = '#3A15A8';
			context.globalAlpha = trailerInArea ? 1: 0.5 + 0.5 * Math.abs(Math.cos(6 * animTimer));
			context.lineWidth = 3;
			boundingBox.draw(context, !trailerInArea);
			
			context.strokeStyle = null;
			context.globalAlpha = 1;
		};
	};
	
	return Target;
});