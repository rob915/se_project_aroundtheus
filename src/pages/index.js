import "./index.css";
import {
  selectors,
  constants,
  validationSettings,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormVaildator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                              class instantiations                              ||
// ! ||--------------------------------------------------------------------------------||

const cardAddPopupWithForm = new PopupWithForm("#card-add", (values) => {
  const newTitle = values.title;
  const newLink = values.description;
  const newCardData = {
    name: newTitle,
    link: newLink,
  };
  cardAddPopupWithForm._submitBtn.textContent = "Saving...";
  api
    .addCard(newCardData)
    .then((data) => {
      renderCard(data);
      cardAddPopupWithForm.close();
      constants.cardAddForm.reset();
      addFormVaildator.disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, Could not add new card`);
    })
    .finally(() => {
      cardAddPopupWithForm._submitBtn.textContent = "Save";
    });
});

cardAddPopupWithForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: "#profile-avatar",
});

const profileEditSubmitPopupWithForm = new PopupWithForm(
  "#profile-edit",
  (values) => {
    profileEditSubmitPopupWithForm._submitBtn.textContent = "Saving...";
    api
      .updateProfileInfo(values.title, values.description)
      .then((res) => {
        profileEditSubmitPopupWithForm._submitBtn.textContent = "Save";
        userInfo.setUserInfo(res);
        profileEditSubmitPopupWithForm.close();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}, Could not load profile info`);
      });
  }
);

profileEditSubmitPopupWithForm.setEventListeners();

const updateProfileAvatarPopupWithForm = new PopupWithForm(
  "#update-avatar",
  (value) => {
    updateProfileAvatarPopupWithForm._submitBtn.textContent = "Saving...";
    api
      .updateProfilePhoto(value.description)
      .then((res) => {
        userInfo.setUserAvatar(res);
        updateProfileAvatarPopupWithForm.close();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}, Could not load profile avatar`);
      })
      .finally(() => {
        updateProfileAvatarPopupWithForm._submitBtn.textContent = "Save";
      });
  }
);

updateProfileAvatarPopupWithForm.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#card-delete-conformation");
deleteCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");

imagePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "e254619e-7195-4851-a257-08f38c23767e",
});

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
    alert(`${err}, Could not load cards`);
  });

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => {
    console.error(err);
    alert(`${err}, Could not load user info`);
  });

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Validation                                   ||
// ! ||--------------------------------------------------------------------------------||

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

const avatarFormValidator = new FormValidator(
  validationSettings,
  constants.updateAvatarForm
);
avatarFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions                                    ||
// ! ||--------------------------------------------------------------------------------||

function handleDeleteCardClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.submitButton.textContent = "Saving...";
    api
      .removeCard(card.getId())
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}, Could not delete card`);
      })
      .finally(() => {
        deleteCardPopup.submitButton.textContent = "Yes";
      });
  });
}

function renderCard(item) {
  const card = new Card(
    item,
    selectors.cardTemplate,
    handleImageClick,
    handleDeleteCardClick,
    () => {
      if (!card.isLiked) {
        api.addLike(card._id).then((res) => {
          card.setIsLiked(res.isLiked);
        });
      } else {
        api.removeLike(card._id).then((res) => {
          card.setIsLiked(res.isLiked);
        });
      }
    }
  );
  cardSection.addItem(card.getView());
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
constants.profileAvatarButton.addEventListener("click", () => {
  updateProfileAvatarPopupWithForm.open();
});
// ! ||--------------------------------------------------------------------------------||
// ! ||                              Random Mountain Links                             ||
// ! ||--------------------------------------------------------------------------------||

// Torrent Mountains link: https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_1280.jpg
// Hunter Peak link: https://cdn.pixabay.com/photo/2024/02/12/16/05/hunter-peak-8568915_1280.jpg
// Keysville link: https://cdn.pixabay.com/photo/2023/08/22/21/18/mountain-8207212_1280.jpg
// Fox Backcountry link: https://www.ridefox.com/img/subhome/snow/backcountry-logo-light.png
