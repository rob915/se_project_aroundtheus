import "./pages/index.css";
import { initialCards, selectors, constants } from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormVaildator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                              class instantiations                              ||
// ! ||--------------------------------------------------------------------------------||

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = new Card(item, selectors.cardTemplate, handleImageClick);
      cardSection.addItem(cardEl.getView());
    },
  },
  selectors.cardSection
);

cardSection.renderItems(initialCards);

const cardAddPopupWithForm = new PopupWithForm("#card-add", (values) => {
  const newTitle = values.title;
  const newLink = values.description;
  const newCardData = getCardElement({
    name: newTitle,
    link: newLink,
  });
  renderCard(newCardData, constants.cardListEl);
  constants.cardAddForm.reset();
  addFormVaildator.disableSubmitButton();
});

cardAddPopupWithForm.setEventListeners();

const profileEditSubmitPopupWithForm = new PopupWithForm(
  "#profile-edit",
  (values) => {
    constants.profileTitle.textContent = values.title;
    constants.profileDescription.textContent = values.description;
    profileEditSubmitPopupWithForm.close();
  }
);

profileEditSubmitPopupWithForm.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");

imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Validation                                   ||
// ! ||--------------------------------------------------------------------------------||

const validationSettings = {
  inputSelector: ".js-modal-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal-input-error",
  errorClass: "modal-error-visible",
};

const editFormVaildator = new FormValidator(
  validationSettings,
  constants.profileEditForm
);
editFormVaildator.enableValidation();
const addFormVaildator = new FormValidator(
  validationSettings,
  constants.cardAddForm
);
addFormVaildator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions                                    ||
// ! ||--------------------------------------------------------------------------------||

function getCardElement(cardData) {
  const card = new Card(cardData, constants.cardTemplate, handleImageClick);
  return card.getView();
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function openProfileForm() {
  editFormVaildator.resetValidation();
  profileEditSubmitPopupWithForm.setInputValues(userInfo.getUserInfo());
  profileEditSubmitPopupWithForm.open();
}

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close-button")
  ) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

constants.profileEditButton.addEventListener("click", openProfileForm);
constants.cardAddButton.addEventListener("click", () =>
  cardAddPopupWithForm.open()
);

// ! ||--------------------------------------------------------------------------------||
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
