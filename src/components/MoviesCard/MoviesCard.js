import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie }) {

    const location = useLocation();
    const isSavedPage = location.pathname === '/saved-movies';

    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const handleButtonClick = () => {
      setIsButtonPressed(!isButtonPressed);
    };

    return (
      <div className="movie">
        <a href={movie.trailerLink} className="movie__link link">
          <img src={movie.image} alt={`Кадр из фильма ${movie.name}`} className="movie__image"/>
        </a>
        <div className="movie__info-container">
          <div className="movie__content">
            <h2 className="movie__name">{movie.nameRU}</h2>
            <p className="movie__duration">{movie.duration}</p>
          </div>
          <button 
            className={`movie__button ${isSavedPage ? 'movie__button_saved' : ''} ${isButtonPressed ? 'movie__button_pressed' : ''}`}
            onClick={handleButtonClick}
          ></button>
        </div>
      </div>
    )
  }
  
  export default MoviesCard;