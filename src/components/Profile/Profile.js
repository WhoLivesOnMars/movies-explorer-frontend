import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Validate } from '../../utils/Validate';
import './Profile.css';

function Profile({ onUpdateUser, signOut }) {
  const user = useContext(CurrentUserContext);
  const [isValid, setIsValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.name || !formValue.email){
      return;
    }
    onUpdateUser({ item: formValue });
    setIsEditing(false)
  }

  const handleValidate = (e) => {
    const input = e.target;
    const error = document.querySelector('.profile__err')
    error.textContent = Validate(input, setFormValue, formValue, setIsValid);
  }

  useEffect(() => {
    if (formValue.name === user.name && formValue.email === user.email) {
      setIsValid(false)
    }
  }, [formValue]);

  function handleEditButtonClick(e) {
    e.preventDefault();
    setIsEditing(true);
  };

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h1 className="profile__title">
          Привет, {user.name}!
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
                value={formValue.name}
                onChange={handleValidate}
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
                value={formValue.email}
                onChange={handleValidate}
                readOnly={!isEditing}
              />
            </div>
          </fieldset>
        </form>
        {isEditing ?
        <button 
          className="profile__button profile__button_save" 
          type="button" 
          name="registerSubmit"
          disabled={(isValid) ? false : true}
          onClick={handleSubmit}
        >
          Сохранить
        </button>
        :
        <>
          <button 
            className="profile__button profile__button_edit" 
            type="button" 
            name="registerSubmit"
            onClick={handleEditButtonClick}
          >
            Редактировать
          </button>
          <button 
            className="profile__button profile__button_exit" 
            type="button"
            name="registerSubmit"
            onClick={handleSignOut}
            >
            Выйти из аккаунта
          </button>
        </>
        }
      </div>
    </div>
  )
}
  
export default Profile;