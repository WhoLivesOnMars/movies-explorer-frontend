import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Validate } from '../../utils/Validate';
import logo from '../../images/header_logo.svg';
import './Register.css';

function Register({ onRegister }) {
  const [isValid, setIsValid] = useState(false);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formValue;
    onRegister(name, email, password); 
  }

  const handleValidate = (e) => {
    const input = e.target;
    input.nextSibling.textContent = Validate(input, setFormValue, formValue, setIsValid);
  }

  useEffect(() => {
    if ((formValue.name === '') ||
    (formValue.email === '') ||
    (formValue.password === '')) {
      setIsValid(false)
    }
  }, [formValue, isValid]);

  return (
    <div className="authentication">
      <div className="authentication__container">
        <Link to="/" className="link">
          <img src={logo} className="header__logo-image" alt="Логотип сайта" />
        </Link>
        <h3 className="authentication__title">
          Добро пожаловать!
        </h3>
        <form className="authentication__form" onSubmit={handleSubmit}>
          <fieldset className="authentication__fieldset">
            <div className="authentication__field">
              <label className="authentication__label">Имя</label>
              <input 
                className="authentication__input" 
                id="name"
                name="name"
                type="text"
                placeholder="Введите имя"
                required
                minLength="2"
                maxLength="30"
                value={formValue.name}
                onChange={handleValidate}
              />
              <span className="authentication__input-error"></span>
            </div>
            <div className="authentication__field">
              <label className="authentication__label">E-mail</label>
              <input 
                className="authentication__input" 
                id="email"
                name="email"
                type="email"
                placeholder="Введите e-mail"
                required
                minLength="6"
                maxLength="30"
                value={formValue.email}
                onChange={handleValidate}
              />
              <span className="authentication__input-error"></span>
            </div>
            <div className="authentication__field">
              <label className="authentication__label">Пароль</label>
              <input
                className="authentication__input"
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
                minLength="8"
                maxLength="30"
                value={formValue.password}
                onChange={handleValidate}
              />
              <span className="authentication__input-error"></span>
            </div>
          </fieldset>
        </form>
        <button className="authentication__save-button" type="submit" disabled={(isValid) ? false : true} name="registerSubmit">Зарегистрироваться</button>
        <div className="authentication__signin">
          <p className="authentication__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="authentication__login-link link">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;