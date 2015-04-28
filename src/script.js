var Clock  = function(target, trigger){
	this.target = target;
	this.trigger = trigger;
	this.stop = stop;
	this ._init();
}

Clock.prototype = {
	_create:  function(){
		var date = new Date();
		var hour = date.getHours() < 10? 0 + String(date.getHours()) : String(date.getHours());
		var min = date.getMinutes() < 10? 0 + String(date.getMinutes()) : String(date.getMinutes());
		var sec = date.getSeconds() < 10? 0 + String(date.getSeconds()) : String(date.getSeconds());
		var currentTime = hour + ":" + min + ":" + sec ;
		this.target.innerHTML = currentTime;
	}
	,
	_update:  function(){
		var self = this;
		start = setInterval(function(){
			self.target.style.color = "black";
			self._create();
		}, 1000);
	}
	,

	_reset: function(){


	}
	,
	_init: function(){
		var self = this;
	//self._create();
	self.trigger.addEventListener("click", function(){
		if(this.value == "start"){
			this.innerHTML = "pause";
			this.value = "pause";
			self._update();
		} else if(this.value == "pause"){
			console.log("called");
			clearInterval(start);
			this.value = this.innerHTML = "start";
			self.target.style.color = "red";
		} else{
			return;
		}
		
	});
}
}

//var c = new Clock(document.getElementById("clock"), document.getElementById("clock-control"));

// Animation, the old way, not request animation frame 
// @params delay: time beetween frames 
//		  duration: the full time animation should take
//		  start: the time of anomation start
//		  timePassed: the time in ms passed from the animation starts 
//		  progress: the fraction of animation time that has already passed, calculated on every frame as timePassed/duration, [0, 1]
//        delta(progess) a function that returns the current animation progress  

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
	
	var move = function(element, trigger, delta, duration){
		trigger.addEventListener("click", function(){
			animate({
			delay: 10,
			duration: duration || 1000,
			delta: delta,
			step: function(delta){
				element.value = delta;
			}

		}) 
		});
		
	}



	var deltaLiner = function(p){return p}
	//The Math.pow(base, exponent) function returns the base to the exponent power, that is, baseexponent.

	var deltaPow = function(p){
		return Math.pow(p, 5);
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



	//move(document.getElementById("progress-liner"), document.getElementById("block-control-liner"),  deltaLiner, 2000);
	move(document.getElementById("progress-pow"), document.getElementById("block-control-pow"),  deltaPow, 4000);
	// move(document.getElementById("progress-bow"), document.getElementById("block-control-bow"),  deltaBow, 2000);
	// move(document.getElementById("progress-ease-out"), document.getElementById("block-control-ease-out"),  deltaBounceEaseOut, 2000);







