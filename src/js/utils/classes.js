define(function(){
	
	// Utility functions for dealing with class-based structures.
	var Classes = {
		// Inherit parent's properties onto child
		ex: function(parent, child){
			child.prototype = new parent();
			child.prototype.constructor = child;
		}
	}
	
	return Classes;
});