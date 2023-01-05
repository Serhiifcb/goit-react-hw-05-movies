import { Link, useLocation } from "react-router-dom";
import css from './Home.module.css';
import { useEffect } from "react";
import { useState } from "react";
import { Circles } from 'react-loader-spinner';

export const Home = () => {
  const location = useLocation();
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
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
  }, []);

  return (
    <div className={css.trendingList}>
      {error && <h2>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
      {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          visible={true}
        />}
      <h1 className={css.trendingTitle}>Trending today</h1>
      <ul>
        {moviesTrends.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{from: location}} className={css.movieLink}>{movie.name || movie.title}</Link>
          </li>))}
      </ul>
    </div>
  )
}
