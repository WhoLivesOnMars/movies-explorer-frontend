import React from 'react';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/about_me_photo.jpg';
import './AboutMe.css';

function AboutMe() {
    return (
      <section id="about-me" className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <img src={photo} className="about-me__photo" alt="Моя фотография" />
          <div className="about-me__content">
            <h3 className="about-me__subtitle">Дарья</h3>
            <h4 className="about-me__description">Фронтенд-разработчик, 29 лет</h4>
            <p className="about-me__info">
              Я родилась в небольшом городе Свердловской области, училась в Екатеринбурге, работала в Санкт-Петербурге, а теперь живу в Страсбурге. 
              В Уральском Федеральном Университете защитила диплом бакалавра экономики, а также магистра менеджмента. 
              4 года проработала в сфере управления проектами, начиная с позиции администратора IT-проектов в "ООО Газпромнефть Бизнес-сервис", а затем и менеджера IT-проектов в компании "Северсталь Инфоком".
              В 2023г. закончила курс "Веб-разработчик" в "Яндекс Практикум" и на текущий момент развиваюсь в области веб-разработки.
            </p>
            <a href="https://github.com/WhoLivesOnMars" rel="noopener noreferrer" target="_blank" className="about-me__github link">Github</a>
          </div>
        </div>
        <Portfolio />
      </section>
    )
  }
  
  export default AboutMe;