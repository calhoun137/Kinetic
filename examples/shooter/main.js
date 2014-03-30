(function(){

	KE.ImageManager.add([
		'gfx/shot.png',  
		'gfx/enemy.png',
		'gfx/player.png',
		'gfx/explosion.png',
		'gfx/spacebig.jpg',
		'gfx/mist.png',
		'gfx/mist2.png'
	], Image);

	KE.init(function() {
	
		FPS = 200;

		var SPAWN_TIME = timer = 50,
			isPaused = false,
			music = KE.createElement({
				src: 'mfx/loop.mp3'
			}, 'audio');

		new KE.Background({
			img: 'gfx/spacebig.jpg',
			y: 100,
			velocity: { x: 2 }
		});

		new KE.Background({
			img: 'gfx/mist.png',
			top: KE.stage.offsetHeight - 300,
			z: 1,
			velocity: { x: 5 },
			width: KE.stage.offsetWidth
		});

		new KE.Background({
			img: 'gfx/mist2.png',
			top: 0,
			z: 2,
			velocity: { x: 3 },
			width: KE.stage.offsetWidth
		});


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
	});


})();