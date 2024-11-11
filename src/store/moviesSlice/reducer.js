const initialState = {
  movies: [],
  totalPages: null,
  error: "",
  isLoading: false,
  isTrendingShown: true,
  isNoMoviesFound: false,
  genres: [],
};

export default function moviesReducer(state = initialState, action) {
  if (action.type === "movies/moviesLoaded") {
    return {
      ...state,
      movies: action.payload,
    };
  }
  if (action.type === "movies/setError") {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (action.type === "movies/setIsLoading") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }
  if (action.type === "movies/setIsTrendingShown") {
    return {
      ...state,
      isTrendingShown: action.payload,
    };
  }
  if (action.type === "movies/setIsNoMoviesFound") {
    return {
      ...state,
      isNoMoviesFound: action.payload,
    };
  }
  if (action.type === "movies/setTotalPages") {
    return {
      ...state,
      totalPages: action.payload,
    };
  }
  if (action.type === "movies/setCurrentPage") {
    return {
      ...state,
      currentPage: action.payload,
    };
  }
  if (action.type === "movies/setGenres") {
    return {
      ...state,
      genres: action.payload,
    };
  }

  return state;
}
