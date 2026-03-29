import { response } from "../response/index.js";
import { isLogin } from "./authorizeService.js";

const STORAGE_KEY = 'tmdb_watchlist';

export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const isMovieInWatchlist = (movieId) => {
  const currentWatchlist = getWatchlist();
  return currentWatchlist.some((item) => item.id === movieId);
};

export const toggleWatchlist = (movie) => {
  const loginStatus = isLogin();
  console.log(loginStatus);
  if (!loginStatus) {
    response('Anda harus login terlebih dahulu', 'red');
    return null;
  }
  let currentWatchlist = getWatchlist();
  const movieIndex = currentWatchlist.findIndex((item) => item.id === movie.id);

  let isAdded = false;
  if (movieIndex === -1) {
    currentWatchlist.push(movie);
    isAdded = true;
  } else {
    currentWatchlist.splice(movieIndex, 1);
    isAdded = false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWatchlist));
  return isAdded;
};
