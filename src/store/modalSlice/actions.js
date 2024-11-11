import { getMovieById } from "../../services/getMovies";

export const loadMovieInfoById = (id) => {
  return (dispatch, getState) => {
    getMovieById(id)
      .then((data) => {
        const info = {
          id: data.id,
          title: data.original_title,
          overview: data.overview,
          poster: data.poster_path,
          vote_average: data.vote_average,
          vote_count: data.vote_count,
          popularity: data.popularity,
          genres: data.genres.map((item) => item.id),
        };
        dispatch(movieInfoLoaded(info));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const movieInfoLoaded = (movieInfo) => {
  return {
    type: "modal/setMovieInfo",
    payload: movieInfo,
  };
};
