define(['utils/vector2', 'utils/rectangle', 'utils/inputhelper'], function(Vector2, Rectangle, Input){
	
	var Truck = function(position, rotation){
		var maxSpeed = 60,
			maxAcceleration = 20,
			maxDeceleration = 30,
			turnSpeed = 0.005 * Math.PI;
		
		var position = position || new Vector2(),
			speed = 0,
			rotation = rotation || 0,
			boundingBox = new Rectangle(position.x, position.y, 26, 16, 0, 8, 8);
		
		this.updateBoundingBox = function(){
			var bBox = boundingBox;
			bBox.x = position.x;
			bBox.y = position.y;
			bBox.rotation = rotation;
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
		};
		
		this.draw = function(context){
			boundingBox.draw(context);
		};
	};
	
	return Truck;
});