import { isMovieInWatchlist, toggleWatchlist } from '../services/watchlistService.js';

export const renderTotalMovies = (totalMovies) => {
  const totalMoviesText = document.querySelector('.title .moviesTotal');
  if (totalMoviesText) {
    totalMoviesText.textContent = totalMovies;
  }
};

export const renderGenreDropdown = async (genres) => {
  const genreSelect = document.getElementById('genre-select');
  genreSelect.classList.add('bg-gray-900');
  if (!genreSelect) return;
  try {
    genres.genres.forEach((genre) => {
      const opt = document.createElement('option');
      opt.innerText = genre.name;
      opt.setAttribute('value', `${genre.id}`);
      opt.classList.add('bg-gray-700', 'text-white');
      genreSelect.append(opt);
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const renderMovies = (movies, isWatchlistPage = false) => {
  const movieTitleContainer = document.querySelector('.movie-list');
  movieTitleContainer.innerHTML = '';

  const items = movies.map((movie) => {
    const list = document.createElement('li');
    list.classList.add('grid', 'grid-cols-[160px_1fr]', 'gap-x-6', 'gap-y-3', 'p-6', 'rounded-xl', 'text-white', 'font-sans');

    const img = document.createElement('img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`);
    img.setAttribute('alt', `${movie.title} cover`);
    img.classList.add('w-[150px]', 'h-[225px]', 'row-span-5', 'object-cover', 'rounded-lg');

    const heading = document.createElement('h2');
    heading.classList.add('text-2xl', 'font-bold');
    heading.textContent = movie.title;

    const genreContainer = document.createElement('div');
    genreContainer.classList.add('flex', 'gap-3', 'flex-wrap');

    movie.genres.forEach((g) => {
      const genreBadge = document.createElement('span');
      genreBadge.classList.add('p-1', 'px-4', 'border', 'border-gray-500', 'rounded-2xl', 'text-sm');
      genreBadge.textContent = g.name || g;
      genreContainer.append(genreBadge);
    });

    const rateContainer = document.createElement('div');
    rateContainer.classList.add('flex', 'gap-3', 'items-center');

    const imdbIcon = document.createElement('img');
    imdbIcon.setAttribute('src', '../../assets/imdb.svg');
    imdbIcon.setAttribute('alt', 'imdb icon');
    imdbIcon.classList.add('w-8');

    const ratePoint = document.createElement('span');
    ratePoint.textContent = movie.vote_average.toFixed(1);

    const starIcon = document.createElement('img');
    starIcon.setAttribute('src', '../../assets/star.svg');
    starIcon.setAttribute('alt', 'star icon');
    starIcon.classList.add('w-5');

    rateContainer.append(imdbIcon, ratePoint, starIcon);

    const overview = document.createElement('p');
    overview.classList.add('text-xs', 'text-gray-300', 'line-clamp-3');
    overview.textContent = movie.overview;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'gap-4', 'mt-2', 'items-center');

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'VIEW DETAILS';
    detailsButton.setAttribute('type', 'button');
    detailsButton.classList.add('cursor-pointer', 'border', 'py-2', 'px-6', 'rounded-full', 'bg-white', 'text-gray-900', 'font-bold', 'text-sm', 'hover:bg-gray-200', 'transition');
    detailsButton.addEventListener('click', () => {
      window.location.href = `../../pages/movieDetails/index.html?id=${movie.id}`;
    });

    const addWatchlistButton = document.createElement('button');
    addWatchlistButton.textContent = 'ADD TO WATCHLIST';
    addWatchlistButton.setAttribute('type', 'button');
    addWatchlistButton.classList.add('cursor-pointer', 'border', 'py-2', 'px-6', 'rounded-full', 'font-bold', 'text-sm', 'hover:bg-gray-800', 'transition');
    let isExist = isMovieInWatchlist(movie.id);
    if (isExist) {
      addWatchlistButton.innerText = 'REMOVE FROM WATCHLIST';
      if (isWatchlistPage) {
        addWatchlistButton.classList.add('bg-gray-800', 'border', 'text-white', 'hover:text-gray-800', 'hover:bg-white');
      } else {
        addWatchlistButton.classList.add('bg-white', 'text-gray-800', 'hover:text-white');
      }
    } else {
      addWatchlistButton.innerText = 'ADD TO WATCHLIST';
      addWatchlistButton.classList.add('hover:bg-gray-800');
    }

    addWatchlistButton.addEventListener('click', () => {
      toggleWatchlist(movie);
      if (isWatchlistPage) {
        setTimeout(() => {
          list.remove();
          return;
        }, 500);
      }

      addWatchlistButton.classList.toggle('bg-white');
      addWatchlistButton.classList.toggle('text-gray-800');
      addWatchlistButton.classList.toggle('hover:text-white');

      if (addWatchlistButton.innerText === 'ADD TO WATCHLIST') {
        addWatchlistButton.innerText = 'REMOVE FROM WATCHLIST';
      } else {
        addWatchlistButton.innerText = 'ADD TO WATCHLIST';
      }
    });

    buttonContainer.append(detailsButton, addWatchlistButton);

    list.append(img, heading, genreContainer, rateContainer, overview, buttonContainer);

    return list;
  });

  movieTitleContainer.append(...items);
};
