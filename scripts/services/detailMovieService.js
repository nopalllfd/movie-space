import { fetchDetailsMovie } from '../api/detailsMovieApi.js';

export const getDetailsMovie = async (movieId) => {
  const movie = await fetchDetailsMovie(movieId);
  return movie;
};
