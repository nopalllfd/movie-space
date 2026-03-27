import { getMoviesTotal, getMovies, getGenres, getPagination } from './services/moviesService.js';
import { renderTotalMovies, renderMovies, renderGenreDropdown, renderPagination } from './ui/movieUi.js';

const genreSelect = document.getElementById('genre-select');

const init = async () => {
  if (genreSelect) {
    genreSelect.classList.add('bg-gray-900');

    genreSelect.addEventListener('change', async () => {
      const selectedId = genreSelect.value;
      const url = new URL(window.location);
      const genreSelected = genres.genres.find((g) => g.id == selectedId);
      url.searchParams.set('genre', genreSelected.name);
      window.history.pushState({}, '', url);
      console.log('Filter diklik, ID:', selectedId);
      const filteredMovies = await getMovies(selectedId, 1);
      renderMovies(filteredMovies);

      const newPages = await getPagination(selectedId);
      renderPagination(newPages, async (page) => {
        const movies = await getMovies(selectedId, page);
        renderMovies(movies);
      });
    });
  }

  const genres = await getGenres();
  renderGenreDropdown(genres);

  const totalMovies = await getMoviesTotal();
  renderTotalMovies(totalMovies);

  const initialMovies = await getMovies();
  renderMovies(initialMovies);
  renderPagination(await getPagination(), async (page) => {
    console.log(page);
    const selectedGenreId = genreSelect.value;
    const movies = await getMovies(selectedGenreId, page);
    console.log(movies);
    renderMovies(movies);
  });
};

init();
