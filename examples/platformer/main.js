KE.ImageManager.add([
	'gfx/cave-fore.png',
	'gfx/cave-spikes.png',
	'gfx/cave-bk.png'
]);

KE.init(function() {

	new KE.Background({
		img: 'gfx/cave-fore.png',
		velocity: { x: 5 },
		height: KE.stage.offsetHeight,
		width: KE.stage.offsetWidth,
		scale: {
			x: 2,
			y: 2
		}
	});
	
	new KE.Background({
		img: 'gfx/cave-bk.png',
		velocity: { x: 2 },
		z: -2,
		height: KE.stage.offsetHeight,
		width: KE.stage.offsetWidth,
		scale: {
			x: 2,
			y: 2
		}
	});

	// KE.run();

});
