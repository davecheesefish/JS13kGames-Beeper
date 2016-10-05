define(['screens/screen', 'utils/inputhelper', 'utils/text', 'utils/classes'], function(Screen, Input, Text, ClassUtils){
	
	var GameOver = function(level, result){
		var title = result.success ? 'Truck Yeah!' : 'You Trucked That Up',
			titleSize = 7;
		
		this.blocksUpdate = true;
		
		this.update = function(deltaTime, game){
			if (Input.keyJustReleased(13)){
				if (result.success){
					level.loadNext();
				} else {
					level.reset();
				}
				
				this.kill();
			}
		};
		
		this.draw = function(context){
			context.fillStyle = 'rgba(0,0,0,0.6)';
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			
			context.fillStyle = '#333';
			context.fillRect(60, 60, context.canvas.width - 120, context.canvas.height - 120);
			
			context.fillStyle = '#fff';
			Text.draw(context, title, 90, 90, titleSize);
			
			context.fillStyle = '#fff';
			Text.draw(context, 'Score: ' + result.score, 90, 145, 4);
		};
	};
	
	// Extends Screen
	ClassUtils.ex(Screen, GameOver);
	
	return GameOver;
});