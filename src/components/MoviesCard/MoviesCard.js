import React from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie }) {

    const location = useLocation();
    const isSavedPage = location.pathname === '/saved-movies';

    return (
      <div className="movie">
        <a href={movie.trailerLink} className="movie__link link">
          <img src={movie.image} alt={movie.name} className="movie__image"/>
        </a>
        <div className="movie__content">
          <h2 className="movie__name">{movie.nameRU}</h2>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        <button className={`movie__button ${isSavedPage ? 'movie__button_saved' : ''}`}></button>
      </div>
    )
  }
  
  export default MoviesCard;