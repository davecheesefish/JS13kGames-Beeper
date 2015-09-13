define(['utils/text'], function(Text){
	
	var HelpText = function(x, y, str){
		
		this.update = function(){
		};
		
		this.draw = function(context){
			Text.draw(context, str, x, y, 3);
		};
	};
	
	return HelpText;
});