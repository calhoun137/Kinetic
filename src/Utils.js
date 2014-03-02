Utils = new function() {
	
	var stage = document.getElementById('game-stage');

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

		attr.width = attr.width || stage.offsetWidth;
		attr.height = attr.height || stage.offsetHeight;
		
		this.mergeObj(el, attr);		
		this.mergeObj(el.style, attr.style);		

		return stage.appendChild(el);
	}

}