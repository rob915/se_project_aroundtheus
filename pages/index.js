import Card from "../components/card.js";
import FormValidator from "../components/FormVaildator.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Data Array                                ||
// ! ||--------------------------------------------------------------------------------||

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ! ||--------------------------------------------------------------------------------||
// ! ||                            Global variables                                    ||
// ! ||--------------------------------------------------------------------------------||

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddButton = profile.querySelector("#card-add-button");

const profileEdit = document.querySelector("#profile-edit");
const profileEditCloseButton = profileEdit.querySelector(
  "#profile-edit-close-button"
);
const profileEditForm = profileEdit.querySelector("#profile-edit-form");
const profileTitleInput = document.querySelector("#profile-edit-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-edit-description-input"
);

const cardAdd = document.querySelector("#card-add");
const cardAddForm = cardAdd.querySelector("#card-add-form");
const cardTitleInput = cardAdd.querySelector("#card-add-title-input");
const cardImageInput = cardAdd.querySelector("#card-add-link-input");
const cardAddCloseButton = cardAdd.querySelector("#card-add-close-button");
const cardAddSaveButton = cardAdd.querySelector("#card-add-save-button");

const imageModal = document.querySelector("#image-modal");
const imageModalClsBtn = imageModal.querySelector("#image-modal-close-btn");
const imageModalImage = imageModal.querySelector("#image-modal-image");
const imageModalSubText = imageModal.querySelector("#image-modal-sub-text");

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
  profileEditForm
);
editFormVaildator.enableValidation();
const addFormVaildator = new FormValidator(validationSettings, cardAddForm);
addFormVaildator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions                                    ||
// ! ||--------------------------------------------------------------------------------||

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalEsc);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalEsc);
}

function getCardData(cardData) {
  const card = new Card(cardData, cardListEl, fillImageModal);
  return card.getView();
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}
function openProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEdit);
}
function fillImageModal(cardData) {
  imageModalImage.src = cardData.link;
  imageModalSubText.textContent = cardData.name;
  imageModalImage.alt = `Photo of ${cardData.name}`;
  openModal(imageModal);
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
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

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEdit);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const newTitle = cardTitleInput.value;
  const newLink = cardImageInput.value;
  const newCardData = getCardData({
    name: newTitle,
    link: newLink,
  });
  renderCard(newCardData, cardListEl);
  closeModal(cardAdd);
  cardAddForm.reset();
  addFormVaildator.resetValidation();
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

profileEditButton.addEventListener("click", openProfileForm);
profileEditCloseButton.addEventListener("click", () => closeModal(profileEdit));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddButton.addEventListener("click", () => openModal(cardAdd));
cardAddCloseButton.addEventListener("click", () => closeModal(cardAdd));
cardAddForm.addEventListener("submit", handleCardAddSubmit);
imageModalClsBtn.addEventListener("click", () => closeModal(imageModal));

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Loops                                      ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => {
  const cardElement = getCardData(cardData);
  cardListEl.prepend(cardElement);
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg

// const editFormVaildator = new FormValidator(config, profileEditForm);
