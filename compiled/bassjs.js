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

;(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
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

(function() {
	var equalHeight = function(target, base){
		var self = {};
		self.target = target;
		self.base = base || null;
		function setHeight(){

				if (self.base != null){
					self.target.style.height = self.base.offsetHeight + "px";
				}
				else {
					self.target.style.height = window.innerHeight + "px";
				}

		}
		setHeight();
		// handle event
		window.addEventListener("optimizedResize", function() {
			setHeight();  
		});		
		return self;
	}
	window.equalHeight = equalHeight;
})();

var base = document.getElementById("content");
var target = document.getElementById("nav");
var e = equalHeight(target,base);

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

(function(){
	'use strict';
	var Modal = function(options) {
		this.options = options;
		this._init();
	}

	Modal.prototype = {
		_init: function(){
			var self = this;
			console.log(self.options);
			self.options.trigger.addEventListener("click", function(ev){
				
				self.options.modal.classList.add("modal-show");
				self.options.overlay.addEventListener("click", function(ev){
					self.options.modal.classList.remove("modal-show");
				})

			});

			self.options.close.addEventListener("click", function(ev){
				ev.stopPropagation();
				self.options.modal.classList.remove("modal-show");
			})

		}
	}

	window.Modal = Modal;

})();


var overlay = document.getElementById('modal-overlay');
var trigger = document.getElementById('modal-trigger');
var modal = document.getElementById('modal');
var close = document.getElementById('modal-close');

var m = new Modal({
	overlay: overlay,
	trigger: trigger,
	modal: modal,
	close: close
});
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
(function(){
    'use strict';
    // forEach method

    var scroll = function(options){
        var self = {};
        self.options = options;
        var animation = null;
        var active = 0,
            NodeListEl = document.querySelectorAll('[data-scroll-index]'),
            animating = false,
            lastIndex = NodeListEl[NodeListEl.length-1].dataset.scrollIndex,
            //Last item need to be the same with window height to avoid scroll back, further fix needed, should check if scroll to bottom and distance still > 0, then return
            e = equalHeight(NodeListEl[NodeListEl.length-1]);

        var navigate = function(ndx){
            if(ndx < 0 || ndx > lastIndex) return;    
            var targetTop = document.querySelector('[data-scroll-index="'+ ndx + '"]').offsetTop + self.options.topOffset,
                distance = targetTop - window.scrollY,
                //Define speed to ensure scroll consistancy whether it's scrolling betweem two far away position or two very close position
                scrollSpeed = self.options.speed;
                //requestAnimationFrame(scrollit);
                scrollit();

            function scrollit(){      
                distance = targetTop - window.scrollY; 
                if (distance > 0){
                    animating = true;
                    window.scrollBy(0, scrollSpeed);

                    if(distance < scrollSpeed ) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    animating = false;
                    return;
                    }      
                    requestAnimationFrame(scrollit);
                }
                if (distance < 0){
                    animating = true;
                    window.scrollBy(0, -scrollSpeed);
                    if(distance > - scrollSpeed) {
                    distance = 0;
                    window.scrollTo(0, targetTop);
                    animating = false;
                    return;
                    }
                    requestAnimationFrame(scrollit);
                } 
                if (distance == 0){
                    animating = false;     
                    return;
                } 

            };
        };
        self.doScroll = function(e){
                var target = e.target.dataset.scrollNav;
                navigate(target);
            
        };

        function watchActive(){
            var winTop = window.pageYOffset;
            //PADDING at top of the highest element
            var PADDING = 16;

            function isVisible(node){
                return (winTop + PADDING) >= node.offsetTop + self.options.topOffset &&
                (winTop + PADDING) < node.offsetTop + (self.options.topOffset) + node.offsetHeight;
               
            }
            var nodeList = [].slice.call(document.querySelectorAll("[data-scroll-index]")).filter(isVisible);
            if(nodeList.length > 0){
                var newActive = nodeList[0].dataset.scrollIndex;
                updateActive(newActive);

            }
        };

        function updateActive(ndx){
            active = ndx;
            var navItem = document.querySelectorAll('[data-scroll-nav]');
            forEach(navItem, function(key, value){
                value.classList.remove(self.options.activeClass);
            })
            document.querySelector('[data-scroll-nav= "'+ ndx +'"]').classList.add(self.options.activeClass);


        };
         /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */

         //problem
        var keyNavigation = function (e) {
            var key = e.which;
            if((animating == true) && (key == self.options.upKey || key == self.options.downKey)) {
                return false;
            }
            if(key == self.options.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == self.options.downKey && active < lastIndex) {
                //console.log(lastIndex);
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        window.onscroll = function(){
            watchActive();
        };

        window.onkeydown = function(e){
            keyNavigation(e);
            
        };

        return self;
    }
window.scroll = scroll;

})();

var s = scroll({
        upKey: 38,
        downKey: 40,
        scrollTime: 500,
        activeClass: 'bg-aqua',
        topOffset : 0,
        speed: 10,
}); 


var tar = document.querySelectorAll('[data-scroll-nav]');
forEach(tar, function(key, value){
    value.addEventListener("click", function(e){
        e.preventDefault();
        s.doScroll(e);
    })

});


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
				//console.dir(this);
				self.el.classList.remove("shake", "swing");
				this.removeEventListener(e);	
			});	
			
			if(value == null || value == ''){
				//console.log("empty");
				self.ev.preventDefault();
				self.el.classList.add("swing", "is-warning");
				self.el.classList.remove("shake","is-error");
				self.message.innerHTML = "This field is required";
				return false;
			} else if(isNaN(parseInt(value))&& value !=='' && value !== null ){
				//console.log("not a number");
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