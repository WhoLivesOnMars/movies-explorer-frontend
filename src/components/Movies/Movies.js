import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundError from '../NotFoundError/NotFoundError';
import api from '../../utils/MainApi';
import bfmoviesApi from '../../utils/MoviesApi';
import MovieSearch from '../../utils/MovieSearch';
import useWindowWidth from '../../hooks/useWindowWidth';
import { checkToken } from '../../utils/auth.js';
import { allMoviesStorage, SMALL, MEDIUM, INTERMEDIATE } from '../../utils/Constants';
import './Movies.css';

function Movies() {
  
  const { localFilms, filmResult, filmQuery, filmDuration } = allMoviesStorage;
  const windowWidth = useWindowWidth();
  const [isPreloading, setPreloading] = useState(true);
  const [bfMovies, setBfMovies] = useState(JSON.parse(localStorage.getItem(localFilms)) || []);
  const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem(filmResult)) || {});
  const [savedMovies, setSavedMovies] = useState([]);
  const [cardsInRow, setCardsInRow] = useState({ first: '', next: '' });
  const [visibleCardsCount, setVisibleCardsCount] = useState(cardsInRow.first);

  const movieSearch = new MovieSearch(bfMovies);

  useEffect(() => {
    const token = localStorage.getItem('token');
    checkToken(token);
    api.getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => console.error('Error in api.getMovies:', err));
    if (!bfMovies.length) {
      bfmoviesApi.getMovies()
        .then((res) => {
          setBfMovies(res);
          localStorage.setItem(localFilms, JSON.stringify(res));
        })
        .catch((err) => console.error('Error in bfmoviesApi.getMovies:', err));
    }
    setPreloading(false);
  }, []);

  useEffect(() => {
    if (!searchResults.length) {
      setSearchResults(bfMovies)
    }
  }, [bfMovies])

  useEffect(() => {
    if (windowWidth >= INTERMEDIATE) {
      setCardsInRow({ first: 16, next: 4 })
    } else if (windowWidth >= MEDIUM) {
      setCardsInRow({ first: 12, next: 3 })
    } else if (windowWidth >= SMALL) {
      setCardsInRow({ first: 8, next: 2 })
    } else {
      setCardsInRow({ first: 5, next: 2 })
    }
  }, [windowWidth]);

  useEffect(() => {
    setVisibleCardsCount(cardsInRow.first);
  }, [cardsInRow]);

  function handleShowMore() {
    const newVisibleCount = visibleCardsCount + cardsInRow.next;
    setVisibleCardsCount(newVisibleCount);
  }

  function handleSearch(query, isShortFilm) {
    const results = movieSearch.search(query, isShortFilm);
    setSearchResults(results);
    localStorage.setItem(filmResult, JSON.stringify(results));
    localStorage.setItem(filmQuery, query);
    localStorage.setItem(filmDuration, isShortFilm);
  };

  function handleSaveMovie(movie) {
    console.log(movie);
    api.saveMovies(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
    .catch((err) => {
      console.error('Error while sending movie to server:', err);
    });
  }

  function handleDeleteMovie(movie) {
    const id = savedMovies.find((elm) => elm.movieId === movie.id)._id;
    api.deleteMovie(id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter((elm) => elm._id !== id);
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleCheckSaving(movie) {
    console.log('movie:', movie);
    console.log('savedMovies:', savedMovies);
    return savedMovies.some((elm) => elm.movieId === movie.id);
  };

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
        onShowMore={handleShowMore}
        showMoreVisibility={searchResults.length > visibleCardsCount}
        onSaveMovie={handleSaveMovie}
        onDeleteMovie={handleDeleteMovie}
        onCheckSaving={handleCheckSaving}
      /> : <NotFoundError />
      }
    </main>
  )
}
  
export default Movies;