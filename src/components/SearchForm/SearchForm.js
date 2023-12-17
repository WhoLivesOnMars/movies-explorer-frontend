import React, {useState} from 'react';
import './SearchForm.css';

function SearchForm({ query, isShortFilm, onSearch }) {
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [durationFilm, setDurationFilm] = useState(isShortFilm || false);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setDurationFilm(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, durationFilm);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" name="searchForm" onSubmit={handleSubmit}>
          <div className="search-form__field">
            <input 
              className="search-form__input" 
              id="search"
              name="searchInput"
              type="text"
              placeholder="Фильм"
              value={searchQuery}
              onChange={handleQueryChange}
            />
            <button className="search-form__button" type="submit" />
          </div>
          <div className="search-form__checkbox">
            <input
              className="search-form__checkbox-input"
              id="search-form__checkbox-input"
              type="checkbox"
              value="yes"
              checked={durationFilm}
              onChange={handleCheckboxChange}
            />
            <label className="search-form__checkbox-text" htmlFor="search-form__checkbox-input">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;