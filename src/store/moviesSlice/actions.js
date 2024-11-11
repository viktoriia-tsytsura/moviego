import { getMoviesTrending, getSearchMovies, getGenres } from "../../services/getMovies";

export const loadGenres = () => {
  return (dispatch, getState) => {
    getGenres().then((response) => dispatch(setGenres(response.genres)));
  };
};

export const loadMovies = (page) => {
  return (dispatch, getState) => {
    dispatch(setError(""));
    dispatch(setIsLoading(true));
    getMoviesTrending(page)
      .then((data) => {
        const convertedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: movie.poster_path,
          score: movie.vote_avarage,
          genres: movie.genre_ids,
        }));
        dispatch(setIsTrendingShown(true));
        dispatch(moviesLoaded(convertedMovies));
        dispatch(setTotalPages(Math.min(data.total_pages, 500)));
        dispatch(setCurrentPage(data.page));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loadMoviesByKeyword = (keyword, page) => {
  return (dispatch, getState) => {
    dispatch(setError(""));
    dispatch(setIsLoading(true));
    getSearchMovies(keyword, page)
      .then((data) => {
        if (data.results.length === 0) {
          dispatch(loadMovies());
          dispatch(setIsNoMoviesFound(true));
          dispatch(setError("No movies found"));
          return;
        }
        const convertedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: movie.poster_path,
          score: movie.vote_avarage,
          genres: movie.genre_ids,
        }));
        dispatch(setIsTrendingShown(false));
        dispatch(moviesLoaded(convertedMovies));
        dispatch(setTotalPages(Math.min(data.total_pages, 500)));
        dispatch(setCurrentPage(data.page));
        dispatch(setIsNoMoviesFound(false));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const moviesLoaded = (movies) => {
  return {
    type: "movies/moviesLoaded",
    payload: movies,
  };
};
export const setError = (error) => {
  return {
    type: "movies/setError",
    payload: error,
  };
};
export const setIsLoading = (bool) => {
  return {
    type: "movies/setIsLoading",
    payload: bool,
  };
};
export const setIsTrendingShown = (bool) => {
  return {
    type: "movies/setIsTrendingShown",
    payload: bool,
  };
};
export const setIsNoMoviesFound = (bool) => {
  return {
    type: "movies/setIsNoMoviesFound",
    payload: bool,
  };
};
const setTotalPages = (amount) => {
  return {
    type: "movies/setTotalPages",
    payload: amount,
  };
};
export const setCurrentPage = (page) => {
  return {
    type: "movies/setCurrentPage",
    payload: page,
  };
};
const setGenres = (genres) => {
  return {
    type: "movies/setGenres",
    payload: genres,
  };
};
