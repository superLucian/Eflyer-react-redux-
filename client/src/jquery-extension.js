if (!$.validator.methods.match) {
  $.validator.addMethod('match', function (value, element, params) {
    return this.optional(element) || value === $(params).val();
  }, 'Field does not match.');
}

if (!$.validator.methods.gt) {
  $.validator.addMethod('gt', function (value, element, params) {
    return this.optional(element) || !$.isNumeric(value) || !$.isNumeric(params) || parseFloat(value) > parseFloat(params);
  }, 'Please enter a number that is greater than the minimum.');
}

if (!$.validator.methods.lt) {
  $.validator.addMethod('lt', function (value, element, params) {
    return this.optional(element) || !$.isNumeric(value) || !$.isNumeric(params) || parseFloat(value) < parseFloat(params);
  }, 'Please enter a number that is less than the maximum.');
}

if (!$.validator.methods.memberof) {
  $.validator.addMethod('memberof', function (value, element, params) {
    const allowedValues = params.split(';;');
    return this.optional(element) || allowedValues.indexOf(value) > -1;
  }, 'Please enter one of the allowed values.');
}
