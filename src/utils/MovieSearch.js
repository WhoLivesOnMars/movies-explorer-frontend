class MovieSearch {
  constructor(moviesData) {
    this._moviesData = moviesData;
  }

  _isShort(status, cards) {
    return status ? cards.filter(movie => movie.duration <= 40) : cards
  }

  search(query, isShortFilm) {
    const lowercaseQuery = query.toLowerCase();

    return this._isShort(isShortFilm, this._moviesData).filter(movie =>
      movie.nameRU.toLowerCase().includes(lowercaseQuery) ||
        (movie.nameEN && movie.nameEN.toLowerCase().includes(lowercaseQuery)));
  }
}

export default MovieSearch;