Enemy = function() {
	
	this.__proto__ = new KE.Pawn({
		img: 'gfx/enemy.png', 
		position:{
			x: (KE.stage.offsetWidth - 1) / PPM, 
			y: Math.random()*(KE.stage.offsetHeight) / PPM
		}, 
		linearVelocity: { x: -10, y: 0 },
		categoryBits: 4,
		maskBits: 8 | 2,
		userData: {
			type: 'enemy'
		}
	}, this);			
	
	this.update = function() {
	
		if( this.isOutOfBounds() ) this.die();
		
		this.__proto__.update();
	
	}

	this.die = function() {
		new Explosion(this.body.GetPosition());
		this.__proto__.die();
	}

}	