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

var Block = function(target, trigger){
	function liner(){
		step = 0;
		function frame (){
		step ++;
		target.style.left = step + "%";
		var offset = Math.floor(target.offsetWidth/(target.parentNode.offsetWidth)* 100);
		if(step >= (100 - offset)){
			clearInterval(move);
			}
		}
		var move = setInterval(frame, 10);
	}

	

	
	trigger.addEventListener("click", function(){
		liner();
	})
}

var block = new Block(document.getElementById("block"), document.getElementById("block-control"));
