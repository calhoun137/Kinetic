Wall = function(params) {
							
	this.__proto__ = new KE.Pawn({
		bodyType: 'static',
		img: 'gfx/walltile.jpg',
		width: params.width,
		height: params.height,
		position: {
			x: params.x,
			y: params.y
		},
		repeatImage: true
	});	
	
}