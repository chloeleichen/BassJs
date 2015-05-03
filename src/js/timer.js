(function() {
	var timer = function(target, trigger,lap, reset){
		self = {};
		self.target = target;
		self.trigger = trigger;
		self.lap = lap;
		self.reset = reset;
		var elapsed = 0,
			second = "00",
			minute = "00",
			hour = "00",
			timerFace = null,
			lapCount = 1;			
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
			var textnode = document.createTextNode("lap"+ lapCount+ " : " + timerFace);  
			node.appendChild(textnode); 
			document.getElementById("record").appendChild(node);
			lapCount ++;			
		};

		function watchEvent(){
			self.trigger.addEventListener("click", function(e){
				if (self.trigger.value == "start"){
					var start = new Date().getTime();
					init(start);
					self.trigger.value = "stop";
					self.trigger.innerHTML = "Stop";
					self.lap.value = "lap";
					self.lap.innerHTML = "Lap";						
				} else if (self.trigger.value == "stop"){
					window.clearInterval(self.interval);
					self.trigger.value = "start";
					self.trigger.innerHTML = "Restart";
					self.lap.value = "reset";
					self.lap.innerHTML = "Reset";
				}
			});

			self.lap.addEventListener("click", function(e){
				if (self.lap.value == "lap"){
					addLap();
				} else if(self.lap.value == "reset"){
					document.getElementById("record").innerHTML = '';
					window.clearInterval(self.interval);
					second = minute  = hour = "00";
					self.trigger.value = "start";
					self.trigger.innerHTML = "Start";
					timerFace = hour + " : " + minute + " : " + second;
					self.target.innerHTML = timerFace;

				}
				
			});

		};
		return self;
	}
	window.timer = timer;

})();
