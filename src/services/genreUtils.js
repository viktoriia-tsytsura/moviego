export function resolveGenreNames(movieGenres, generalGenresInfo) {
  const movieGenresByName = movieGenres.map((currentId) => {
    const genreInfo = generalGenresInfo.find((genre) => genre.id === currentId);
    return genreInfo.name;
  });

  return movieGenresByName.join(" ");
}
