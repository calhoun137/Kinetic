KE.ImageManager = new function() {
	
	var asyncCount = 0,
		cacheSize = 0;
		cache = {},
		onComplete = function() {};

	var checkAsync = function() {
		if( ++asyncCount >= cacheSize ) {
			onComplete();
		}
	}

	this.get = function(src) {
		return cache[src];
	}

	this.getCache = function() {
		return cache;
	}

	this.add = function(srcs) {
		
		for( var i in srcs ) {
			var src = srcs[i];

			if( !cache[src] ) {
				cacheSize++;
				cache[src] = new Image;
				cache[src].onload = checkAsync;
			}
		}

	}

	this.load = function(callback) {
		onComplete = callback;
		for( var src in cache ) 
			cache[src].src = src;	
	}

}