KE.AnimatedSprite = function AnimatedSprite(params) {
	
	this.__proto__ = new KE.Sprite(params);

	var _this = this,
		isAnimationRunning = false,
		timer = 0,
		currentFrame = params.animationData.startFrame || 0,
		animationData = KE.mergeObj({
			timer: 0,
			interval: 5,
			startFrame: 0,
			endFrame: 0,
			framesX: 1,
			framesY: 1,
			runOnce: false
		}, params.animationData);

	this.__proto__.width = this.img.width / animationData.framesX;
	this.__proto__.height = this.img.height / animationData.framesY;

	var runAnimation = function() {
		if( isAnimationRunning ) 
			timer = setTimeout(runAnimation, animationData.interval);

		_this.setAnimationFrame(currentFrame);
		
		if( ++currentFrame > animationData.endFrame ) 
			if( animationData.runOnce ) 
				_this.stopAnimation();
		 	else 
				currentFrame = animationData.startFrame;
	}

	this.setAnimationFrame = function(pFrame) {
		currentFrame = pFrame;
		this.__proto__.aX = (currentFrame % animationData.framesX) * this.width;
		this.__proto__.aY = ((currentFrame / animationData.framesX) | 0) * this.height;
	}

	this.animate = function(pAnimationData) {
		this.setAnimationFrame(KE.mergeObj(animationData, pAnimationData).startFrame);
		isAnimationRunning = true;
		runAnimation(); 
	}

	this.stopAnimation = function() {
		clearTimeout(timer);
		isAnimationRunning = false;
		this.setAnimationFrame(0);
	}


	this.isAnimationRunning = function() {
		return isAnimationRunning;
	}

}