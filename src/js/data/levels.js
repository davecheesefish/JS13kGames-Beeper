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
	     	['b', 430, 430, 206, 206, 0.25 * Math.PI, 0, 0],
	     	['h', 360, 120, '< Park your truck so that the'],
	     	['h', 396, 138,   'trailer is in the loading bay.'],
	     	['h', 396, 165, 'Use the ^|<> arrow keys to drive.'],
	     	['h', 396, 192, 'Press ENTER when you have parked.'],
	        ['t', 280, 410, 1.75 * Math.PI]
        ],
        [
	     	// Level 2
	        ['T', 950, 386, 0.5 * Math.PI],
	     	['b', 0, 0, 350, 400, 0, 0, 0],
	     	['b', 350, 0, 375, 100, 0, 0, 0],
	     	['b', 524, 200, 370, 376, 0, 0, 0],
	     	['h', 380, 130, 'Take corners wide to avoid'],
	     	['h', 380, 148, 'trashing the trailer.'],
	        ['t', 230, 500, 1.95 * Math.PI]
     ]
    ];
});