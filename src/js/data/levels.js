define(function(){
	
	/**
	 * Level data file. Each level is an array, containing arrays of object properties.
	 * The first element identifies the object type as listed at the top of screens/level.js.
	 * Other elements will be passed to the constructor in the given order.
	 */
	
	return [
	    [
	     	// Level 1
	        ['T', 200, 100, 1.25 * Math.PI],
	     	['b', 0, 0, 407, 407, 0.25 * Math.PI, 0, 0],
	     	['h', 310, 120, '< Park your truck so that the trailer'],
	     	['h', 346, 138,   'is in the loading bay'],
	     	['h', 310, 400, '< Use the arrow keys to drive'],
	        ['t', 260, 400, 1.75 * Math.PI]
        ]
    ];
});