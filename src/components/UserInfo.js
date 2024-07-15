export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const data = {
      title: this._name.textContent,
      description: this._job.textContent,
    };
    return data;
  }
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
