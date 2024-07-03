import "./index.css";
import { initialCards, selectors, constants } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormVaildator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                              class instantiations                              ||
// ! ||--------------------------------------------------------------------------------||

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardSection
);

cardSection.renderItems(initialCards);

const cardAddPopupWithForm = new PopupWithForm("#card-add", (values) => {
  const newTitle = values.title;
  const newLink = values.description;
  const newCardData = {
    name: newTitle,
    link: newLink,
  };
  renderCard(newCardData);
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

function renderCard(item) {
  const cardEl = new Card(item, selectors.cardTemplate, handleImageClick);
  cardSection.addItem(cardEl.getView());
}

function openProfileForm() {
  editFormVaildator.resetValidation();
  profileEditSubmitPopupWithForm.setInputValues(userInfo.getUserInfo());
  profileEditSubmitPopupWithForm.open();
}

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

constants.profileEditButton.addEventListener("click", openProfileForm);
constants.cardAddButton.addEventListener("click", () =>
  cardAddPopupWithForm.open()
);

// ! ||--------------------------------------------------------------------------------||
// ! ||                          Communication with the sever                          ||
// ! ||--------------------------------------------------------------------------------||

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "abdb82ec-617f-444e-a982-59b4dab15f22",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

// Unique Token "abdb82ec-617f-444e-a982-59b4dab15f22"

// ! ||--------------------------------------------------------------------------------||
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
