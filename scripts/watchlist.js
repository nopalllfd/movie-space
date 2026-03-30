import { getWatchlist } from './services/watchlistService.js';
import { renderLoginButton } from './ui/headerUi.js';
import { renderMovies } from './ui/movieUi.js';

const init = async () => {
  renderLoginButton('../auth/login.html');
  const movies = await getWatchlist();
  renderMovies(movies, true);
};

init();
