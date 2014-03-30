var shotSound = KE.createElement({
	src: 'mfx/laser_shooting.wav'
}, 'audio');

shotSound.volume = 0.3;

Player = function(params) {

	var impulse = 5,
		cooldown = 25,
		cooldownTimer = 0;

	this.__proto__ = new KE.Pawn({
		img: 'gfx/player.png',
		position: { x: 15, y: 14 },
		resititution: 0.8,
		density: 1,
		friction: 0.5,
		categoryBits: 2, 
		maskBits: 4,
		animationData: {
			endFrame: 15,
			framesX: 4,
			framesY: 4
		}
	}, this);
	
	this.body.SetLinearDamping(1.5);

	this.die = function() {
		new Explosion(this.body.GetPosition());
		this.__proto__.die();
	}

	this.shoot = function() {
		this.animate({
			interval: 100,
			startFrame: 4,
			endFrame: 7,
			runOnce: true
		});

		var position = this.body.GetPosition();

		new Shot({ 
			x: position.x - 1.7,
			y: position.y + 0.35
		});

		shotSound.play();
	}
	
	this.update = function() {
		
		this.__proto__.update();
		
		var position = this.body.GetPosition();

		if( cooldownTimer > 0 ) cooldownTimer--;

		for( var key in KE.keyPress ) {
			switch( key ) {
				case '32':
					if( cooldownTimer === 0 ) {
						this.shoot();
						cooldownTimer = cooldown;
					}
					break;

				case '37':
					console.log('aaa')
					this.body.ApplyImpulse({x:-impulse,y:0}, position)
					break;
			
				case '38':
					this.body.ApplyImpulse({x:0,y:-impulse}, position)
					break;
			
				case '39':
					this.body.ApplyImpulse({x:impulse,y:0}, position)
					break;
			
				case '40':
					this.body.ApplyImpulse({x:0,y:impulse}, position)
					break;
				
			}
		}

		if( position.x < 1.25 ) this.body.m_linearVelocity.x = 1;
		if( position.x > KE.stage.offsetWidth / PPM - 1.25 ) this.body.m_linearVelocity.x = -1;
		if( position.y < 0.7 ) this.body.m_linearVelocity.y = 1;
		if( position.y > KE.stage.offsetHeight / PPM - 0.7 ) this.body.m_linearVelocity.y = -1;

		if( enemy = this.getCollision('enemy') ) {
			enemy.die();
			this.die();
		}				
			
	}

}