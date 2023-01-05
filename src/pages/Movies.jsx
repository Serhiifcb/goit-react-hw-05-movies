import React from "react";
import { useEffect } from "react";
import css from './Movies.module.css';
import { useState } from "react";
import { Circles } from 'react-loader-spinner'
import { Searchbar } from "../components/Searchbar";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [searchMovieText, setSearchMovieText] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);
  
  const changeQuery = value => {
    setSearchParams(value !== '' ? {query: value} : {})
  }

  const formSubmitHandler = searchText => {
    if (searchMovieText !== searchText) {
      setSearchMovieText(searchText); 
      setMovies([]);
      };
  }

  useEffect(() => {
    if (searchMovieText) {
      setLoading(true);
      setError(null);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=caf44dbf54ac11048f070c6f191773d2&language=en-US&page=1&query=${searchMovieText}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return alert('Щось пішло не так. Немає відповіді на Ваш пошуковий запит...');
        })
        .then(res => {
          setMovies(res.results);
          if (res.total_results === 0) {
            return alert('По Вашому запиту не знайдено жодного фільму');
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchMovieText])

  return (
    <>
      {error && <h2 className={css.errorMessage}>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
      <Searchbar value={query} onSubmit={formSubmitHandler} onChange={changeQuery} />
      {loading && <Circles
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="circles-loading"
        wrapperClass={css.loading}
        visible={true}
      />}
      <ul className={css.searchList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{from: location}} className={css.movieLink}>{movie.title}</Link>
        </li>
      ))}</ul>
    </> 
    )
}