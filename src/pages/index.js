import "./index.css";
import { selectors, constants } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormVaildator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                          Communication with the sever                          ||
// ! ||--------------------------------------------------------------------------------||

// const baseUrl = "https://api-test.pa7lux.ru/streams";

// fucntion get todos() {
//   fetch('https://api-test.pa7lux.ru/streams')
//   .then((response) => {
//     console.log(response);
//   })
// }

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "abdb82ec-617f-444e-a982-59b4dab15f22",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// function loadImage(imageSrc) {
//   const img = document.createElement("img");
//   img.src = imageSrc;
//   return img;
// }

// const image = loadImage();
// document.body(image);

// Unique Token "abdb82ec-617f-444e-a982-59b4dab15f22"

// ! ||--------------------------------------------------------------------------------||
// ! ||                              class instantiations                              ||
// ! ||--------------------------------------------------------------------------------||

// cardSection.renderItems(initialCards);

const cardAddPopupWithForm = new PopupWithForm("#card-add", (values) => {
  const newTitle = values.title;
  const newLink = values.description;
  const newCardData = {
    name: newTitle,
    link: newLink,
  };
  api.addCard(newCardData).then(() => {
    renderCard(newCardData);
  });
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "e254619e-7195-4851-a257-08f38c23767e",
});

let cardSection;

api.getInitialCards().then((cards) => {
  cardSection = new Section(
    {
      items: cards,
      renderer: renderCard,
    },
    selectors.cardSection
  );
  cardSection.renderItems();
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about,
  });
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
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
