import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import LibraryHeader from "../../components/LibraryHeader/LibraryHeader";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";

const selectTotalPagesWatched = (state) => Math.ceil(state.library.watched.length / 20);
const selectTotalPagesQueued = (state) => Math.ceil(state.library.queued.length / 20);

const watchedSelector = createSelector(
  (state) => state.library.watched,

  (watched) => (currentPage) => watched.slice((currentPage - 1) * 20, currentPage * 20)
);

const queuedSelector = createSelector(
  (state) => state.library.queued,

  (queued) => (currentPage) => queued.slice((currentPage - 1) * 20, currentPage * 20)
);

export default function Library() {
  const location = useLocation();
  const totalPagesWatched = useSelector(selectTotalPagesWatched);
  const totalPagesQueued = useSelector(selectTotalPagesQueued);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? 1);

  const paginatedWatchSelector = useSelector(watchedSelector);
  const watchedMovies = paginatedWatchSelector(currentPage);

  const paginatedQueuedSelector = useSelector(queuedSelector);
  const queuedMovies = paginatedQueuedSelector(currentPage);

  const isWatched = location.pathname.endsWith("watched");

  function onPageChange(newCurrentPage) {
    searchParams.set("page", newCurrentPage);
    setSearchParams(searchParams);
  }

  const movies = isWatched ? watchedMovies : queuedMovies;
  const totalPages = isWatched ? totalPagesWatched : totalPagesQueued;

  return (
    <>
      <LibraryHeader />
      <div className="container">
        <MovieList listItems={movies} />
        {totalPages > 0 ? (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        ) : undefined}
      </div>

      <Outlet />
    </>
  );
}
