// ! ||--------------------------------------------------------------------------------||
// ! ||                            Global variables                                    ||
// ! ||--------------------------------------------------------------------------------||

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: ".card-template",
};

const profile = document.querySelector(".profile");
const cardAdd = document.querySelector("#card-add");
const imageModal = document.querySelector("#image-modal");

export const constants = {
  profile: profile,
  profileEditButton: profile.querySelector(".profile__edit-button"),
  profileAvatar: profile.querySelector("#profile-avatar"),
  profileAvatarButton: profile.querySelector("#profile__image-button"),
  profileTitle: profile.querySelector(".profile__title"),
  updateAvatarForm: document.forms["update-avatar-form"],
  profileDescription: profile.querySelector(".profile__description"),
  cardListEl: document.querySelector(".cards__list"),
  cardTemplate: document.querySelector("#card-template"),
  cardAddButton: profile.querySelector("#card-add-button"),
  profileEdit: document.querySelector("#profile-edit"),
  profileEditForm: document.forms["profile-edit-form"],
  profileTitleInput: document.querySelector("#profile-edit-title-input"),
  profileDescriptionInput: document.querySelector(
    "#profile-edit-description-input"
  ),
  cardAdd: cardAdd,
  cardAddForm: document.forms["card-add-form"],
  cardTitleInput: cardAdd.querySelector("#card-add-title-input"),
  cardImageInput: cardAdd.querySelector("#card-add-link-input"),
  imageModal: imageModal,
  imageModalImage: imageModal.querySelector("#image-modal-image"),
  imageModalSubText: imageModal.querySelector("#image-modal-sub-text"),
};

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Data Array                                ||
// ! ||--------------------------------------------------------------------------------||
// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },

//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },

//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },

//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },

//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },

//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];
