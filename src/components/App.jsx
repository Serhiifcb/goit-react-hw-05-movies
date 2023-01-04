import { Home } from "pages/Home";
import { MovieDetails } from "pages/MovieDetails";
import { Movies } from "pages/Movies";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Cast } from "./Cast";
import { Reviews } from "./Reviews";
import { Circles } from 'react-loader-spinner'
import css from './App.module.css'
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: black;
  &.active {
    color: violet;
  }
  &:hover {
    color: violet;
    scale: 1.1;
  }

`

export const App = () => {
  const [moviesTrends, setMoviesTrends] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=caf44dbf54ac11048f070c6f191773d2`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          
          return alert('Щось пішло не так. Немає списку трендових фільмів...');
        })
        .then(res => {
          setMoviesTrends(res.results);
          console.log(res.results);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);

  return (
    <div className={css.general}>
      <nav className={css.navMenu}>
        <StyledLink to="/" >Home</StyledLink>
        <StyledLink to="/movies" >Movies</StyledLink>
      </nav>
      {error && <h2>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
      {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          visible={true}
        />}
      <Routes>
        <Route path="/" element={<Home movies={moviesTrends} />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movies/:movieId" element={<MovieDetails/>}>
          <Route path="cast" element={<Cast/>} />
          <Route path="reviews" element={<Reviews/>} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};
