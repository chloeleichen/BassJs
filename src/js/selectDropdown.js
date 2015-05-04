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
			onOptionSelect: function(){
				return false;
			}
		}
		this._init(options);
	};

	Dropdown.prototype = {
		_init : function( options ){
			this.options = extend(options, this.defaults);
			this.opened = false;
			this._layout();
			this._initEvents();
		},

		_layout : function(){
			var self = this;
			var value = this._transformSelect();
			self.opts = self.listopts.children;		
			self.optsCount = self.opts.length;
			self.inputEl = document.createElement('input');
			self.inputEl.value = value;
			self.dd.insertBefore(self.inputEl, self.selectLbl);
			self.height = self.dd.offsetHeight;
		},
		_transformSelect: function(){
			var self = this;
			var optshtml = '',
			selectLabel = '',
			value = 0;
			forEach(self.el.children, function(key, node){
				//var val = isNan()
				var val = isNaN(node.value) ? node.value : Number(node.value),
				selected = node.selected,
				label = node.text;

				if ( node.value != -1 ){
					optshtml += '<li data-value = '+ val +'>' + '<span class="'+ label + '">' + label + '</span>'+ '</li>';				
				}

				if (selected){
					selectLabel = label;
					value = val;
				}

			});
			self.listopts = document.createElement('ul');
			self.listopts.className = "list-reset";
			self.selectLbl = document.createElement('span');
			self.selectLbl.innerHTML = selectLabel;
			self.listopts.innerHTML = optshtml;
			self.dd = self.el.parentNode;
			self.dd.appendChild(self.selectLbl);
			self.dd.appendChild(self.listopts);
			
			return value;
		},

		_initEvents : function(){
			var self = this;
			self.selectLbl.addEventListener("click", function(ev){
				self.opened ? self.close() : self.open();
				return false;

			});

			forEach(this.opts, function(index, node){
				node.addEventListener("click", function(){
					var opt = this;
					self.options.onOptionSelect( opt );
					self.inputEl.value = opt.dataset.value;
					self.selectLbl.innerHTML = opt.textContent;
					self.el.value = opt.dataset.value;
					self.close();
				})
			})

		},

		open: function(){
			var self = this;
			self.dd.classList.add("dropdown-active");	
			// leave the style in css
			//self.dd.style.height = self.listopts.offsetHeight + self.height + "px";	
			self.opened = true;
		},

		close: function(){
			var self = this;
			self.dd.classList.remove("dropdown-active");
			// self.dd.style.height = "auto";
			this.opened = false;
		}

	};

	window.Dropdown = Dropdown;
})();

(function(){
	var d = new Dropdown({}, document.getElementById("select-dropdown"));

})();