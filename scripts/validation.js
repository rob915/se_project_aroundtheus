const showInputError = (formEl, inputEL, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEL.validationMessage;
  errorMessageEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEL, { inputErrorClass, errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
};

const checkInputValidity = (formEl, inputEL, options) => {
  if (!inputEL.validity.valid) {
    return showInputError(formEl, inputEL, options);
  }
  hideInputError(formEl, inputEL, options);
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputEl) => inputEl.validity.valid);
};

const disSubBtn = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enSubBtn = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

const toggleButtonState = (inputEls, submitButton, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputEls)) {
    disSubBtn(submitButton, { inactiveButtonClass });
    return;
  }
  enSubBtn(submitButton, { inactiveButtonClass });
};

const setEventListeners = (formEl, options) => {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__save-button");
  inputEls.forEach((inputEL) => {
    inputEL.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEL, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
};

const config = {
  formSelector: ".js-modal-form",
  inputSelector: ".js-modal-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal-input-error",
  errorClass: "modal-error-visible",
};

enableValidation(config);
