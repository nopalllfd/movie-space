import { getMoviesTotal, getMovies } from './services/moviesService.js';
import { renderTotalMovies, renderMovies } from './ui/movieUi.js';
import { toggleWatchlist } from './services/watchlistService.js';

const init = async () => {
  const totalMovies = await getMoviesTotal();
  renderTotalMovies(totalMovies);

  const movies = await getMovies();
  renderMovies(movies);
};

init();
