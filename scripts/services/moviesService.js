import { fetchMovies } from '../api/moviesApi.js';
import { fetchGenres } from '../api/genresApi.js';

export const getMovies = async () => {
  try {
    const [moviesData, genresData] = await Promise.all([fetchMovies(), fetchGenres()]);
    const genresMap = genresData.genres.map((genre) => [genre.id, genre.name]);
    const genresObj = Object.fromEntries(genresMap);
    console.log(genresObj);
    const movieList = moviesData.results.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => genresObj[id]),
    }));
    console.log(movieList);
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
