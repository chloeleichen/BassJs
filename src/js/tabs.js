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