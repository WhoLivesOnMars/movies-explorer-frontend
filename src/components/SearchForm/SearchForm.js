import React from 'react';
import './SearchForm.css';

function SearchForm() {
 
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" name="searchForm">
          <div className="search-form__field">
            <input 
              className="search-form__input" 
              id="search"
              name="searchInput"
              type="text"
              placeholder="Фильм"
              required
            />
            <button className="search-form__button" type="submit" />
          </div>
          <div className="search-form__checkbox">
            <input
              className="search-form__checkbox-input"
              id="search-form__checkbox-input"
              type="checkbox"
            />
            <label className="search-form__checkbox-text" htmlFor="search-form__checkbox-input">Короткометражки</label>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;