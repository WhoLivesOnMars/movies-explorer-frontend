import React, { useState } from 'react';
import './Profile.css';

function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <h1 className="profile__title">
          Привет, Дарья!
        </h1>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <div className="profile__field">
              <label className="profile__label">Имя</label>
              <input 
                className="profile__input" 
                id="name"
                name="name"
                type="text"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="30"
                value="Дарья"
                readOnly={!isEditing}
              />
            </div>
            <div className="profile__field">
              <label className="profile__label">E-mail</label>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                minLength="6"
                maxLength="30"
                value="pochta@yandex.ru"
                readOnly={!isEditing}
              />
            </div>
          </fieldset>
        </form>
        <button 
          className={`profile__button profile__button_edit ${isEditing ? 'profile__button_save' : ''}`} 
          type="button" 
          name="registerSubmit"
          onClick={handleEditButtonClick}
        >
          {isEditing ? 'Сохранить' : 'Редактировать'}
        </button>
        {!isEditing && (
          <button className="profile__button profile__button_exit" type="button" name="registerSubmit">
            Выйти из аккаунта
          </button>
        )}
      </div>
    </div>
  )
}
  
export default Profile;