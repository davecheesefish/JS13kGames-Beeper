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
	        ['t', 260, 400, 1.75 * Math.PI]
        ]
    ];
});