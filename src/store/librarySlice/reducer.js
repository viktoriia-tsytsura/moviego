const watched = JSON.parse(localStorage.getItem("watched")) ?? [];
const queued = JSON.parse(localStorage.getItem("queued")) ?? [];

const initialState = {
  watched,
  queued,
};

export default function libraryReducer(state = initialState, action) {
  if (action.type === "addToLibrary/addToWatched") {
    return {
      ...state,
      watched: [...state.watched, action.payload],
    };
  }
  if (action.type === "addToLibrary/addToQueued") {
    return {
      ...state,
      queued: [...state.queued, action.payload],
    };
  }

  if (action.type === "addToLibrary/removeFromWatched") {
    return {
      ...state,
      watched: state.watched.filter((item) => item.id !== action.payload),
    };
  }
  if (action.type === "addToLibrary/removeFromQueued") {
    return {
      ...state,
      queued: state.queued.filter((item) => item.id !== action.payload),
    };
  }
  return state;
}
