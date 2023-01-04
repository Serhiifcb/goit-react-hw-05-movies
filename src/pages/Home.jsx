import { Link } from "react-router-dom";
import css from './Home.module.css'

export const Home = ({ movies }) => {
  return (
    <div className={css.trendingList}>
      <h1 className={css.trendingTitle}>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.name || movie.title}</Link>
          </li>))}
      </ul>
    </div>
  )
}