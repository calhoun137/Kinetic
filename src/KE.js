// ---------------------------------------------------- //
//         Kinetic: A Java Script Game Engine           //
// ---------------------------------------------------- //

KE = new function KineticEngine() {

	var timer = 0,
		timeThen = Date.now();
		
	this.World = new Box2D.Dynamics.b2World({x: 0, y: 0}, true);	
	this.pawns = {};
	this.updateHandlers = {};
	this.pawnsForRemoval = [];

	this.stage = document.getElementById('game-stage');

	this.generateId = function() {
		return ( Math.random() + '' ).substr(2);
	}

	this.mergeObj = function(obj1, obj2) {
		
		if( obj2 )
			for( var i in obj1 ) 
				if( obj2[i] ) 
					obj1[i] = obj2[i];

		return obj1;			
	}

	this.createElement = function(attr, tag) {
		var el = document.createElement( tag || 'canvas' );

		attr.width = attr.width || this.stage.offsetWidth;
		attr.height = attr.height || this.stage.offsetHeight;
		
		this.mergeObj(el, attr);		
		this.mergeObj(el.style, attr.style);		

		return this.stage.appendChild(el);
	}

  	this.createElement({ id: 'pawns' });

  	this.init = function(callback) {
  		this.ImageManager.load(callback);
  	}

	this.run = function() { 
		KE.update();
		timer = requestAnimationFrame(KE.run);
	}	

	this.pause = function() {
		cancelAnimationFrame(timer);
	}	
	
	this.update = function() {
		this.World.Step( (Date.now() - timeThen) / 1000, 10, 10);
		timeThen = Date.now();

		for( var i in this.pawns ) 
			this.pawns[i].update();

		for( var i in this.updateHandlers ) 
			this.updateHandlers[i]();
		
		while( this.pawnsForRemoval.length > 0 ) 
			this.World.DestroyBody(this.pawnsForRemoval.pop().body)	
		
		this.World.ClearForces();
	}

	
}
