import React from 'react';
import './Promo.css';
import { Link } from 'react-scroll';
import pic from '../../images/promo_logo.svg';

function Promo() {
    return (
      <section className="promo">
        <div className="promo__container">
          <div className="promo__overlay">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
          </div>
          <img src={pic} className="promo__logo" alt="Логотип сервиса"/>
        </div>
        <div className="promo__menu">
          <div className="promo__links">
            <Link to="about-project" className="promo__link link">О проекте</Link>
            <Link to="techs" className="promo__link link">Технологии</Link>
            <Link to="about-me" className="promo__link link">Студент</Link>
          </div>
        </div>
      </section>
    )
  }
  
  export default Promo;