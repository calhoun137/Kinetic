Shot = function(position) {
	
		this.__proto__ =  new KE.Pawn({
			img:'gfx/shot.png', 
			bodyType: 'dynamic',
			position: {
				x: position.x+2,
				y: position.y
			},
			linearVelocity: { x:30, y: 0 },
			categoryBits: 8,
			maskBits: 4
		}, this);
		
		this.body.SetBullet(true);
	
		this.update = function() {
		
			if( this.isOutOfBounds() ) {
				this.die();
				console.log('hhh')
			}

			if( enemy = this.getCollision('enemy') ) {
				enemy.die();
				this.die();
			}				
			
			this.__proto__.update();
		}

}
