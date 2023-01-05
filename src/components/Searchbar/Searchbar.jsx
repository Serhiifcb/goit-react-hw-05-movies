import React from "react";
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { useState } from "react";
import PropTypes from 'prop-types';

export const Searchbar = ({ value, onSubmit, onChange }) => {
  
  const [searchImageText, setSearchImageText] = useState('');

  const handleChange = event => {
    setSearchImageText(event.currentTarget.value.toLowerCase());
    onChange(event.currentTarget.value.toLowerCase())
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (searchImageText.trim() === '') {
      return alert("Введіть текст для пошуку");
    }
    onSubmit(searchImageText);
  };

  return (
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch size={20}/>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.searchFormInput}
            type="text"
            value={value}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </header> 
    )
}

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}