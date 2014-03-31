KE.Sprite = function Sprite(params) {

	var ctx = document.getElementById( params.canvasId || 'pawns' ).getContext('2d'),
		position = {
			x: params.position.x ? params.position.x * PPM : 0,
			y: params.position.y ? params.position.y * PPM : 0
		},
		angle = params.angle || 0,
		_this = this;

	this.img = KE.ImageManager.get(params.img);

	this.width = params.width * PPM || this.img.width;
	this.height = params.height * PPM || this.img.height;
	this.aX = this.aY = 0;

	if( params.repeatImage === true ) {
		var draw = function() { ctx.fillRect(-_this.width/2, -_this.height/2, _this.width, _this.height); }
		ctx.fillStyle = ctx.createPattern(_this.img, 'repeat');
	} else {
		var draw = function() { ctx.drawImage(_this.img, _this.aX, _this.aY, _this.width, _this.height, -_this.width/2, -_this.height/2, _this.width, _this.height); }
	}

	this.drawImage = function(flag) {
		ctx.translate(position.x, position.y);
		ctx.rotate(angle);

		if ( flag === 'clear' ) ctx.clearRect(-_this.width/2 - 1, -_this.height/2 - 1, _this.width + 2, _this.height + 2);
		else draw();

		ctx.rotate(-angle);
		ctx.translate(-position.x, -position.y);			
	}


	this.setPosition = function(pPosition, pAngle) {

		this.drawImage('clear');

		position.x = pPosition.x * PPM;
		position.y = pPosition.y * PPM;
		angle = pAngle;

		this.drawImage();

	}
}


