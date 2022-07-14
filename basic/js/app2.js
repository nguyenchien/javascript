var Validator = function (formElement) {
  var formRule = {};
  var formElement = document.querySelector(formElement);

  /*
    Rule check:
    Nếu có lỗi thì xuất ra message lỗi
    Nếu không có lỗi thì xuất ra undefined
  */
  function validate(value) {
    return value ? undefined : "Vui lòng nhập trường này.";
  }

  if (formElement) {
    var inputElements = formElement.querySelectorAll("input[name][rules]");
    var errorMessage = "";

    Array.from(inputElements).forEach(function (inputElement) {
      formRule[inputElement.name] = inputElement.getAttribute("rules");
    });

    Object.keys(formRule).forEach(function (inputElement) {
      formElement.querySelector("#" + inputElement).onblur = function (e) {
        errorMessage = validate(e.target.value);
        console.log(errorMessage);
      };
    });
  }
};
