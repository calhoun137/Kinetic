KE.Background = function Background(params) {

	var img = KE.ImageManager.get(params.img),
		x = params.x || 0,
		y = params.y || 0,
		width = params.width || img.width,
		height = params.height || img.height,
		_this = this;

	this.el = KE.createElement({
		id: 'background_' + ( params.z || -1 ),
		className: 'background',
		style:{
			zIndex: ( params.z || -1 ),
			left: (params.left || 0) + 'px',
			top: (params.top || 0) + 'px'
		},
		width: width,
		height: height
	});

	var ctx = this.el.getContext('2d'),
		pattern = ctx.createPattern(img, 'repeat');

	ctx.fillStyle = pattern;

	if( params.scale ) {
		ctx.scale( params.scale.x || 1, params.scale.y || 1);
	}

	ctx.fillRect(0, 0, width, height);

	this.translate = function(vector) {

		x = ( x + (vector.x || 0) ) % width;
		y = ( y + (vector.y || 0) ) % height;

		ctx.clearRect(0, 0, width, height);
		ctx.translate(-x,-y);
		ctx.fillRect(0, 0, width + x, height + y)
		ctx.translate(x,y);
	}

	if( params.velocity ) {
		KE.updateHandlers[this.el.id] = function() {
			_this.translate(params.velocity);
		}
	}


}