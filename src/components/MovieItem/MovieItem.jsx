import { Link, useSearchParams, useLocation } from "react-router-dom";
import { resolveGenreNames } from "../../services/genreUtils";

import css from "../MovieItem/MovieItem.module.css";
import { useSelector } from "react-redux";

const selectGenres = (state) => state.movies.genres;

export default function MovieItem({ movie }) {
  const allGenresInfo = useSelector(selectGenres);
  const [searchParams] = useSearchParams();

  const linkPostfix = searchParams.get("searchKey") ? `?${searchParams.toString()}` : "";
  const location = useLocation();

  console.log(movie, allGenresInfo);
  const string = allGenresInfo.length ? resolveGenreNames(movie.genres, allGenresInfo) : "";
  console.log(string);

  return (
    <Link state={{ from: location }} to={`movie-details/${movie.id}${linkPostfix}`}>
      <li className={css.movieItem}>
        <img
          className={css.movieImg}
          src={`https://image.tmdb.org/t/p/w400${movie.poster}`}
          alt={movie.title}
        />
        <p>{movie.title}</p>
        <p>{string}</p>
      </li>
    </Link>
  );
}
