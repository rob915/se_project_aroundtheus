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
// ! ||                                    Elements                                    ||
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

const imageModal = document.querySelector("#image-modal");
const imageModalClsBtn = imageModal.querySelector("#image-modal-close-btn");

const imageModalImage = imageModal.querySelector("#image-modal-image");
const imageModalSubText = imageModal.querySelector("#image-modal-sub-text");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions                                    ||
// ! ||--------------------------------------------------------------------------------||

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function trashCard(e) {
  e.currentTarget.parentElement.remove();
}

function likeToggle(e) {
  e.currentTarget.classList.toggle("card__button_active");
}

function getCardData(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const trashBtnEl = cardElement.querySelector(".card__button-trash");
  const likeBtnEl = cardElement.querySelector(".card__button");

  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // add event listener to toggle class for like button
  likeBtnEl.addEventListener("click", likeToggle);
  // add event listener to remove card
  trashBtnEl.addEventListener("click", trashCard);
  // add event listener to card image
  cardImageEl.addEventListener("click", () => fillImageModal(cardData));

  return cardElement;
}

function renderCard(cardElement, container) {
  // return the ready HTML element with the filled-in data
  container.prepend(cardElement);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEdit);
}
function fillImageModal(cardData) {
  imageModalImage.src = cardData.link;
  imageModalSubText.textContent = cardData.currentTarget.name;

  openModal(imageModal);
}

// IMAGE MODAL NEEDS TO PRELOAD IMAGE AND INFO

// function likeButtonFilled() {
//   cardButton.classList.add("card__button");
// }

// function openCardAdd() {
//   cardAdd.classList.add("modal_opened");
// }

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
  // getCardData({
  //   name: newTitle,
  //   link: newLink,
  // });

  closeModal(cardAdd);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

profileEditButton.addEventListener("click", fillProfileForm);

profileEditCloseButton.addEventListener("click", () => closeModal(profileEdit));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => openModal(cardAdd));

cardAddCloseButton.addEventListener("click", () => closeModal(cardAdd));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

imageModalClsBtn.addEventListener("click", () => closeModal(imageModal));
// cardButton.addEventListener("click", likeButtonFilled);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Loops                                      ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => {
  const cardElement = getCardData(cardData);
  cardListEl.prepend(cardElement);
});

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
