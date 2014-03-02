// ---------------------------------------------------- //
//         Kinetic: A Java Script Game Engine           //
// ---------------------------------------------------- //

KE = new function KineticEngine() {

	var timer = 0;
		
	this.World = new Box2D.Dynamics.b2World({x: 0, y: 0}, true);	
	this.pawns = {};
	this.updateHandlers = {};
	this.pawnsForRemoval = [];
	this.stage = document.getElementById('game-stage');

  	Utils.createElement({ id: 'pawns' });

	this.run = function() { 
		timer = setTimeout(KE.run, 1000/FPS)
		KE.update();
	}	

	this.pause = function() {
		clearTimeout(timer);
	}	
	
	this.update = function() {
		this.World.Step(1 / 30, 10, 10);


		for( var i in this.pawns ) 
			this.pawns[i].update();

		for( var i in this.updateHandlers ) 
			this.updateHandlers[i]();
		
		while( this.pawnsForRemoval.length > 0 ) 
			this.World.DestroyBody(this.pawnsForRemoval.pop().body)	
		
		this.World.ClearForces();
	}

	
}
