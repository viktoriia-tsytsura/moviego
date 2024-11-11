function sendRequest(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTI1YzY2Y2NlMDE4NWIxOWU3N2VjNzBlNDRhYjY0NiIsIm5iZiI6MTcyNDE2MzM3Mi42NzEwODksInN1YiI6IjY1YmQ0OWMzYzE0NGRkMDE3YzAxNWJkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._eWF2PumiE3KQDQ3gmV7BLrxfi5GwKyYxQ2DxzUU7kQ",
    },
  };

  return fetch(url, options).then((response) => response.json());
}

export function getGenres() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTI1YzY2Y2NlMDE4NWIxOWU3N2VjNzBlNDRhYjY0NiIsIm5iZiI6MTcyOTY5ODUxMy43MTk1ODQsInN1YiI6IjY1YmQ0OWMzYzE0NGRkMDE3YzAxNWJkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.etnfnrgPkfi_RAvIWth9TgbfexjHEOF6UGj77p7Jp98",
    },
  };

  return fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options).then((res) =>
    res.json()
  );
}

export function getMoviesTrending(page = 1) {
  return sendRequest(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`);
}
export function getSearchMovies(keyword, page = 1) {
  return sendRequest(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`
  );
}
export function getMovieById(id) {
  return sendRequest(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
}
