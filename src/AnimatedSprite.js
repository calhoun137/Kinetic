KE.AnimatedSprite = function AnimatedSprite(params) {

	this.__proto__ = new KE.Sprite(params);

	var id = Utils.generateId(),
		_this = this,
		width = params.width * PPM,
		height = params.height * PPM,
		animationData = {
			timer: 0,
			interval: 5,
			startFrame: 0,
			endFrame: 0,
			framesX: 1,
			framesY: 1,
			runOnce: false
		};

	Utils.mergeObj(animationData, params.animationData);

	var currentFrame = animationData.startFrame;

	var runAnimation = function() {
		if( animationData.timer++ > animationData.interval ) {
			animationData.timer = 0;

			_this.setAnimationFrame(currentFrame);
			
			if( ++currentFrame > animationData.endFrame ) 
				if( animationData.runOnce ) 
					_this.stopAnimation();
			 	else 
					currentFrame = animationData.startFrame;
			
		}
	}

	this.setAnimationFrame = function(pFrame) {
		currentFrame = pFrame;
		this.__proto__.aX = (currentFrame % animationData.framesX) * width;
		this.__proto__.aY = ((currentFrame / animationData.framesX) | 0) * height;
	}

	this.animate = function(pAnimationData) {
		Utils.mergeObj(animationData, pAnimationData);
		this.setAnimationFrame(animationData.startFrame);
		KE.updateHandlers[id] = runAnimation;
	}

	this.stopAnimation = function() {
		animationData.timer = 0;
		delete KE.updateHandlers[id];
	}


	this.isAnimationRunning = function() {
		return !!KE.updateHandlers[id];
	}


}