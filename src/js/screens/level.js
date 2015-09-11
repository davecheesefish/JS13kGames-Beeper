define(['utils/classes', 'screens/screen', 'utils/vector2', 'level/truck'], function(ClassUtils, Screen, Vector2, Truck){
	
	var Level = function(){
		// Private
		var items = [];
		
		// Privileged
		this.init = function(){
			// Add test truck
			items.push(new Truck(new Vector2(20, 20), 0.25 * Math.PI));
		};
		
		// Update level items.
		this.update = function(deltaTime){
			for (var i in items){
				items[i].update(deltaTime);
			}
		};
		
		// Draw level items.
		this.draw = function(context){
			for (var i in items){
				items[i].draw(context);
			}
		};
		
	};
	
	// Extends Screen
	ClassUtils.ex(Screen, Level);
	
	
	return Level;
});