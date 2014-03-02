(function(){
	
	FPS = 100;

	var SPAWN_TIME = timer = 50,
		isPaused = false;

	new KE.Background({
		img: 'gfx/spacebig.jpg',
		y: 100,
		velocity: { x: 2 }
	});

	new KE.Background({
		img: 'gfx/mist.png',
		top: KE.stage.offsetHeight - 300,
		z: 1,
		velocity: { x: 5 }
	});

	new KE.Background({
		img: 'gfx/mist2.png',
		top: 0,
		z: 2,
		velocity: { x: 3 }
	});

	var music = Utils.createElement({
		src: 'mfx/loop.mp3'
	}, 'audio');

	player = new Player();

	var pause = function() {
			KE.pause();
			music.pause();
		},
		run = function() {
			KE.run();
			music.play();
		};

	document.addEventListener('keydown', function(event) {
		if( event.keyCode === 27 ) ( isPaused = !isPaused )  ? pause() : run();
	});

	KE.updateHandlers.spawnEnemy = function() { 

		if( --timer < 0 ) {
			new Enemy();
			timer = SPAWN_TIME;
		}
		
	}

	// KE.debug();
	run();

})();