export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this.about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // use to get profile data for inserting into form when it is opened
  getUserInfo() {
    const data = {
      title: this._name.textContent,
      description: this.about.textContent,
    };
    return data;
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this.about.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
