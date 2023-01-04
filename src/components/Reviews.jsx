import css from './Reviews.module.css'
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=caf44dbf54ac11048f070c6f191773d2&language=en-US`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return alert('Щось пішло не так. На даний момент інформація про фільм недоступна...');
      })
      .then(res => {
        setReviews(res.results);
        console.log(res.results);
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
      {(reviews.length < 1) ? "Фільм немає відгуків" : ""}
      {reviews && (
        <ul>
          {reviews.map(review =>
          (<li key={review.id} className={css.actor}>
            {reviews &&
              <>
              <p><b>Author: {review.author}</b></p>
              <p>{review.content}</p>
              </>
            }
            </li>)
          )}
        </ul>
      )}
    </>
  )
}