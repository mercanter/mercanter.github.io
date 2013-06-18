function addEventKeyPressForNumber(controlID, maxlen) {
    $addHandler($get(controlID), 'keypress', function (e) {
        if (e.target.value.length + 1 > maxlen || e.charCode > 57 || (e.charCode < 48 && !((e.charCode == 44 || e.charCode == 46) &&
            e.target.value.indexOf(',') + e.target.value.indexOf('.') == -2))) {

            e.rawEvent.returnValue = false;
            e.rawEvent.cancelBubble = true;
        }
    });
}

function addEventChangeForNumber(controlID, regex, maxlen) {
    $addHandler($get(controlID), 'change', function (e) {
        if (e.target.value.length > maxlen)
            e.target.value = e.target.value.substring(0, maxlen);
        e.target.value = e.target.value.replace(/,/gi, '.').replace(/\s/gi, '');
        if (e.target.value.length > 0 && ! new RegExp(regex).test(e.target.value))
            e.target.value = '';
    });
}

function addClearProc(controlID, emptyText) {
    var control = $get(controlID);   

    $addHandler(control, 'focus', function (e) {
        if (this.value == emptyText) this.value = '';
    });

    $addHandler(control, 'blur', function (e) {
        if (this.value == '' || this.value == '0') this.value = emptyText;
    });
}

function clientValidation(e, controlID, minLength, maxLength, regex, succControlID, errorClass) {
    e.IsValid = e.Value != '' && e.Value.length >= minLength;
    if(maxLength != null)
        e.IsValid &= e.Value.length <= maxLength;    

    if (regex != null)
        e.IsValid &= new RegExp(regex).test(e.Value);

    if (!e.IsValid)
        Sys.UI.DomElement.addCssClass($get(controlID), errorClass);
    else
        Sys.UI.DomElement.removeCssClass($get(controlID), errorClass);

    var control = null;
    if(succControlID != null && (control = $get(succControlID)))    
        Sys.UI.DomElement.setVisible(control, false);     
}

function Page_ClientValidateWithSmartScroll() {
    return function (validationGroup) {
        var func = window.scrollTo;
        window.scrollTo = function (a, b) { };

        Page_InvalidControlToBeFocused = null;
        if (typeof (Page_Validators) == "undefined") {
            return true;
        }
        var i;
        for (i = 0; i < Page_Validators.length; i++) {
            ValidatorValidate(Page_Validators[i], validationGroup, null);
        }
        ValidatorUpdateIsValid();
        ValidationSummaryOnSubmit(validationGroup);
        Page_BlockSubmit = !Page_IsValid;
        if (Page_BlockSubmit == true) {
            for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
                var summary = Page_ValidationSummaries[sums];
                if (IsValidationGroupMatch(summary, validationGroup))
                    summary.scrollIntoView(true);
            }
        }
        window.scrollTo = func;
        return Page_IsValid;
    }
}
