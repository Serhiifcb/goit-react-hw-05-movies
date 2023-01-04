import css from './Cast.module.css'
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=caf44dbf54ac11048f070c6f191773d2&language=en-US`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return alert('Щось пішло не так. На даний момент інформація про фільм недоступна...');
        })
        .then(res => {
          setCast(res.cast);
          console.log(res.cast);
        })
        .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
    {loading && <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          visible={true}
      />}
    {error && <h2>Щось пішло не так. Немає відповіді на Ваш пошуковий запит</h2>}
    {cast && (
      <ul>
        {cast.map(actor =>
        (<li key={actor.id} className={css.actor}>
          {actor.profile_path &&
            <>
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="actor foto" width="120px" />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
            </>
          }
          </li>)
        )}
      </ul>
      )}
    </>
  )
}