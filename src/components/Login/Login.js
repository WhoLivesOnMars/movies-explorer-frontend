import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Validate } from '../../utils/Validate';
import logo from '../../images/header_logo.svg';
import './Login.css';

function Login({ onLogin }) {
  const [isValid, setIsValid] = useState(false);

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    const { email, password } = formValue;
    onLogin(email, password);
    setFormValue({ email: '', password: '' });
  }

  const handleValidate = (e) => {
    const input = e.target;
    input.nextSibling.textContent = Validate(input, setFormValue, formValue, setIsValid);
  }

  useEffect(() => {
    if ((formValue.email === '') ||
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
          Рады видеть!
        </h3>
        <form className="authentication__form" onSubmit={handleSubmit}>
          <fieldset className="authentication__fieldset">
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
              <span className="authentication__input-error" />
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
              <span className="authentication__input-error" />
            </div>
          </fieldset>
        </form>
        <button className="authentication__submit-button" type="submit" disabled={(isValid) ? false : true} name="registerSubmit">Войти</button>
        <div className="authentication__signup">
          <p className="authentication__signup-text">Еще не зарегистрированы?</p>
          <Link to="/signup" className="authentication__login-link link">Регистрация</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;