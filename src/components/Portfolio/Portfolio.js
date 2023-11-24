import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <>
      <h2 className="portfolio">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/WhoLivesOnMars/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__link link">
            <h3 className="portfolio__subtitle">Статичный сайт</h3>
            <p className="portfolio__symbol">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/WhoLivesOnMars/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__link link">
            <h3 className="portfolio__subtitle">Адаптивный сайт</h3>
            <p className="portfolio__symbol">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/WhoLivesOnMars/react-mesto-api-full-gha" target="_blank" rel="noopener noreferrer" className="portfolio__link link">
            <h3 className="portfolio__subtitle">Одностраничное приложение</h3>
            <p className="portfolio__symbol">↗</p>
          </a>
        </li>
      </ul>
    </>
  )
}
  
export default Portfolio;