var Clock  = function(target, trigger){
	this.target = target;
	this.trigger = trigger;
}

Clock.prototype = {
	_create:  function(){
			var date = new Date();
			var hour = date.getHours() < 10? 0 + date.getHours : date.getHours();
			var min = date.getMinutes() < 10? 0 + date.getMinutes : date.getMinutes();
			var sec = date.getSeconds() < 10? 0 + date.getSeconds : date.getSeconds();
			var currentTime = hour + ":" + min + ":" + sec ;
			this.target.innerHTML = currentTime;
	}

	_start:  function(){
			
	}
}

var c = new Clock(document.getElementById("clock"));