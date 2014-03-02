KE.keyPress = {};

document.addEventListener('keydown', function(event) { 
	KE.keyPress[event.keyCode] = true;
});

document.addEventListener('keyup', function(event) { 
	delete KE.keyPress[event.keyCode];
});