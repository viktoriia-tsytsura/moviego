function addMovieToLocalStorage(movie, itemKey) {
  if (!localStorage.getItem(itemKey)) {
    localStorage.setItem(itemKey, JSON.stringify([movie]));
    return;
  }

  const watched = JSON.parse(localStorage.getItem(itemKey));
  watched.push(movie);
  localStorage.setItem(itemKey, JSON.stringify(watched));
}

export function addMovieToLocalStorageWatched(movie) {
  addMovieToLocalStorage(movie, "watched");
}

export function addMovieToLocalStorageQueued(movie) {
  addMovieToLocalStorage(movie, "queued");
}

function removeMovieFromLocalStorage(movieId, itemKey) {
  const watched = JSON.parse(localStorage.getItem(itemKey));
  const updatedWatched = watched.filter((item) => item.id !== movieId);
  localStorage.setItem(itemKey, JSON.stringify(updatedWatched));
}

export function removeMovieFromLocalStorageWatched(movieId) {
  removeMovieFromLocalStorage(movieId, "watched");
}

export function removeMovieFromLocalStorageQueued(movieId) {
  removeMovieFromLocalStorage(movieId, "queued");
}
