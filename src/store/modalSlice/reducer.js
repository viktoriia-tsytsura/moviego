const initialState = {
  movieInfo: undefined,
};

export default function modalReducer(state = initialState, action) {
  if (action.type === "modal/setMovieInfo") {
    return {
      ...state,
      movieInfo: action.payload,
    };
  }

  return state;
}
