import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import SearchIcon from "../../assets/search.svg";
import { loadMoviesByKeyword, loadMovies, setIsNoMoviesFound } from "../../store/moviesSlice/actions";
import css from "./Searchbar.module.css";

const selectError = (state) => state.movies.error;

export default function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("searchKey") ?? "");

  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    const title = searchParams.get("searchKey") ?? "";
    if (keyword === title) {
      return;
    }
    setKeyword(title);
    // dispatch(setIsNoMoviesFound(false));
    // eslint-disable-next-line
  }, [searchParams]);

  function onSearchSubmit(e) {
    e.preventDefault();
    setSearchParams({
      searchKey: keyword,
    });

    // if (!keyword) {
    //   dispatch(setIsNoMoviesFound(false));
    //   dispatch(loadMovies());
    // } else {
    //   dispatch(loadMoviesByKeyword(keyword));
    // }
  }
  return (
    <form className={css.form} onSubmit={onSearchSubmit}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          placeholder="Search movies..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></input>
        <button className={css.searchButton}>
          <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
        </button>
      </div>
      {error && <p className={css.errorText}>{error}</p>}
    </form>
  );
}
