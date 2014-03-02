KE.debug = function(flags) {

	var flags = flags || {},
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
		debugDraw = new b2DebugDraw,
		debugCanvas = Utils.createElement({
			id: 'debug-canvas',
			width: KE.stage.offsetWidth,
			height: KE.stage.offsetHeight
		});

	if( flags.removeSprites ) {
		while( child = KE.stage.firstChild ) {
			KE.stage.removeChild(child);
		}
	}

	KE.stage.appendChild(debugCanvas);
	
	debugDraw.SetSprite(debugCanvas.getContext('2d'));
	debugDraw.SetDrawScale(PPM);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	
	KE.World.SetDebugDraw(debugDraw);					
	KE.World.DrawDebugData();		
	
	KE.updateHandlers.debug = function() { 
		KE.World.DrawDebugData(); 
	}		
	
}