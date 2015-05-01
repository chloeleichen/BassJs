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
				console.dir(this);	
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