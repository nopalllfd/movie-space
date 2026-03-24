// File: watchlistService.js
const STORAGE_KEY = 'tmdb_watchlist';

export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const isMovieInWatchlist = (movieId) => {
  const currentWatchlist = getWatchlist();
  return currentWatchlist.some((item) => item.id === movieId);
};

export const toggleWatchlist = (movie) => {
  let currentWatchlist = getWatchlist();
  const movieIndex = currentWatchlist.findIndex((item) => item.id === movie.id);

  if (movieIndex === -1) {
    currentWatchlist.push(movie);
  } else {
    currentWatchlist.splice(movieIndex, 1);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWatchlist));
};
