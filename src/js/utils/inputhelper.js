define(['utils/vector2'], function(Vector2){
	
	// Keeps track of input states for the main game loop 
	var InputHelper = new function(){
		// List of keyboard controls used in the game.
		// preventDefault() will be called only when these keys are pressed.
		var gameKeyControls = [
		    13, // Enter
            37, // Left arrow
            38, // Up arrow
            39, // Right arrow
            40  // Down arrow
        ];
	
		var pressedKeys = [],
			lastPressedKeys = pressedKeys;
		
		// Private functions
		var onKeyDown = function(e){
			// Prevent default action on game controls to avoid clashes between game and browser
			if (gameKeyControls.indexOf(e.keyCode) !== -1){
				e.preventDefault();
			}
			
			if (pressedKeys.indexOf(e.keyCode) === -1){
				pressedKeys.push(e.keyCode);
			}
		};
		
		var onKeyUp = function(e){
			if (gameKeyControls.indexOf(e.keyCode) !== -1){
				e.preventDefault();
			}
			
			var index = pressedKeys.indexOf(e.keyCode);
			if (index !== -1){
				pressedKeys.splice(index, 1);
			}
		};
		
		// Public functions
		// Updates the stored input states.
		this.update = function(){
			lastPressedKeys = pressedKeys;
		};
		
		// Get whether the specified key is pressed (true) or not (false)
		this.keyIsPressed = function(keyCode){
			return pressedKeys.indexOf(keyCode) !== -1;
		};
		
		// Get whether the specified key has just been released
		this.keyJustReleased = function(keyCode){
			return (pressedKeys.indexOf(keyCode) === -1) && (lastPressedKeys.indexOf(keyCode) !== -1);
		};
		
		// Initialization
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
	}();
	
	return InputHelper;
});