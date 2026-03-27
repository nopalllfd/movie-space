import { fetchMovies } from '../api/moviesApi.js';
import { fetchGenres } from '../api/genresApi.js';

export const getMovies = async (genreId, page) => {
  try {
    console.log(genreId);
    const [moviesData, genresData] = await Promise.all([fetchMovies(genreId, page), fetchGenres()]);
    const genresMap = genresData.genres.map((genre) => [genre.id, genre.name]);
    const genresObj = Object.fromEntries(genresMap);
    console.log(genresObj);
    const movieList = moviesData.results.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => genresObj[id]),
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

export const getGenres = async () => {
  try {
    const genre = await fetchGenres();
    return genre;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPagination = async () => {
  try {
    const movies = await fetchMovies();
    let totalPages = movies.total_pages;
    if (totalPages > 10) {
      totalPages = 10;
    }
    return totalPages;
  } catch (error) {
    throw new Error(error);
  }
};
