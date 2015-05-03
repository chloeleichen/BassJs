(function(){
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	var Dropdown = function(options, element){
		this.el = element;
		this.defaults = {
			speed : 300,
			easing : 'ease',
			gutter : 0,
			stack : true,
			delay : 0,
			onOptionSelect: function(){
				return false;
			}
		}
		this._init(options);
	};

	Dropdown.prototype = {
		_init : function( options ){
			this.options = extend(options, this.defaults);
			this._layout();
			this._initEvents();

		},

		_layout : function(){
			var self = this;
			var value = this._transformSelect();
			self.opts = self.listopts.children;		
			self.optsCount = self.opts.length;
			self.size = {
				width: self.dd.offsetWidth,
				height: self.dd.offsetHeight
			}

			self.inputEl = document.createElement('input');
			self.inputEl.value = value;
			self.dd.insertBefore(self.inputEl, self.selectLbl);

		},
		_transformSelect: function(){
			var self = this;
			var optshtml = '',
				selectLabel = '',
				value = 0;
			forEach(self.el.children, function(key, node){
				//var val = isNan()
				var val = isNaN(node.value) ? node : Number(node.value),
					selected = node.selected,
					label = node.text;

			if ( node.value != 0 ){
				optshtml += '<li data-value = '+ val +'>' + '<span>' + label + '</span>'+ '</li>';				
			}

			if (selected){
				selectLabel = label;
				value = val;
			}

			});
			self.listopts = document.createElement('ul');
			self.selectLbl = document.createElement('span');
			self.selectLbl.innerHTML = selectLabel;
			self.listopts.innerHTML = optshtml;
			self.dd = self.el.parentNode;
			self.dd.appendChild(self.selectLbl);
			self.dd.parentNode.appendChild(self.listopts);
			self.dd.removeChild(self.el);
			return value;
		},

		_initEvents : function(){
		var self = this;
		forEach(this.opts, function(index, node){
			node.addEventListener("click", function(){
				var opt = this;
				self.inputEl.value = opt.dataset.value;
				self.selectLbl.innerHTML = opt.textContent;
			})
		})
		
		}

	};

window.Dropdown = Dropdown;
})();

(function(){
	var d = new Dropdown({}, document.getElementById("select-dropdown"));

})();