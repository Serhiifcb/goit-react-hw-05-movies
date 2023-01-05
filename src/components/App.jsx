import { Home } from "pages/Home/Home";
import { MovieDetails } from "pages/MovieDetails/MovieDetails";
import { Movies } from "pages/Movies/Movies";
import { Routes, Route, NavLink } from "react-router-dom";
import { Cast } from "./Cast/Cast";
import { Reviews } from "./Reviews/Reviews";
import css from './App.module.css'
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: black;
  &.active {
    color: #5a70ec;
  }
  &:hover {
    color: #5a70ec;
    scale: 1.1;
  }

`
export const App = () => {
  return (
    <div className={css.general}>
      <nav className={css.navMenu}>
        <StyledLink to="/" >Home</StyledLink>
        <StyledLink to="/movies" >Movies</StyledLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
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
