define(['utils/vector2', 'utils/rectangle'], function(Vector2, Rectangle){
	
	var Trailer = function(position, rotation){
		var position = position || new Vector2(),
			rotation = rotation || 0;
		
		var pivot = new Vector2(-34, 0);
		
		var boundingBox = new Rectangle(position.x, position.y, 76, 18, rotation, 72, 9);
		
		this.towTo = function(towPos){
			if ( ! towPos.equals(position)){
				var pivotPos = Vector2.add(position, Vector2.rotate(pivot, rotation));
				rotation = (Vector2.subtract(towPos, pivotPos)).angle();
				position = towPos.copy();
				
				this.updateBoundingBox();
			}
		};
		
		this.updateBoundingBox = function(){
			boundingBox.x = position.x;
			boundingBox.y = position.y;
			boundingBox.rotation = rotation;
		};
		
		this.draw = function(context){
			context.fillStyle = '#777';
			boundingBox.draw(context);
		};
	};
	
	return Trailer;
});