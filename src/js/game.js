define(['level/level'], function(Level){
	
	var Game = {
		// Level
		lvl: null,
		
		init: function(){
			this.lvl = new Level();
			this.lvl.init(document.getElementById('gc'));
		}
	};
	
	return Game;
});