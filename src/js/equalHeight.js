
(function() {
	var equalHeight = function(target, base){
		var self = {};
		self.target = target;
		self.base = base || null;
		function setHeight(){
			forEach(document.querySelectorAll(target), function(key, value){
				if (self.base != null){
					value.style.height = self.base.offsetHeight + "px";
				}
				else {
					value.style.height = window.innerHeight + "px";
					console.log("window");
				}
			});
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
var e = equalHeight("nav",base);
