KE.Background = function Background(params) {

	this.el = Utils.createElement({
		id: 'background_' + ( params.z || -1 ),
		className: 'background',
		style:{
			zIndex: ( params.z || -1 ),
			left: (params.left || 0) + 'px',
			top: (params.top || 0) + 'px'
		},
		width: params.width,
		height: params.height
	});

	var img = new Image,
		ctx = this.el.getContext('2d'),
		x = params.x || 0,
		y = params.y || 0,
		height = width = 0,
		_this = this;

	img.src = params.img;

	img.onload = function() {
		var pattern = ctx.createPattern(img, 'repeat');
		width = img.width;
		height = img.height;
		ctx.fillStyle = pattern;
		ctx.fillRect(0, 0, width, height);
	
		if( params.velocity ) {
			KE.updateHandlers[_this.el.id] = function() {
				_this.translate(params.velocity);
			}
		}
	}

	this.translate = function(vector) {

		x = ( x + (vector.x || 0) ) % width;
		y = ( y + (vector.y || 0) ) % height;

		ctx.clearRect(0, 0, this.el.offsetWidth, this.el.offsetHeight);
		ctx.translate(-x,-y);
		ctx.fillRect(0, 0, width + x, height + y)
		ctx.translate(x,y);
	}


}