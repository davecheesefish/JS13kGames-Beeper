define(['level/trailer', 'utils/vector2', 'utils/rectangle', 'utils/inputhelper'], function(Trailer, Vector2, Rectangle, Input){
	
	var Truck = function(position, rotation){
		var position = position || new Vector2(),
			rotation = rotation || 0;
		
		var maxSpeed = 60,
			maxAcceleration = 20,
			maxDeceleration = 40,
			turnSpeed = 0.005 * Math.PI,
			speed = 0,
			boundingBox = new Rectangle(position.x, position.y, 30, 16, rotation, 10, 8),
			trailer = new Trailer(position.copy(), rotation);
		
		this.updateBoundingBox = function(){
			boundingBox.x = position.x;
			boundingBox.y = position.y;
			boundingBox.rotation = rotation;
		};
		
		this.update = function(deltaTime){
			if (Input.keyIsPressed(38) && speed < maxSpeed){
				if (speed > 0) {
					speed += maxAcceleration * deltaTime;
				} else {
					speed += maxDeceleration * deltaTime;
				}
			};
			
			if (Input.keyIsPressed(40) && speed > -maxSpeed){
				if (speed > 0) {
					speed -= maxDeceleration * deltaTime;
				} else {
					speed -= maxAcceleration * deltaTime;
				}
			};
			
			// Work out direction to turn
			var turnFactor = 0;
			if (Input.keyIsPressed(37)){
				turnFactor--;
			}
			if (Input.keyIsPressed(39)){
				turnFactor++;
			}
			
			// Do the turning
			rotation += turnFactor * turnSpeed * deltaTime * speed;
			
			var velocity = Vector2.fromComponents(speed, rotation);
			position.add(Vector2.multiply(velocity, deltaTime));
			this.updateBoundingBox();
			
			trailer.towTo(position);
		};
		
		this.draw = function(context){
			context.fillStyle = '#000';
			boundingBox.draw(context);
			
			trailer.draw(context);
		};
	};
	
	return Truck;
});