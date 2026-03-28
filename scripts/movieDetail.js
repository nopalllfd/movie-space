import { getDetailsMovie } from './services/detailMovieService.js';
import { renderDetailMovie } from './ui/movieDetail.js';

const userLogout = () => {
  const logout = localStorage.setItem('isLogin', 'no');
  if (logout) {
    return (window.location.href = './pages/login.html');
  }
};

const loginButton = document.getElementById('login-button');
const init = async () => {
  const loginStatus = isLogin();
  if (loginStatus) {
    loginButton.innerText = 'LOGOUT';
    loginButton.classList.add('bg-red-500');
    loginButton.addEventListener('click', () => userLogout());
  }
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  console.log(movieId);
  const movie = await getDetailsMovie(movieId);
  return renderDetailMovie(movie);
};

init();
