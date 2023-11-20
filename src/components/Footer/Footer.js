import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {

    const location = useLocation();
    const date = new Date().getFullYear()

    return location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' ?
      (
        <footer className="footer">
          <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <div className="footer__container">
            <p className="footer__copyright">&copy; {date}</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="https://practicum.yandex.ru/" className="footer__link link">Яндекс.Практикум</a>
              </li>
              <li className="footer__item">
                <a href="https://github.com/" className="footer__link link">Github</a>
              </li>
            </ul>
          </div>
        </footer>
      )
      :
      (<></>)
  }
  
  export default Footer;