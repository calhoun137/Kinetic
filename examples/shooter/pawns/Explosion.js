var sound = Utils.createElement({
	src: 'mfx/boom.ogg'
}, 'audio');

sound.volume = 0.7;

Explosion = function(position) {

	this.__proto__ = new KE.Pawn({
	
		img: 'gfx/explosion.png',
		animationData: {
			interval: 1,
			framesX: 5,
			framesY: 5,
			endFrame: 23,
			runOnce: true
		},
		position: {
			x: position.x - 1,
			y: position.y - 1
		},
		height: 64 / PPM,
		width: 64 / PPM
		
	}, this);		

	this.animate();	
	
	sound.play();

	this.update = function() {
	
		if( !this.isAnimationRunning() ) this.die();
		
		this.__proto__.update();
	}

}
