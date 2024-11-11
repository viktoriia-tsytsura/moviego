import {
  addMovieToLocalStorageQueued,
  addMovieToLocalStorageWatched,
  removeMovieFromLocalStorageWatched,
  removeMovieFromLocalStorageQueued,
} from "../../services/localStorage";

export const addToWatchedCombined = (movie) => {
  return (dispatch, getState) => {
    dispatch(addToWatched(movie));
    addMovieToLocalStorageWatched(movie);
  };
};

const addToWatched = (movie) => {
  return {
    type: "addToLibrary/addToWatched",
    payload: movie,
  };
};

export const addToQueuedCombined = (movie) => {
  return (dispatch, getState) => {
    dispatch(addToQueued(movie));
    addMovieToLocalStorageQueued(movie);
  };
};

const addToQueued = (movie) => {
  return {
    type: "addToLibrary/addToQueued",
    payload: movie,
  };
};

export const removeFromWatchedCombined = (movieId) => {
  return (dispatch, getState) => {
    dispatch(removeFromWatched(movieId));
    removeMovieFromLocalStorageWatched(movieId);
  };
};

const removeFromWatched = (movieId) => {
  return {
    type: "addToLibrary/removeFromWatched",
    payload: movieId,
  };
};

export const removeFromQueuedCombined = (movieId) => {
  return (dispatch, getState) => {
    dispatch(removeFromQueued(movieId));
    removeMovieFromLocalStorageQueued(movieId);
  };
};

const removeFromQueued = (movieId) => {
  return {
    type: "addToLibrary/removeFromQueued",
    payload: movieId,
  };
};
