import MovieItem from "../MovieItem/MovieItem";

import css from "./MovieList.module.css";

export default function MovieList({ listItems }) {
  return (
    <>
      <ul className={css.movieGallery}>
        {listItems.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}
