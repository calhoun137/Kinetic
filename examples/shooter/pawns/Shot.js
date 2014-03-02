Shot = function(position) {
	
		this.__proto__ =  new KE.Pawn({
			img:'gfx/shot.png', 
			bodyType: 'dynamic',
			position: {
				x: position.x+2,
				y: position.y
			},
			height: 19 / PPM,
			width: 18 / PPM,
			linearVelocity: { x:30, y: 0 },
			categoryBits: 8,
			maskBits: 4
			
		}, this);
		
		this.body.SetBullet(true);
	
		this.update = function() {
		
			// if( this.outOfBounds() ) this.die();

			if( collision = this.body.GetContactList() ) {
				if( collision.other.m_userData && collision.other.m_userData.type === 'enemy' ) {
					// new Explosion(collision.other.GetPosition());
					KE.pawns[collision.other.m_userData.id].die();
					this.die();
				}
			}				
			
			this.__proto__.update();
		}

}
