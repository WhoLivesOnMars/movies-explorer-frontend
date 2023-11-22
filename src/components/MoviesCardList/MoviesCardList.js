import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard';
import image from '../../images/movie_amelie.jpg';
import './MoviesCardList.css';

function MoviesCardList({ movies }) {

  return (
    <section className="movies">
      <ul className="movies__cells">
        {movies.map((movie, id) => (
          <li className="movies__list" key={id}>
            <MoviesCard
              movie={{
                country: "Франция",
                director: "Жан-Пьер Жёне",
                duration: "1ч22м",
                year: "2000",
                description: "Очень интересный фильм",
                image: image,
                trailerLink: "https://youtu.be/IzmKcURzeNM",
                thumbnail: image,
                movieId: 1234567,
                nameRU: "33 слова о дизайне",
                nameEN: "33 words about design"
              }}
            />
          </li>
        ))}
      </ul>
      <button className="movies__button-next">Еще</button>
    </section>
  )
}

export default MoviesCardList;