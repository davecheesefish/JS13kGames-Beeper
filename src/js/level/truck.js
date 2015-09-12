define(['level/trailer', 'utils/vector2', 'utils/rectangle', 'utils/inputhelper'], function(Trailer, Vector2, Rectangle, Input){
	
	var Truck = function(position, rotation){
		var position = position || new Vector2(),
			rotation = rotation || 0;
		
		var maxSpeed = 60,
			maxAcceleration = 20,
			maxDeceleration = 45,
			friction = 10,
			steeringAngle = 0,
			steeringSpeed = 0.5 * Math.PI,
			maxSteeringAngle = 0.55 * Math.PI,
			steeringCentering = 1 * Math.PI,
			steeringForcePoint = new Vector2(40, 0),
			speed = 0,
			boundingBox = new Rectangle(position.x, position.y, 60, 32, rotation, 16, 16),
			trailer = new Trailer(position.copy(), rotation);
		
		this.updateBoundingBox = function(){
			boundingBox.x = position.x;
			boundingBox.y = position.y;
			boundingBox.rotation = rotation;
		};
		
		this.update = function(deltaTime){
			var speedInput = false;
			if (Input.keyIsPressed(38) && speed < maxSpeed){
				speedInput = true;
				if (speed > 0) {
					speed += maxAcceleration * deltaTime;
				} else {
					speed += maxDeceleration * deltaTime;
				}
			};
			
			if (Input.keyIsPressed(40) && speed > -maxSpeed){
				speedInput = true;
				if (speed > 0) {
					speed -= maxDeceleration * deltaTime;
				} else {
					speed -= maxAcceleration * deltaTime;
				}
			};
			
			// If no throttle/brake is pressed, slow down through friction
			if ( ! speedInput){
				// Make sure friction can't go past 0 speed.
				if (Math.abs(speed) > friction * deltaTime){
					speed -= Math.sign(speed) * friction * deltaTime;
				} else {
					speed = 0;
				}
			}
			
			// Work out direction the steering wheels are pointing
			var steeringInput = false;
			var turnFactor = 0;
			if (Input.keyIsPressed(37)){
				steeringInput = true;
				if (steeringAngle > -maxSteeringAngle + (steeringSpeed * deltaTime)){
					steeringAngle -= steeringSpeed * deltaTime;
				} else {
					steeringAngle = -maxSteeringAngle;
				}
			}
			if (Input.keyIsPressed(39)){
				steeringInput = true;
				if (steeringAngle < maxSteeringAngle - (steeringSpeed * deltaTime)){
					steeringAngle += steeringSpeed * deltaTime;
				} else {
					steeringAngle = maxSteeringAngle;
				}
			}
			
			if ( ! steeringInput){
				// Make sure friction can't go past 0 speed.
				if (Math.abs(steeringAngle) > steeringCentering * deltaTime){
					steeringAngle -= Math.sign(steeringAngle) * steeringCentering * deltaTime;
				} else {
					steeringAngle = 0;
				}
			}
			
			// Do the turning
			rotation += deltaTime * Math.atan((Math.sin(steeringAngle) * speed) / steeringForcePoint.length());
			//rotation += turnFactor * turnSpeed * deltaTime * speed;
			
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