export default class Card {
  constructor({ name, link }, cardSelector, fillImageModal) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._fillImageModal = fillImageModal;
  }

  _setEventListeners() {
    // ".card__button-like"
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__button-trash"
    this._cardElement
      .querySelector(".card__button-trash")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._cardImageEl.addEventListener("click", () => {
      this._fillImageModal({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._trashBtnEl = this._cardElement.querySelector(".card__button-trash");
    this._likeBtnEl = this._cardElement.querySelector(".card__button-like");
    // set the path to the image to the link field of the object
    this._cardImageEl.src = this._link;
    // set the image alt text to the name field of the object
    this._cardImageEl.alt = this._name;
    // set the card title to the name field of the object, too
    this._cardTitleEl.textContent = this._name;
    // set event listensers
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
