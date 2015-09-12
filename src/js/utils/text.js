define(function(){
	
	/*
	 * Binary flags representing a 5x5 grid of pixels (top to bottom, then left to right),
	 * converted to base-36 and concatenated to save space.
	 * 
	 * First character is the character to be encoded, final character is a separator. Remaining chars are flags in base-36.
	 * This may look massive, but Closure will combine it all into one compact string during the build.
	 * Unused characters can be commented out to save more space.
	 * 
	 */
	
	var charsTemp = [
	    ' 0'    , // Punctuation
	    '"GVEO' ,
	    '%ANKEP',
		"'IYO"  ,
		'(BHC'  ,
		')C8W0' ,
		',NVNK' ,
		'-2KSQS',
		'.1XJ40',
	    '@BNT4E',
	    '094GTQ', // Numbers
	    '1TH5T' ,
		'2603AH',
		'3B1AJU',
		'43YACI',
		'5IIZLE',
		'695VAA',
		'7ABXY0',
		'86NYY2',
		'95F0RY',
		'A9RMA7', // Letters
		'BJRXRE',
		'C92YWH',
		'DJP1DA',
		'EJRXRL',
		'FJR7O0',
		'G92Z06',
		'HJFM3J',
		'IAYP81',
		'JN7LQ' ,
		'KJFM8H',
		'LJDFS1',
		'MJIFBZ',
		'NJIF6N',
		'O92YWE',
		'PJR7NS',
		'Q92YY7',
		'RJR7PL',
		'S61HV6',
		'TABITS',
		'UIQYPQ',
		'VHIPUK',
		'WJE7HB',
		'XAT6Q9',
		'YA5DE8',
		'ZAZW35',
	];
	
	// Convert into a dictionary. Yes this is insane, but with so many characters it works out smaller than defining an
	// object literal in the first place.
	var chars = {};
	charsTemp.forEach(function(val){chars[val[0]] = parseInt(val.substring(1), 36)});
	
	var Text = {
		// Draws a string of text at position (x, y)
		draw: function(context, str, x, y, size){
			var currentX = x,
				currentY,
				ch;
			
			str = str.toUpperCase();
			
			for (var i in str){
				ch = chars[str[i]];
				
				for (var pixelNo = 24; pixelNo >= 0; pixelNo--){
					// Check if this is the start of a new pixel column and move if so
					if ((pixelNo + 1) % 5 === 0){
						if (pixelNo != 24){
							currentX += size;
						}
						currentY = y;
					}
					
					// Bit mask to find out if we need to draw a pixel here
					var pow = Math.pow(2, pixelNo);
					if (pow & ch){
						context.fillRect(currentX, currentY, size, size);
					}
					
					currentY += size;
				}
				
				currentX += 2 * size;
			}
		}
	};
	
	return Text;
});