import { getMoviesTotal, getMovies, getGenres } from './services/moviesService.js';
import { renderTotalMovies, renderMovies, renderGenreDropdown } from './ui/movieUi.js';

const genreSelect = document.getElementById('genre-select');

const init = async () => {
  if (genreSelect) {
    genreSelect.classList.add('bg-gray-900');

    genreSelect.addEventListener('change', async () => {
      const selectedId = genreSelect.value;
      console.log('Filter diklik, ID:', selectedId);

      const filteredMovies = await getMovies(selectedId);
      renderMovies(filteredMovies);
    });
  }

  const genres = await getGenres();
  renderGenreDropdown(genres);

  const totalMovies = await getMoviesTotal();
  renderTotalMovies(totalMovies);

  const initialMovies = await getMovies();
  renderMovies(initialMovies);
};

init();
