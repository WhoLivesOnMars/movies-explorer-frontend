import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, onShowMore, showMoreVisibility, onSaveMovie, onDeleteMovie, onCheckSaving }) {

  return (
    <section className="movies">
      <ul className="movies__cells">
        {movies.map((movie) => (
          <li className="movies__list">
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              onCheckSaving={onCheckSaving}
            />
          </li>
        ))}
      </ul>
      {showMoreVisibility && (
      <button className="movies__button-next" onClick={onShowMore}>Еще</button>
      )}
    </section>
  )
}

export default MoviesCardList;