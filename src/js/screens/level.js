define(['level/truck', 'level/building', 'utils/classes', 'screens/screen', 'utils/vector2', 'data/levels'], function(Truck, Building, ClassUtils, Screen, Vector2, levelData){
	
	var levelObjects = {
		'b': Building,
		't': Truck
	};
	
	var Level = function(){
		// Private
		var items = [],
			levelNo;
		
		// Privileged
		this.init = function(lvlNo){
			var lvl = lvlNo || 0;
			this.load(lvl);
		};
		
		// Loads a level from the saved levels
		this.load = function(lvlNo){
			// Reset level items array
			items = [];
			
			// Insert default buildings around the edge
			items.push(new Building(-20, -20, 1064, 30));
			items.push(new Building(-20, 566, 1064, 30));
			items.push(new Building(-20, 0, 30, 576));
			items.push(new Building(0, 1014, 30, 576));
			
			// Get saved level data from levelData array
			var data = levelData[lvlNo];
			
			for (var obj in data){
				var objData = data[obj];
				
				// Hack using bind() to call a constructor with an array of arguments
				var newObj = new (Function.prototype.bind.apply(levelObjects[objData[0]], objData))();
				items.push(newObj);
			}
			
			levelNo = lvlNo;
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