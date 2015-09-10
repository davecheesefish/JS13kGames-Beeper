define(['utils/vector2', 'level/truck'], function(Vector2, Truck){
	
	// Normalise proprietary RAF implementations
	var requestAnimFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame;
	
	var Level = function(){
		
		// Private
		var items = [],
			rafHandle,
			element,
			drawContext,
			lastUpdate;
		
		// Context-bound RequestAnimationFrame callback
		var onRaf = (function(timestamp){
				var delta = (typeof lastUpdate == 'undefined') ? 0 : (timestamp - lastUpdate) / 1000;
				lastUpdate = timestamp;
				
				this.update(delta);
				this.draw(drawContext);
				requestAnimFrame(onRaf);
			}).bind(this);
		
		// Privileged
		this.init = function(canvasEl){
			element = canvasEl;
			drawContext = canvasEl.getContext('2d');
			rafHandle = requestAnimFrame(onRaf);
			
			items.push(new Truck(new Vector2(20, 20), 0.25 * Math.PI));
		};
		
		this.release = function(){
			window.cancelAnimationFrame(rafHandle);
		};
		
		this.update = function(deltaTime){
			for (var i in items){
				items[i].update(deltaTime);
			}
		};
		
		this.draw = function(context){
			// Reset transform and clear canvas for drawing
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, element.width, element.height);
			
			for (var i in items){
				items[i].draw(context);
			}
		};
		
	};
	
	
	
	
	return Level;
});