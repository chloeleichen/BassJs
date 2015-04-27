var Clock  = function(target, trigger, stop){
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
		var start = setTimeout(function(){
			self._create();
			self._update();
			}, 1000);
	

		self.stop.addEventListener("click", function(){
		clearTimeout(start);
		});
	}
	,
	_init: function(){
		var self = this;
		//self._create();
		self.trigger.addEventListener("click", function(){
			self._update();
		});
	}
}

var c = new Clock(document.getElementById("clock"), document.getElementById("start"), document.getElementById("stop"));