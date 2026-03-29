import { getWatchlist } from './services/watchlistService.js';
import { renderLoginButton } from './ui/headerUi.js';
import { renderMovies } from './ui/movieUi.js';
import { initResponsiveNav } from './ui/responsiveNav.js';

const init = async () => {
  initResponsiveNav();
  renderLoginButton('../auth/login.html');
  const movies = await getWatchlist();
  renderMovies(movies, true);
};

init();
