export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _disableSubmitButton() {
    this._submitButton.classList.add("modal__save-button_disabled");
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove("modal__save-button_disabled");
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableSubmitButton();
      return;
    }
    this._enableSubmitButton();
  }

  toggleButtonState() {
    this._toggleButtonState(this._inputEls);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(".js-modal-input")];
    this._submitButton = this._form.querySelector(".modal__save-button");
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  // const editFormVaildator = new FormValidator(settings, editFrom);
  // editFormVaildator.enableValidation();
  // const addFormVaildator = new FormValidator(settings, addForm);
}
