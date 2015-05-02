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
			//console.log(self.options);
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

var progressLiner = new Animation(document.getElementById("progress-liner"), document.getElementById("block-control-liner"), {delta: getFunc("circ"), duration: 4000});

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


// A simple tabs script
(function(){
	'use strict';
	var tabs = function(el, options){
		var self = {};
		self.el = el;
		self.options = options;
		self.tabs = Array.prototype.slice.call(self.el.querySelectorAll('nav > ul > li'));
		self.items = Array.prototype.slice.call(self.el.querySelectorAll('.content-wrap > section'));
		self.current = ((self.options.start >=0) && (self.options.start < self.tabs.length) && (self.options.start != undefined))? self.options.start : 0; 
		show(self.current);
		self.tabs[self.current].classList.add("tab-current");
		initEvents();


		function initEvents(){
			self.tabs.forEach(function(value, key){
				value.addEventListener("click", function(ev){
					ev.preventDefault();
					self.current = key;
					resetOther(self.tabs, self.current, "tab-current" );
					this.classList.add("tab-current");
					show(self.current);
				});
			});
		};

		function show(current){
			if((current >= 0) && (current < self.items.length) && (current != undefined)){
			self.items[current].classList.add("content-current");
			resetOther(self.items, current,"content-current" );
			} else {
				console.log("content for this tab doesnot exist, showing content for the last tab instead");
				return;
			}	
		};

		function resetOther(target, active, className){
			target.forEach(function(value, key){
				if(key != active){
					value.classList.remove(className);
				}
			});
		};


		return self;
	}
	window.tabs = tabs;

})();

(function(){
	var t = tabs(document.getElementById("tabs"), {start: 10});

})();
(function() {
	var timer = function(target, trigger,lap){
		self = {};
		self.target = target;
		self.trigger = trigger;
		self.lap = lap;
		var elapsed = 0,
			second = "00",
			minute = "00",
			hour = "00",
			timerFace = null;			
		watchEvent();

		function init(startTime){
			self.interval = setInterval(function(){	
				var time = new Date().getTime() - startTime;
				elapsed = Math.floor(Math.floor(time/100)/10);
				if(elapsed < 10){
					second = 0 + String(elapsed);
					//console.log(self.time);
				} else if(10 < elapsed && elapsed < 60){
					second = String(elapsed);
				}else if( 60 < elapsed && elapsed < 3600){
					var sec = Math.floor(elapsed % 60),
						min = Math.floor(elapsed / 60 );
					second = sec < 10 ? 0 + String(sec) : String(sec);
					minute = min < 10 ? 0 + String(min) : String(min);
				} else if (3600 < elapsed){
					var minRaw = Math.floor(elapsed / 60 );
					//console.log(minRaw);
					var h = Math.floor(elapsed/3600);
					var min = Math.floor(minRaw % 60);
					var sec = Math.floor(elapsed % 60);
					second = sec < 10 ? 0 + String(sec) : String(sec);
					minute = min < 10 ? 0 + String(min) : String(min);
					hour = h < 10 ? 0 + String(h) : String(h);
				};
				timerFace = hour + " : " + minute + " : " + second;
				self.target.innerHTML = timerFace;
			}, 100);

		};

		function addLap(){
			var node = document.createElement("LI");  
			var textnode = document.createTextNode(timerFace);  
			node.appendChild(textnode); 
			document.getElementById("record").appendChild(node);			
		};

		function watchEvent(){
			self.trigger.addEventListener("click", function(e){
				if (self.trigger.value == "start"){
					var start = new Date().getTime();
					init(start);
					self.trigger.value = "stop";
					self.trigger.innerHTML = "Stop";						
				} else if (self.trigger.value == "stop"){
					window.clearInterval(self.interval);
					self.trigger.value = "start";
					self.trigger.innerHTML = "Restart";
				}
			});
			self.lap.addEventListener("click", function(e){
				addLap();
			});
		};
		return self;
	}
	window.timer = timer;

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