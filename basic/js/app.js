var Validator = function (options) {
  var formElement = document.querySelector(options.form);
  var selectorRules = {};

  // When submit form
  formElement.onsubmit = function (e) {
    e.preventDefault();
    var isFromError = false;
    options.rules.forEach(function (rule) {
      var inputElement = document.querySelector(rule.selector);
      var isError = validate(inputElement, rule);
      if (isError) {
        isFromError = true;
      }
    });
    if (!isFromError) {
      if (typeof options.onSubmitForm === "function") {
        // Submit form by javascript
        var inputValues = formElement.querySelectorAll("input[name]");
        var formValues = Array.from(inputValues).reduce(function (
          values,
          inputValue
        ) {
          values[inputValue.name] = inputValue.value;
          return values;
        },
        {});
        options.onSubmitForm(formValues);
      } else {
        // Submit form by html default
        // formElement.submit()
      }
    }
  };

  // Function validate
  function validate(inputElement, rule) {
    var errorElement = "";
    var errorMessage = "";

    errorElement = inputElement.parentElement.querySelector(
      options.formMessage
    );

    var rules = selectorRules[rule.selector];
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) {
        break;
      }
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }

    return !!errorMessage;
  }

  // Validate form
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = document.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.formMessage
      );

      // Lưu lại các rule của input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.check);
      } else {
        selectorRules[rule.selector] = [rule.check];
      }

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
};

Validator.isRequired = function (selector) {
  return {
    selector,
    check: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector,
    check: function (value) {
      var regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regular.test(value) ? undefined : "Trường này phải là email";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector,
    check: function (value) {
      return value.length >= min
        ? undefined
        : "Chiều dài mật khẩu ít nhất là 6 ký tự";
    },
  };
};
Validator.isConfirmPassword = function (selector, confirmInput) {
  return {
    selector,
    check: function (value) {
      return value === confirmInput() ? undefined : "Giá trị không đúng";
    },
  };
};
