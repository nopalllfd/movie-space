import { getMoviesTotal, getMovies, getGenres, getPagination } from './services/moviesService.js';
import { renderTotalMovies, renderMovies, renderGenreDropdown, renderPagination, loading, stopLoading } from './ui/movieUi.js';

export const isLogin = () => {
  const loginStatus = localStorage.getItem('isLogin');
  if (loginStatus == 'yes') {
    return true;
  } else {
    return false;
  }
};

export const userLogout = () => {
  const logout = localStorage.setItem('isLogin', 'no');
  if (logout) {
    return (window.location.href = './pages/login.html');
  }
};

const genreSelect = document.getElementById('genre-select');
const loginButton = document.getElementById('login-button');
const init = async () => {
  const loginStatus = isLogin();
  if (loginStatus) {
    loginButton.innerText = 'LOGOUT';
    loginButton.classList.add('bg-red-500');
    loginButton.addEventListener('click', () => userLogout());
  }
  loading();
  try {
    const genresData = await getGenres();
    renderGenreDropdown(genresData);

    const totalMovies = await getMoviesTotal();
    renderTotalMovies(totalMovies);

    const initialMovies = await getMovies();
    renderMovies(initialMovies);

    const initialPagination = await getPagination();
    renderPagination(initialPagination, async (page) => {
      loading();
      const selectedGenreId = genreSelect.value;
      const movies = await getMovies(selectedGenreId, page);
      renderMovies(movies);
      stopLoading();
    });

    if (genreSelect) {
      genreSelect.classList.add('bg-gray-900');
      genreSelect.addEventListener('change', async () => {
        loading();
        const selectedId = genreSelect.value;
        const url = new URL(window.location);
        const genreSelected = genresData.genres.find((g) => g.id == selectedId);
        if (genreSelected) {
          url.searchParams.set('genre', genreSelected.name);
          window.history.pushState({}, '', url);
        }

        const filteredMovies = await getMovies(selectedId, 1);
        renderMovies(filteredMovies);

        const newPages = await getPagination(selectedId);
        renderPagination(newPages, async (page) => {
          loading();
          const movies = await getMovies(selectedId, page);
          renderMovies(movies);
          stopLoading();
        });
        stopLoading();
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    stopLoading();
  }
};

init();
