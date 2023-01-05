import { Link, useLocation } from "react-router-dom";
import css from './Home.module.css';
import PropTypes from 'prop-types';

export const Home = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.trendingList}>
      <h1 className={css.trendingTitle}>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{from: location}} className={css.movieLink}>{movie.name || movie.title}</Link>
          </li>))}
      </ul>
    </div>
  )
}

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
    })).isRequired,
}