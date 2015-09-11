define(['screens/level'], function(LevelScreen){
	
	// Normalise proprietary RAF implementations
	var requestAnimFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame;
	
	// Use a self-executing function instead of an object literal so we can create private variables,
	// which can be minified more effectively.
	var Game = new (function(){
		// Screens currently visible on-screen.
		var screens = [],
			canvas,
			canvasContext,
			lastUpdate,
			rafHandle;
		
		// Context-bound RequestAnimationFrame callback
		var onRaf = (function(timestamp){
			var dT = (typeof lastUpdate == 'undefined') ? 0 : (timestamp - lastUpdate) / 1000;
			lastUpdate = timestamp;
			
			this.update(dT);
			this.draw();
			rafHandle = requestAnimFrame(onRaf);
		}).bind(this);
		
		this.init = function(canvasEl){
			canvas = canvasEl;
			canvasContext = canvas.getContext('2d');
			
			// Load the first screen
			var level = new LevelScreen();
			this.add(level);
			level.init();
			
			requestAnimFrame(onRaf);
		};
		
		// Update all visible screens.
		this.update = function(dT){
			var deadScreens = [];
			// Process in reverse order so the screen drawn on top (last pushed) gets processed first.
			for (var i = screens.length - 1; i >= 0; i--){
				screens[i].update(dT);
				if ( ! screens[i].alive){
					deadScreens.push(i);
				}
			}
			
			//Remove any dead screens
			var screensRemoved = 0;
			for (var i in deadScreens){
				// Account for any screens already removed
				screens.splice(deadScreens[i] - screensRemoved, 1);
				screensRemoved++;
			}
		};
		
		// Draw all visible screens.
		this.draw = function(){
			// Reset transform and clear canvas for drawing
			canvasContext.setTransform(1, 0, 0, 1, 0, 0);
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			
			for (var i in screens){
				screens[i].draw(canvasContext);
			}
		};
		
		// Add a new screen to the stack. 
		this.add = function(screen){
			screens.push(screen);
		};
		
		// Go to a specific screen (kill all current and replace).
		this.go = function(screen){
			for (var i in screens){
				// Call kill() for screens which need to disconnect event listeners.
				screens[i].kill();
			}
			// Replace all screens with the new one.
			screens = [];
		}
	})();
	
	return Game;
});