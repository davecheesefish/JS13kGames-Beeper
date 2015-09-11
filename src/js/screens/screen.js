define(function(){
	// Base class for game screens.
	var Screen = function(){
		this.alive = true;
	};
	
	// Sets a screen to be removed. Override to perform any teardown (removing event listeners, etc.)
	Screen.prototype.kill = function(){
		this.alive = false;
	}
	
	return Screen;
});