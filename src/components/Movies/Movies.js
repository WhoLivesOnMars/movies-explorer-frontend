import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundError from '../NotFoundError/NotFoundError';
import './Movies.css';

function Movies() {
  
  //const [isPreloading, setPreloading] = useState(false);
  //const [cards, setCards] = useState({})

  return (
    <main className="movies">
      <SearchForm />   
    </main>
  )
}
  
export default Movies;