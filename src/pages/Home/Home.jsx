import { useSelector, useDispatch } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Blocks } from "react-loader-spinner";

import { loadMovies, loadMoviesByKeyword, setIsNoMoviesFound } from "../../store/moviesSlice/actions";
import Header from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";

const selectMovies = (state) => state.movies.movies;
const selectIsLoading = (state) => state.movies.isLoading;
const selectIsTrendingShown = (state) => state.movies.isTrendingShown;
const selectIsNoMoviesFound = (state) => state.movies.isNoMoviesFound;
const selectTotalPages = (state) => state.movies.totalPages;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectIsLoading);
  const isTrendingShown = useSelector(selectIsTrendingShown);
  const isNoMoviesFound = useSelector(selectIsNoMoviesFound);
  const totalPages = useSelector(selectTotalPages);

  const currentPage = parseInt(searchParams.get("page") ?? 1);
  const title = searchParams.get("searchKey");

  function onPageChange(newCurrentPage) {
    searchParams.set("page", newCurrentPage);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (title) {
      dispatch(loadMoviesByKeyword(title, currentPage));
    } else {
      dispatch(setIsNoMoviesFound(false));
      dispatch(loadMovies(currentPage));
    }
  }, [dispatch, title, currentPage]);

  return (
    <>
      <Header />
      <div className="container">
        {isLoading && <Blocks />}
        {isNoMoviesFound && <ErrorMessage />}
        {isTrendingShown && !isLoading && <h2 className="title"> Trending now</h2>}

        {!isLoading && <MovieList listItems={movies} />}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      <Outlet />
    </>
  );
}
