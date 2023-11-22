import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

function Movies({ movies }) {
  
  //const [isPreloading, setPreloading] = useState(false);
  //const [cards, setCards] = useState({})

  return (
    <main className="all-movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
  
export default Movies;