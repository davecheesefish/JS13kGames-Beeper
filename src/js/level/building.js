define(['utils/rectangle', 'utils/vector2'], function(Rectangle, Vector2){
	var Building = function(x, y, w, h, angle, originX, originY){
		var boundingBox = new Rectangle(x, y, w, h, angle, originX, originY);
		
		this.getBoundingBox = function(){
			return boundingBox;
		};
		
		this.update = function(){
			// Update child objects
		};
		
		this.draw = function(context){
			context.fillStyle = '#000';
			boundingBox.draw(context);
		};
	};
	
	return Building;
});