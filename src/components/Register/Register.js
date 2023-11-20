import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header_logo.svg';
import './Register.css';

function Register() {
      
    return (
      <div className="authentication">
        <div className="authentication__container">
          <div className="header__logo">
            <Link to="/" className="link">
              <img src={logo} className="header__logo-image" alt="Логотип сайта" />
            </Link>
          </div>
          <h3 className="authentication__title">
            Добро пожаловать!
          </h3>
          <form className="authentication__form">
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
                  value="Дарья"
                />
                <span className="authentication__input-error">Что-то пошло не так...</span>
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
                  value="pochta@yandex.ru"
                />
                <span className="authentication__input-error">Что-то пошло не так...</span>
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
                  value="000000000000"
                />
                <span className="authentication__input-error">Что-то пошло не так...</span>
              </div>
            </fieldset>
          </form>
          <button className="authentication__save-button" type="submit" name="registerSubmit">Зарегистрироваться</button>
          <div className="authentication__signin">
            <p className="authentication__signin-text">Уже зарегистрированы?</p>
            <Link to="/signin" className="authentication__login-link link">Войти</Link>
          </div>
        </div>
      </div>
    );
  }

export default Register;