import { getDetailsMovie } from './services/detailMovieService.js';
import { renderLoginButton } from './ui/headerUi.js';
import { renderDetailMovie } from './ui/movieDetail.js';
import { initResponsiveNav } from './ui/responsiveNav.js';

const init = async () => {
  initResponsiveNav();
  renderLoginButton('../auth/login.html');
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  console.log(movieId);
  const movie = await getDetailsMovie(movieId);
  return renderDetailMovie(movie);
};

init();
