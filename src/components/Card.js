export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCardClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._likeBtnEl.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._trashBtnEl.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  likeStatus(liked) {
    if (this._isLiked) {
      this._isLiked = !this._isLiked;
    }
  }
  _handleLikeIcon() {
    this._likeBtnEl.classList.toggle("card__button-like_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._trashBtnEl = this._cardElement.querySelector(".card__button-trash");
    this._likeBtnEl = this._cardElement.querySelector(".card__button-like");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
