//Add trim to strong 
if (!String.prototype.trim) {
  (function() {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.replace(rtrim, '');
    };
  })();
}


// forEach method
if (!NodeList.prototype.forEach) {
	var forEach = function (array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, i, array[i]); // passes back stuff we need
	  }
	};
}



(function(){
	var url = location.href;
	var match = url.substring(url.lastIndexOf('/')+1);

	console.log(match);

})();

(function(){
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
window.Clock = Clock;
})();
//Some fancy text input styles
(function(){
'use strict';
// Usage:
// optionally change the scope as final parameter too, like ECMA5
var myNodeList = document.querySelectorAll('input.input__field');
forEach(myNodeList, function (index, inputEl) {
    if(inputEl.value.trim() !== ''){
    	inputEl.parentNode.classList.add('input--filled');
    }
// events:
	inputEl.addEventListener( 'focus', onInputFocus );
	inputEl.addEventListener( 'blur', onInputBlur );

});

function onInputFocus( ev ) {
	ev.target.parentNode.classList.add('input--filled');
				}
function onInputBlur(ev) {
	if( ev.target.value.trim() === '' ) {
	ev.target.parentNode.classList.remove('input--filled');
	}
}

})();

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

var progressLiner = new Animation(document.getElementById("progress-liner"), document.getElementById("block-control-liner"), {delta: getFunc("liner"), duration: 4000});

var progressPow = new Animation(document.getElementById("progress-pow"), document.getElementById("block-control-pow"), {delta: getFunc("pow"), duration: 4000});

var progressPow = new Animation(document.getElementById("progress-bounce"), document.getElementById("block-control-bounce"), {delta: getFunc("bounce"), duration: 4000});

var progressIn = new Animation(document.getElementById("progress-ease-out"), document.getElementById("block-control-ease-out"), {delta: getFunc("bounce ease out"), duration: 4000});
})();
(function () {
	'use strict';
	var validation = function(options){
		var self ={};
		self.ev = options.ev;
		self.el = options.el;
		self.message = options.message;
		var value = self.el.value.trim();
		var animationEnd = (Modernizr.prefixed('animation') + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");
		self.validateNumber = function(){
			//console.log(value);
			self.el.addEventListener(animationEnd, function(e){
				console.dir(this);
				self.el.classList.remove("shake", "swing");
				this.removeEventListener(e);
				console.dir(this);	
			});	
			
			if(value == null || value == ''){
				console.log("empty");
				self.ev.preventDefault();
				self.el.classList.add("swing", "is-warning");
				self.el.classList.remove("shake","is-error");
				self.message.innerHTML = "This field is required";
				return false;
			} else if(isNaN(parseInt(value))&& value !=='' && value !== null ){
				console.log("not a number");
				self.ev.preventDefault();
				self.el.classList.add("shake","is-error");
				self.el.classList.remove("swing", "is-warning");
				self.message.innerHTML = "A number is required";
				return false;
			} else{
				self.el.classList.remove("swing", "is-warning");
				self.el.classList.remove("shake", "is-error");
				self.el.classList.add("is-success");
				self.message.innerHTML = "Validation success";
				return true;
			}
			
		}
				
		return self;
	}
window.validation = validation;
})();