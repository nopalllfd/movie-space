import { getWatchlist } from './services/watchlistService.js';
import { renderMovies } from './ui/movieUi.js';

const init = async () => {
  const movies = await getWatchlist();
  renderMovies(movies, true);
};

init();
