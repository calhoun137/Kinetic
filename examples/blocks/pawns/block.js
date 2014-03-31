Block = function(data) {
	
	this.__proto__ = new KE.Pawn({
		id: 'block',
		bodyType: 'dynamic',
		img: 'gfx/firewall.png',
		width: 1,
		height: 1,
		restitution: 0.6,
		friction: 0.1,
		density: 10,
		position: {
			x:data.x,
			y:data.y
		},
		angle: 0,
		linearVelocity: data.velocity,
	});			

}