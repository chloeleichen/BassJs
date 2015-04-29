(function () {
	'use strict';
	var validate = function(e, el, message){
		var value = el.value.trim();
		//console.log(value);
		if(value == null || value == ''){
			console.log("empty");
			e.preventDefault();
			el.classList.add("swing", "is-warning");
			el.classList.remove("shake","is-error");
			message.innerHTML = "This field is required";
			return false;
		} else if(isNaN(parseInt(value))&& value !=='' && value !== null ){
			console.log("not a number");
			e.preventDefault();
			el.classList.add("shake","is-error");
			el.classList.remove("swing", "is-warning");
			message.innerHTML = "A number is required";
			return false;
		} else{
			el.classList.remove("swing", "is-warning");
			el.classList.remove("shake", "is-error");
			el.classList.add("is-success");
			message.innerHTML = "Validation success";
			return true;
		}
	}
//on transitionend remove
	var input = document.getElementById("input__field--validate");
	var trigger = document.getElementById("validate");
	var message = document.getElementById("input__message--validate");


	trigger.addEventListener("click", function(e){
		e.preventDefault();
		validate(e, input, message);
	});

	
})();