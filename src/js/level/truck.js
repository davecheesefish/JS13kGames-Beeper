define(['utils/vector2', 'utils/rectangle', 'utils/inputhelper'], function(Vector2, Rectangle, Input){
	
	var Truck = function(position, rotation){
		var maxSpeed = 20,
			maxAcceleration = 20;
		
		var position = position || new Vector2(),
			velocity = new Vector2(0, 0),
			rotation = rotation || 0,
			boundingBox = new Rectangle(position.x, position.y, 26, 16, 0, 8, 8);
		
		this.updateBoundingBox = function(){
			var bBox = boundingBox;
			bBox.x = position.x;
			bBox.y = position.y;
			bBox.rotation = rotation;
		};
		
		this.update = function(deltaTime){
			if (Input.keyIsPressed(38) && velocity.length() < maxSpeed){
				velocity.add(Vector2.fromComponents(maxAcceleration * deltaTime, rotation));
			};
			
			position.add(Vector2.multiply(velocity, deltaTime));
			this.updateBoundingBox();
		};
		
		this.draw = function(context){
			boundingBox.draw(context);
		};
	};
	
	return Truck;
});