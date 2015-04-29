//Some fancy text input styles
(function(){
'use strict';
// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};
// Usage:
// optionally change the scope as final parameter too, like ECMA5
var myNodeList = document.querySelectorAll('input.input__field');
forEach(myNodeList, function (index, inputEl) {
    if(inputEl.value.trim() !== ''){
    	inputEl.parentNode.classList.add('input--filled');
    }
// events:
	inputEl.addEventListener( 'focus', onInputFocus );
	inputEl.addEventListener( 'blur', onInputBlur );

});

function onInputFocus( ev ) {
	ev.target.parentNode.classList.add('input--filled');
				}
function onInputBlur(ev) {
	if( ev.target.value.trim() === '' ) {
	ev.target.parentNode.classList.remove('input--filled');
	}
}

})();
