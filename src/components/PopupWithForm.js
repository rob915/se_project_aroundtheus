import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupForm.querySelector("[type=submit]");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll("input");
  }
  _getInputValues() {
    const data = {};

    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }
}

// constructor({ popupSelector, handleSubmit }) {
//   super(popupSelector);
//   // fix the initial button text only once in the constructor
//   this._submitBtnText = this._submitBtn.textContent
// }
// // add 2 params: isLoading and loadingText with a default text
// renderLoading(isLoading, loadingText='Saving...') {
//   if (isLoading) {
//     this._submitBtn.textContent = loadingText;
//   } else {
// // here we return back the initial text. So, you don’t need to bother yourself about it
//     this._submitBtn.textContent = this._submitBtnText;
//   }
// }
