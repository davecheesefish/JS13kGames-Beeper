define(function(){
	// Base class for game screens.
	var Screen = function(){
		// Whether this screen blocks screens below from performing updates.
		this.blocksUpdate = false;
		
		// Whether this screen blocks screens below from drawing.
		this.blocksDraw = false;
		
		// Whether this screen should be kept for the next update (true) or discarded (false).
		this.alive = true;
	};
	
	// Sets a screen to be removed. Override to perform any teardown (removing event listeners, etc.)
	Screen.prototype.kill = function(){
		this.alive = false;
	}
	
	return Screen;
});