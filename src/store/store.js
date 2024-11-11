import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

import moviesReducer from "./moviesSlice/reducer";
import modalReducer from "./modalSlice/reducer";
import libraryReducer from "./librarySlice/reducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  modal: modalReducer,
  library: libraryReducer,
});

const combinedMiddlwares = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeWithDevTools(combinedMiddlwares));
