import { getMoviesTotal, getMovies, getGenres, getSortByOptions } from './services/moviesService.js';
import { renderLoginButton } from './ui/headerUi.js';
import { renderTotalMovies, renderMovies, renderGenreDropdown, renderPagination, loading, stopLoading, renderSortByOptions } from './ui/movieUi.js';

const genreSelect = document.getElementById('genre-select');

const ITEMS_PER_PAGE = 20;

const updateContent = async (genreId = '', page = 1) => {
  loading();
  try {
    const [movies, total] = await Promise.all([getMovies(genreId, page), getMoviesTotal(genreId)]);

    renderMovies(movies);
    renderTotalMovies(total);
    renderSortByOptions(getSortByOptions());

    renderPagination(total, ITEMS_PER_PAGE, page, (newPage) => {
      updateContent(genreId, Number(newPage));
    });
  } catch (error) {
    console.error(error);
  } finally {
    stopLoading();
  }
};

const init = async () => {
  renderLoginButton('./pages/auth/login.html');
  loading();

  try {
    const genresData = await getGenres();
    renderGenreDropdown(genresData);

    await updateContent('', 1);

    if (genreSelect) {
      genreSelect.classList.add('bg-gray-900');
      genreSelect.addEventListener('change', async () => {
        const selectedId = genreSelect.value;
        const url = new URL(window.location);
        const genreSelected = genresData.genres.find((g) => g.id == selectedId);

        if (genreSelected) {
          url.searchParams.set('genre', genreSelected.name);
          window.history.pushState({}, '', url);
        }

        await updateContent(selectedId, 1);
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    stopLoading();
  }
};

init();
