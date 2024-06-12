import "./pages/index.css";
import { initialCards, selectors, constants } from "./components/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormVaildator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithForm from "./components/PopupWithForm1.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";

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

// const cardAddPopup = new Popup({ popupSelector: constants.cardAdd });

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions                                    ||
// ! ||--------------------------------------------------------------------------------||

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", closeModalEsc);
// }
// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", closeModalEsc);
// }

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

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

const imagePopup = new PopupWithImage("#image-modal");

imagePopup.setEventListeners();

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
// ! ||                                 Event Handlers                                 ||
// ! ||--------------------------------------------------------------------------------||

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

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   constants.profileTitle.textContent = constants.profileTitleInput.value;
//   constants.profileDescription.textContent =
//     constants.profileDescriptionInput.value;
//   closeModal(constants.profileEdit);
// }

// function handleCardAddSubmit(values) {
//   console.log(values);

//   const newTitle = values.title;
//   const newLink = values.description;
//   const newCardData = getCardElement({
//     name: newTitle,
//     link: newLink,
//   });
//   console.log(newCardData);
//   renderCard(newCardData, constants.cardListEl);
//   cardAddPopupWithForm.close(constants.cardAdd);
//   constants.cardAddForm.reset();
//   addFormVaildator.disableSubmitButton();
// }

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

constants.profileEditButton.addEventListener("click", openProfileForm);
// constants.profileEditForm.addEventListener("submit", handleProfileEditSubmit);
constants.cardAddButton.addEventListener("click", () =>
  cardAddPopupWithForm.open()
);
// constants.cardAddForm.addEventListener("submit", handleCardAddSubmit);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Loops                                      ||
// ! ||--------------------------------------------------------------------------------||

// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   constants.cardListEl.prepend(cardElement);
// });

// ! ||--------------------------------------------------------------------------------||
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
