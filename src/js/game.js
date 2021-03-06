define(['utils/inputhelper', 'utils/text', 'screens/level', 'screens/gameover'], function(Input, Text, LevelScreen, GameOverScreen){
	
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
			this.draw(canvasContext);
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
				screens[i].update(dT, this);
				if ( ! screens[i].alive){
					deadScreens.push(i);
				}
				// If this screen blocks updates, don't process any more
				if (screens[i].blocksUpdate){
					break;
				}
			}
			
			//Remove any dead screens
			var screensRemoved = 0;
			for (var i in deadScreens){
				// Account for any screens already removed
				screens.splice(deadScreens[i] - screensRemoved, 1);
				screensRemoved++;
			}
			
			// Update input states
			Input.update();
		};
		
		// Draw all visible screens.
		this.draw = function(context){
			// Reset transform and clear canvas for drawing
			canvasContext.setTransform(1, 0, 0, 1, 0, 0);
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			
			for (var i in screens){
				screens[i].draw(context);
				// If this screen blocks draw, stop drawing screens
				if (screens[i].blocksDraw){
					break;
				}
			}
			
			context.fillStyle = '#333';
			Text.draw(context, 'Beeper', 15, canvas.height - 25, 2);
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