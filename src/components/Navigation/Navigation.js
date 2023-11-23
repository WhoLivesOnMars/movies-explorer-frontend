import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ loggedIn }) {

  const location = useLocation(); 
  const isWhiteHeader = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  const isActiveLink = (path) => location.pathname === path;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return loggedIn ? (
    <nav className="navigation">
      <ul className={`navigation__list ${isMenuOpen ? '' : 'hidden'}`}>
        <li>
          <NavLink
            to="/movies"
            className={`link ${
              isWhiteHeader ? 'navigation__link_black' : 'navigation__link_white'
            } ${isActiveLink('/movies') ? 'navigation__link_active' : ''}`}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={`link ${
              isWhiteHeader ? 'navigation__link_black' : 'navigation__link_white'
            } ${isActiveLink('/saved-movies') ? 'navigation__link_active' : ''}`}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="link hidden">
        <button
          className={`${isWhiteHeader ? 'navigation__account_transparent' : 'navigation__account_white'}`}
          type="button"
        >
          Аккаунт
        </button>
      </NavLink>
      <button
        className={`${isWhiteHeader ? 'icon-menu__button_black' : 'icon-menu__button'} ${isMenuOpen ? 'icon-menu__button-close' : ''}`}
        type="button"
        aria-label="Меню"
        onClick={handleMenuToggle}
      />
      <div className={`icon-menu ${isMenuOpen ? 'icon-menu__active' : ''}`}>
        <div className="icon-menu__container">
          <button
            className="icon-menu__button-close"
            type="button"
            onClick={handleMenuToggle}
          />
          <ul className="icon-menu__list">
            <li>
              <NavLink
                to="/"
                className={`link icon-menu__link ${isActiveLink('/') ? 'icon-menu__link_active' : ''}`}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={`link icon-menu__link ${isActiveLink('/movies') ? 'icon-menu__link_active' : ''}`}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={`link icon-menu__link ${isActiveLink('/saved-movies') ? 'icon-menu__link_active' : ''}`}
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink to="/profile" className="link">
            <button
              className="navigation__account_transparent"
              type="button"
            >
              Аккаунт
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navigation-auth">
      <NavLink to="/signup" className="navigation__link_white link">
        Регистрация
      </NavLink>
      <NavLink to="/signin" className="navigation-auth__button link">
        Войти
      </NavLink>
    </nav>
  );
}

export default Navigation;