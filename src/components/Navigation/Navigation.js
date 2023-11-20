import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ loggedIn }) {

  const location = useLocation(); 
  const isWhiteHeader = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  
  return loggedIn ? (
    <nav className="navigation">
      <ul className="navigation__list hidden">
        <li>
          <NavLink
            to="/movies"
            className={`link navigation__movies ${isWhiteHeader ? 'navigation__link_active' : 'navigation__link'}`}
          >Фильмы</NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={`link navigation__saved-movies ${isWhiteHeader ? 'navigation__link_active' : 'navigation__link'}`}
          >Сохраненные фильмы</NavLink>
        </li>
      </ul> 
      <NavLink to="/profile" className="button-account link hidden">
        <button className={`${isWhiteHeader ? 'navigation__account_active' : 'navigation__account'}`} type="button">Аккаунт</button>
      </NavLink>
    </nav> 
  ) : ( 
    <nav className="navigation">
      <NavLink to="/signup" className="navigation__link link">Регистрация</NavLink>
      <NavLink to="/signin" className="navigation__link link">Войти</NavLink>
    </nav>
  )
}

export default Navigation;