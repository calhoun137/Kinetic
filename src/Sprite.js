// TODO: create init function that is triggered when the image loads...automatically compute width/length based on picture...if possible
// can create this.init in KE.Pawn that accepts the input...but then i have the base class calling the parent class which is bad... 
// so no init function?  Just make the client put it in???  Thats bad too.

// alternatively, ill force the user to specify width/height in box2d units and simply scale the image when i draw it.

KE.Sprite = function Sprite(params) {

	var img = new Image,
		ctx = document.getElementById( params.canvasId || 'pawns' ).getContext('2d'),
		position = {
			x: params.position.x ? params.position.x * PPM : 0,
			y: params.position.y ? params.position.y * PPM : 0
		},
		angle = params.angle || 0,
		width = params.width * PPM,
		height = params.height * PPM,
		w = width / 2, 
		h = height / 2,
		_this = this;

	this.aX = this.aY = 0;

	if( params.repeatImage === true ) 
		var draw = function() { ctx.fillRect(-w, -h, width, height); }
	else 
		var draw = function() { ctx.drawImage(img, _this.aX, _this.aY, width, height, -w, -h, width, height); }
	
	this.drawImage = function(flag) {
		ctx.translate(position.x, position.y);
		ctx.rotate(angle);

		if ( flag === 'clear' ) ctx.clearRect(-w - 1, -h - 1, width + 2, height + 2);
		else draw();

		ctx.rotate(-angle);
		ctx.translate(-position.x, -position.y);			
	}

	img.src = params.img;

	img.onload = function() {
		if( params.repeatImage ===  true ) {
			var pattern = ctx.createPattern(img, 'repeat');
			ctx.fillStyle = pattern;
		}

		_this.drawImage();
	}

	this.setPosition = function(pPosition, pAngle) {

		this.drawImage('clear');

		position.x = pPosition.x * PPM;
		position.y = pPosition.y * PPM;
		angle = pAngle;

		this.drawImage();

	}
}


