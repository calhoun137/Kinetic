(function(){

	KE.ImageManager.add([
		'gfx/firewall.png',
		'gfx/walltile.jpg'
	]);

	KE.init(function() {

		var NUM_BLOCKS = 300,
			WALL_WIDTH = KE.stage.offsetWidth / PPM,
			WALL_HEIGHT = KE.stage.offsetHeight / PPM,
			WALL_SIZE = 1;

		new Wall({ x: WALL_WIDTH / 2 , y: WALL_SIZE / 2, width: WALL_WIDTH, height: WALL_SIZE});
		new Wall({ x: WALL_SIZE / 2, y: WALL_HEIGHT / 2 , width: WALL_SIZE, height: WALL_HEIGHT});
		new Wall({ x: WALL_WIDTH / 2, y: WALL_HEIGHT - WALL_SIZE / 2, width: WALL_WIDTH, height: WALL_SIZE});
		new Wall({ x: WALL_WIDTH - WALL_SIZE / 2, y: WALL_HEIGHT / 2, width: WALL_SIZE, height: WALL_HEIGHT});
		
		for( var i = 0; i < NUM_BLOCKS; i++ ) {
			new Block({
				x: Math.random() * WALL_WIDTH - 1,
				y: Math.random() * WALL_HEIGHT - 1,
				velocity: {
					x: (Math.random()-0.5)*10,
					y: (Math.random()-0.5)*10
				}
			})
		}

		KE.World.SetGravity({ x: 0, y: 10 });

		KE.run();
	});

	
})();	
