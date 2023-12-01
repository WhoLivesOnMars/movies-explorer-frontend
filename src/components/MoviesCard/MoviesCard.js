import React from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie, onSaveMovie, onDeleteMovie, onCheckSaving }) {

    const location = useLocation();

    const film = {
      image: movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image,
      duration: movie.duration,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU
    };

    const handleSave = () => {
      onSaveMovie(movie);
    };

    const handleDelete = () => {
      onDeleteMovie(movie);
    };

    return (
      <div className="movie">
        <a href={film.trailerLink} className="movie__link link" target='_blank' rel="noopener noreferrer">
          <img src={film.image} alt={`Кадр из фильма ${film.nameRU}`} className="movie__image"/>
        </a>
        <div className="movie__info-container">
          <div className="movie__content">
            <h2 className="movie__name">{film.nameRU}</h2>
            <p className="movie__duration">{film.duration}</p>
          </div>
          {location.pathname === "/movies" &&
            onCheckSaving(movie) ? 
            <button className={"movie__button_pressed"} type="button" onClick={handleDelete}/>
            :
            <button className={"movie__button"} type="button" onClick={handleSave}/>
          }
          {location.pathname === "/saved-movies" &&
            <button 
              className='movie__button_saved' type="button"
              onClick={handleDelete}
            />
          }
        </div>
      </div>
    )
  }
  
  export default MoviesCard;