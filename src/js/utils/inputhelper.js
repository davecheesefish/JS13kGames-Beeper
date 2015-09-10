define(function(){
	
	// Keeps track of pressed keys for the main game loop
	var InputHelper = new function(){
			var pressedKeys = [];
			
			// Private functions
			var onKeyDown = function(e){
				if (pressedKeys.indexOf(e.keyCode) === -1){
					pressedKeys.push(e.keyCode);
				}
			};
			
			var onKeyUp = function(e){
				var index = pressedKeys.indexOf(e.keyCode);
				if (index !== -1){
					pressedKeys.splice(index, 1);
				}
			};
			
			// Public functions
			// Get whether the specified key is pressed (true) or not (false)
			this.keyIsPressed = function(keyCode){
				return pressedKeys.indexOf(keyCode) !== -1;
			};
			
			// Initialization
			document.addEventListener('keydown', onKeyDown);
			document.addEventListener('keyup', onKeyUp);
	}();
	
	return InputHelper;
});