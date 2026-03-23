import { fetchMovies } from '../api/moviesApi.js';
import { fetchGenres } from '../api/genresApi.js';

export const getGenres = async () => {
  try {
    const genres = await fetchGenres();
    const data = genres.genres.map((g) => [g.id, g.name]);
    const genreMap = Object.fromEntries(data);
    return genreMap;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMovies = async () => {
  try {
    const data = await fetchMovies();
    const genreMap = await getGenres();
    const movieList = data.results.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => genreMap[id]),
    }));
    return movieList;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMoviesTotal = async () => {
  try {
    const movie = await getMovies();
    return movie.length;
  } catch (error) {
    throw new Error(error);
  }
};
