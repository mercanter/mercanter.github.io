/*---- clear inputs ---*/
function clearInputs(){
    $('input:text, input:password, textarea').each(function () {
  	var _el = $(this);
		var _val = _el.val();
		_el.bind('focus', function(){
			if(this.value == _val) this.value = '';
		}).bind('blur', function(){
		    if (this.value == '') this.value = _val;
		});
	});
}
$(document).ready(function(){
	clearInputs();
});
