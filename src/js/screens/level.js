define(     ['level/target', 'level/truck', 'level/building', 'level/helptext', 'utils/classes', 'screens/screen', 'utils/vector2', 'data/levels'],
	function( Target,         Truck,         Building,         HelpText,         ClassUtils,      Screen,           Vector2,         levelData){
	
	var levelObjects = {
		'b': Building,
		'h': HelpText,
		't': Truck
		/**
		 * Special:
		 * T - Target zone
		 */
	};
	
	var Level = function(){
		// Private
		var items,
			levelNo,
			truck,
			target;
		
		// Private
		var updateCollisions = function(){
			if (truck.getTrailer().getBoundingBox().collidesWith(target.getBoundingBox())){
				target.setTrailerInArea(true);
			} else {
				target.setTrailerInArea(false);
			}
		};
		
		// Privileged
		this.init = function(lvlNo){
			var lvl = lvlNo || 0;
			this.load(lvl);
		};
		
		// Loads a level from the saved levels
		this.load = function(lvlNo){
			// Reset level items array
			items = [];
			truck = undefined;
			target = undefined;
			
			// Insert default buildings around the edge
			items.push(new Building(-20, -20, 1064, 30));
			items.push(new Building(-20, 566, 1064, 30));
			items.push(new Building(-20, 10, 30, 556));
			items.push(new Building(1014, 10, 30, 556));
			
			// Get saved level data from levelData array
			var data = levelData[lvlNo];
			
			for (var obj in data){
				var newObj,
					objData = data[obj];
				
				// Hack using bind() to call a constructor with an array of arguments
				// Not perfect - the first array element is ignored but required anyway.
				switch(objData[0]){
				case 't':
					// Truck
					truck = new (Function.bind.apply(Truck, objData))();
					break;
				case 'T':
					// Target area
					target = new (Function.bind.apply(Target, objData))();
					break;
				default:
					// Hack using bind() to call a constructor with an array of arguments
					items.push(new (Function.bind.apply(levelObjects[objData[0]], objData))());
					break;
				}
			}
			
			levelNo = lvlNo;
		};
		
		// Update level items.
		this.update = function(deltaTime){
			truck.update(deltaTime);
			target.update(deltaTime);
			
			for (var i in items){
				items[i].update(deltaTime);
			}
			
			updateCollisions();
		};
		
		// Draw level items.
		this.draw = function(context){
			target.draw(context);
			truck.draw(context);
			
			for (var i in items){
				items[i].draw(context);
			}
		};
		
	};
	
	// Extends Screen
	ClassUtils.ex(Screen, Level);
	
	
	return Level;
});