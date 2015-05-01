
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
