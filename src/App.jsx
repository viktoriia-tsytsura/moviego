import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Modal from "./components/Modal/Modal";
import { loadGenres } from "./store/moviesSlice/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGenres());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movie-details/:id" element={<Modal />} />
        </Route>

        <Route path="/library/watched" element={<Library />}>
          <Route path="movie-details/:id" element={<Modal />} />
        </Route>

        <Route path="/library/queued" element={<Library />}>
          <Route path="movie-details/:id" element={<Modal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
