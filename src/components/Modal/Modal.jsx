import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Blocks } from "react-loader-spinner";

import CloseIcon from "../../assets/close.svg";
import css from "../Modal/Modal.module.css";
import { loadMovieInfoById } from "../../store/modalSlice/actions";
import {
  addToWatchedCombined,
  addToQueuedCombined,
  removeFromWatchedCombined,
  removeFromQueuedCombined,
} from "../../store/librarySlice/actions";
import { resolveGenreNames } from "../../services/genreUtils";

const selectGenres = (state) => state.movies.genres;

const selectMovie = (state) => state.modal.movieInfo;
const selectWatchedMovies = (state) => state.library.watched;
const selectQueuedMovies = (state) => state.library.queued;

export default function Modal() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);
  const allGenresInfo = useSelector(selectGenres);
  const watched = useSelector(selectWatchedMovies);
  const queued = useSelector(selectQueuedMovies);

  useEffect(() => {
    dispatch(loadMovieInfoById(id));
  }, [dispatch, id]);

  function onAddToWatchedButtonClick() {
    dispatch(addToWatchedCombined(movie));
  }
  function onAddToQueuedButtonClick() {
    dispatch(addToQueuedCombined(movie));
  }
  function onRemoveFromWatchedButtonClick() {
    dispatch(removeFromWatchedCombined(movie.id));
  }
  function onRemoveFromQueuedButtonClick() {
    dispatch(removeFromQueuedCombined(movie.id));
  }

  if (!movie) {
    return (
      <div
        id="modal-overlay"
        className={css.modalOverlay}
        onClick={(e) => {
          if (e.target.id === "modal-overlay") {
            navigate(location.state.from);
          }
        }}
      >
        <Blocks />
      </div>
    );
  }

  const string = allGenresInfo.length ? resolveGenreNames(movie.genres, allGenresInfo) : "";

  const isMovieInWatched = watched.some((item) => item.id === movie.id);
  const isMovieInQueued = queued.some((item) => item.id === movie.id);

  return (
    <div
      id="modal-overlay"
      className={css.modalOverlay}
      onClick={(e) => {
        if (e.target.id === "modal-overlay") {
          navigate(location.state.from);
        }
      }}
    >
      <div className={css.modalContent}>
        <button
          className={css.closeButton}
          onClick={() => {
            navigate(location.state.from);
          }}
        >
          <img className={css.closeIcon} src={CloseIcon} alt="Close Icon" width="40" height="40" />
        </button>

        <div className={css.movieContent}>
          <img src={`https://image.tmdb.org/t/p/w400${movie.poster}`} alt={movie.title}></img>
          <div className={css.movieInfo}>
            <div>
              <h1 className={css.title}>{movie.title}</h1>

              <div className={css.info}>
                <div className={css.votes}>
                  <span className={css.label}>Vote / Votes</span>
                  <span className={css.value}>
                    {movie.vote_average} / {movie.vote_count}
                  </span>
                </div>

                <div className={css.popularity}>
                  <span className={css.label}>Popularity</span>
                  <span className={css.value}>{movie.popularity}</span>
                </div>

                <div className={css.originalTitle}>
                  <span className={css.label}>Original Title</span>
                  <span className={css.value}>{movie.title}</span>
                </div>

                <div className={css.genre}>
                  <span className={css.label}>Genre</span>
                  <span className={css.value}>{string}</span>
                </div>
              </div>
            </div>
            <div className={css.movieDescription}>
              <h2>About</h2>
              <p>{movie.overview}</p>
            </div>
            <div className={css.buttons}>
              {!isMovieInWatched ? (
                <button className={css.button} onClick={onAddToWatchedButtonClick}>
                  Add to watched
                </button>
              ) : (
                <button className={css.button} onClick={onRemoveFromWatchedButtonClick}>
                  Remove from watched
                </button>
              )}
              {!isMovieInQueued ? (
                <button className={css.button} onClick={onAddToQueuedButtonClick}>
                  Add to queue
                </button>
              ) : (
                <button className={css.button} onClick={onRemoveFromQueuedButtonClick}>
                  Remove from queue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
