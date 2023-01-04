import { useState, useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { Circles } from 'react-loader-spinner';
import css from './MovieDetails.module.css';
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
    text-decoration: underline;
  }
`

export const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=caf44dbf54ac11048f070c6f191773d2&language=en-US`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          navigate("/", { replace: true });
          return alert('Щось пішло не так. На даний момент інформація про фільм недоступна...');
        })
        .then(res => {
          setMovie(res);
          setImage(`https://image.tmdb.org/t/p/w500${res.poster_path}`);
          console.log(res);
        })
        .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [movieId, navigate]);

  const handleGoBack = () => {
    navigate("/", { replace: true });
  }

  return (
    <div className={css.MovieBlock}>
      {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          visible={true}
      />}
      {error && <h2>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
      {movie && (
        <>
          <button className={css.btnGoBack} onClick={handleGoBack}>{'<< '}Go back</button>
          <div className={css.mainMovieBlock}>
            <img src={image} alt="movie poster" height='300px' />
            <div className={css.mainMovieInfo}>
              <h2>{movie.title} ({movie.release_date.slice(0, 4)})</h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genresItem => (<li key={genresItem.name}>{genresItem.name}</li>))}</p>
            </div>
          </div>
          <div className={css.additionalInfoBlock}>
            <h3>Additional information</h3>
            <ul>
              <li><StyledLink to='cast'>Cast</StyledLink></li>
              <li><StyledLink to='reviews'>Reviews</StyledLink></li>
            </ul>
          </div>
        </>
      )}
      <Outlet/>
    </div>
    
  )
}