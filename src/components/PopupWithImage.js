import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector("#image-modal-image");
    this._text = this._popupElement.querySelector("#image-modal-sub-text");
  }
  open(data) {
    this._image.src = data.link;
    this._text.textContent = data.name;
    this._image.alt = `Photo of ${data.name}`;
    super.open();
  }
}
