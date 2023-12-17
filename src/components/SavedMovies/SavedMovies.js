import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundError from '../NotFoundError/NotFoundError';
import api from '../../utils/MainApi';
import MovieSearch from '../../utils/MovieSearch';
import useWindowWidth from '../../hooks/useWindowWidth';
import { savedMoviesStorage, SMALL, MEDIUM, INTERMEDIATE } from '../../utils/Constants';

import './SavedMovies.css';

function SavedMovies() {
  
  const { filmQuery, filmDuration } = savedMoviesStorage;
  const windowWidth = useWindowWidth();
  const [isPreloading, setPreloading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [cardsInRow, setCardsInRow] = useState({ first: 16 });
  const [visibleCardsCount, setVisibleCardsCount] = useState(cardsInRow.first);

  const movieSearch = new MovieSearch(savedMovies);

  useEffect(() => {
    api.getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.log(err))
      .finally(setPreloading(false));
  }, []);
  
  useEffect(() => {
    if (!searchResults.length) {
      setSearchResults(savedMovies)
    }
  }, [savedMovies])

  useEffect(() => {
    if (windowWidth >= INTERMEDIATE) {
      setCardsInRow({ first: 16 })
    } else if (windowWidth >= MEDIUM) {
      setCardsInRow({ first: 12 })
    } else if (windowWidth >= SMALL) {
      setCardsInRow({ first: 8 })
    } else {
      setCardsInRow({ first: 5 })
    }
  }, [windowWidth]);

  useEffect(() => {
    setVisibleCardsCount(cardsInRow.first);
  }, [cardsInRow]);

  function handleSearch(query, isShortFilm) {
    const results = movieSearch.search(query, isShortFilm);
    setSearchResults(results);
    localStorage.setItem(filmQuery, query);
    localStorage.setItem(filmDuration, isShortFilm);
  };

  function handleDeleteMovie(movie) {
    api.deleteMovie(movie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movie._id);
          setSavedMovies(updatedSavedMovies);
          setSearchResults(updatedSavedMovies);
        })
        .catch((err) => console.log(err));
  }

  return (
    <main className="content">
      <SearchForm
        query={localStorage.getItem(filmQuery)}
        isShortFilm={localStorage.getItem(filmDuration) === 'true' ? true : false}
        onSearch={handleSearch}
      />
      {isPreloading ? <Preloader /> : searchResults.length ?
        <MoviesCardList
          movies={searchResults.slice(0, visibleCardsCount)}
          onDeleteMovie={handleDeleteMovie}
        /> : <NotFoundError />
      }
    </main>
  )
}
  
export default SavedMovies;