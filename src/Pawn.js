KE.Pawn = function Pawn(params, _this) {

	this.__proto__ = ( params.animationData ) ? new KE.AnimatedSprite(params) : new KE.Sprite(params);	
	
	KE.pawns[ this.id = KE.generateId() ] = _this || this; 
	
	var isDead = false,
		bodyDef = new Box2D.Dynamics.b2BodyDef,
		fixDef = new Box2D.Dynamics.b2FixtureDef;
	
	bodyDef.type = Box2D.Dynamics.b2Body['b2_' + (params.bodyType || 'dynamic') + 'Body'];

	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
	fixDef.shape.SetAsBox( this.width / ( 2 * PPM ), this.height / ( 2 * PPM ) );

	KE.mergeObj(bodyDef, params);
	KE.mergeObj(fixDef, params);
	
	bodyDef.userData = bodyDef.userData || {} ;
	bodyDef.userData.id = this.id;

	if( params.categoryBits ) fixDef.filter.categoryBits = params.categoryBits;
	if( params.maskBits ) fixDef.filter.maskBits = params.maskBits;

	this.body = KE.World.CreateBody(bodyDef);
	this.fixture = this.body.CreateFixture(fixDef);
	
	this.updateHandlers = {};

	this.update = function() {
		if( !isDead ) {
			for( var i in this.updateHandlers ) 
				this.updateHandlers[i]();
			
			this.setPosition(this.body.GetPosition(), this.body.GetAngle());
		}
	}

	this.die = function() {
		isDead = true;
		KE.pawnsForRemoval.push(this);
		this.drawImage('clear');
		delete KE.pawns[this.id];
	}

	this.getCollision = function(type) {
		if( (collision = this.body.GetContactList()) && collision.other.m_userData && collision.other.m_userData.type === type ) 
			return KE.pawns[collision.other.m_userData.id];
	}

	this.isOutOfBounds = function() {
		var position = this.body.GetPosition();

		return  position.x < 0 || 
				position.y < 0 || 
				position.x > KE.stage.offsetWidth / PPM || 
				position.y > KE.stage.offsetHeight / PPM;
	}
	

}