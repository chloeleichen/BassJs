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