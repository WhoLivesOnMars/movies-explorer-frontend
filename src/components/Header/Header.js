import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/header_logo.svg';
import './Header.css';

function Header({ loggedIn }) {

  const location = useLocation();
  const isWhiteHeader = location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  return location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile' ?
    (
      <header className={`header ${isWhiteHeader ? 'header__color_white' : ''}`}>
          <div className="header__logo">
            <Link to="/" className="link">
              <img src={logo} className="header__logo-image" alt="Логотип сайта" />
            </Link>
          </div>
          <Navigation loggedIn={loggedIn} />
      </header>
    )
    :
    (<></>)
}

export default Header;