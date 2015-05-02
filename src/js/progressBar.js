// Animation, the old way, not request animation frame 
// @params delay: time beetween frames 
//		  duration: the full time animation should take
//		  start: the time of anomation start
//		  timePassed: the time in ms passed from the animation starts 
//		  progress: the fraction of animation time that has already passed, calculated on every frame as timePassed/duration, [0, 1]
//        delta(progess) a function that returns the current animation progress  
(function(){
'use strict';

var Animation = (function(){

	var animate =  function(options){
		var start = new Date();
		var id = setInterval(function(){
			var timePassed = new Date() - start;
			var progress = timePassed/options.duration;
		//Call this first, make progess = 1, avoid Math.acos(progess) NaN error 
		if(progress > 1) progress = 1; 
		var delta = options.delta(progress);
		options.step(delta);
		if(progress == 1){
			clearInterval(id);			
		}
	}, options.delay || 10)
	}
	
	var move = function(element, trigger, options){
		trigger.addEventListener("click", function(){
			animate({
				delay: 10,
				duration: options.duration || 1000,
				delta: options.delta,
				step: function(delta){
					element.value = delta;
				}

			}) 
		});
		
	}
	return(move);
})();

var getFunc = function(func) {

	var deltaLiner = function(p){return p}
	//The Math.pow(base, exponent) function returns the base to the exponent power, that is, baseexponent.

	var deltaPow = function(p){
		return Math.pow(p, 2);
	}

	//The Math.acos() function returns the arccosine (in radians) of a number
	var deltaCirc = function(p){
		return 1 - Math.sin(Math.acos(p));
	}
	// the bow function 
	var deltaBow = function(p, x){
		x = 1.5;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	}
	var deltaElastic = function(p, x){
		x = 1.5;
		return Math.pow(2, 10 * (p-1)) * Math.cos(20*Math.PI*x/3*p)
	}
	// bounce 
	function deltaBounce(progress){
		for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
			}
		}

	}
	function makeEaseOut(delta) { 
		return function(progress) {
			return 1 - delta(1 - progress);
		}
	}
	function makeEaseIn(delta) { 
		return function(progress) {
			return delta(progress);
		}
	}
	function makeEaseInOut(delta) { 
		return function(progress){
			if (progress <= 0.5) { // the first half of the animation)
	return delta(2 * progress) / 2
			} else { // the second half
				return (2 - delta(2 * (1 - progress))) / 2
			}
		}
	}
	var deltaBounceEaseOut = makeEaseOut(deltaBounce);
	var deltaBounceEaseIn = makeEaseIn(deltaBounce);
	var deltaBounceEaseInOut = makeEaseInOut(deltaBounce);

	switch(func){
		case "liner": 
		return deltaLiner;
		case "pow": 
		return deltaPow;
		case "bow": 
		return deltaBow;
		case "circ":
		return deltaCirc;
		case "elastic":
		return deltaElastic;
		case "bounce":
		return deltaBounce;
		case "bounce ease out":
		return deltaBounceEaseOut;
		case "bounce ease in":
		return deltaBounceEaseIn;
		case "bounce ease in out":
		return deltaBounceEaseInOut;
	}
}

var progressLiner = new Animation(document.getElementById("progress-liner"), document.getElementById("block-control-liner"), {delta: getFunc("circ"), duration: 4000});

})();