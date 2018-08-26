import React from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';

export default class UiValidate extends React.Component {

  componentDidMount() {
    const form = $(findDOMNode(this));
    const validateCommonOptions = {
      rules: {},
      messages: {},
      errorElement: 'em',
      errorClass: 'invalid',
      highlight: (element, errorClass, validClass) => {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element).parent().addClass('state-error').removeClass('state-success');
      },
      unhighlight: (element, errorClass, validClass) => {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element).parent().removeClass('state-error').addClass('state-success');
      },

      errorPlacement: (error, element) => {
        if (element.parent('.input-group').length) {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      }
    };

    form.find('[data-validate-input], [validate-input]').each(function () {
      const $input = $(this), fieldName = $input.attr('name');

      validateCommonOptions.rules[fieldName] = {};

      if ($input.data('required') !== undefined) {
        validateCommonOptions.rules[fieldName].required = true;
      }

      if ($input.data('email') !== undefined) {
        validateCommonOptions.rules[fieldName].email = true;
      }

      if ($input.data('maxlength') !== undefined) {
        validateCommonOptions.rules[fieldName].maxlength = $input.data('maxlength');
      }

      if ($input.data('minlength') !== undefined) {
        validateCommonOptions.rules[fieldName].minlength = $input.data('minlength');
      }

      if ($input.data('pattern') !== undefined) {
        validateCommonOptions.rules[fieldName].pattern = $input.data('pattern');
      }

      if ($input.data('match') !== undefined) {
        validateCommonOptions.rules[fieldName].match = $input.data('match');
      }

      if ($input.data('min') !== undefined) {
        validateCommonOptions.rules[fieldName].min = $input.data('min');
      }

      if ($input.data('max') !== undefined) {
        validateCommonOptions.rules[fieldName].max = $input.data('max');
      }

      if ($input.data('gt') !== undefined) {
        validateCommonOptions.rules[fieldName].gt = $input.data('gt');
      }

      if ($input.data('lt') !== undefined) {
        validateCommonOptions.rules[fieldName].lt = $input.data('lt');
      }

      if ($input.data('creditcard') !== undefined) {
        validateCommonOptions.rules[fieldName].creditcard = true;
      }

      if ($input.data('memberof') !== undefined) {
        validateCommonOptions.rules[fieldName].memberof = $input.data('memberof');
      }

      if ($input.data('message')) {
        validateCommonOptions.messages[fieldName] = $input.data('message');
      } else {
        _.forEach($input.data(), (value, key) => {
          if (key.search(/message/) === 0) {
            if (!validateCommonOptions.messages[fieldName]) {
              validateCommonOptions.messages[fieldName] = {};
            }

            const messageKey = key.toLowerCase().replace(/^message/, '')
            validateCommonOptions.messages[fieldName][messageKey] = value;
          }
        });
      }
    });

    form.validate(_.extend(validateCommonOptions, this.props.options));
  }

  render() {
    return (
      this.props.children
    );
  }
}
