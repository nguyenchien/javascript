var Validator = function (formElement) {
  var formRule = {};

  var formElement = document.querySelector(formElement);
  var inputElements = formElement.querySelectorAll("input[name][rules]");
  Array.from(inputElements).forEach(function (inputElement) {
    formRule[inputElement.name] = inputElement.getAttribute("rules");
  });
  console.log(formRule);
};
