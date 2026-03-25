import { isMovieInWatchlist } from '../services/watchlistService.js';
import { toggleWatchlist } from '../services/watchlistService.js';

export const renderDetailMovie = (movie) => {
  const titleElement = document.querySelector('.title');
  if (titleElement) {
    titleElement.textContent = movie.title;
  }

  const detailContainer = document.querySelector('.movies');
  if (!detailContainer) return;

  detailContainer.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-10', 'font-sans', 'w-full');

  const img = document.createElement('img');
  img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`);
  img.setAttribute('alt', movie.title + ' cover');
  img.classList.add('w-[250px]', 'h-[390px]', 'row-span-4', 'object-cover', 'rounded-lg');

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('flex', 'flex-col', 'gap-5', 'flex-1');

  const genreContainer = document.createElement('div');
  genreContainer.classList.add('flex', 'gap-3', 'flex-wrap');
  movie.genres.forEach((g) => {
    const genreBadge = document.createElement('span');
    genreBadge.classList.add('py-1', 'px-4', 'border', 'border-gray-500', 'rounded-full', 'text-sm');
    genreBadge.textContent = g.name;
    genreContainer.append(genreBadge);
  });

  const rateContainer = document.createElement('div');
  rateContainer.classList.add('flex', 'gap-3', 'items-center');

  const imdbIcon = document.createElement('img');
  imdbIcon.setAttribute('src', '../../assets/imdb.svg');
  imdbIcon.setAttribute('alt', 'imdb icon');
  imdbIcon.classList.add('w-8');

  const ratePoint = document.createElement('span');
  ratePoint.classList.add('font-bold', 'text-xl');
  ratePoint.textContent = movie.vote_average.toFixed(1);

  const starIcon = document.createElement('img');
  starIcon.setAttribute('src', '../../assets/star.svg');
  starIcon.setAttribute('alt', 'star icon');
  starIcon.classList.add('w-5');

  rateContainer.append(imdbIcon, ratePoint, starIcon);

  const directorInfo = document.createElement('p');
  directorInfo.classList.add('text-base', 'text-gray-300');
  const directorLabel = document.createElement('span');
  directorLabel.classList.add('font-bold', 'text-white');
  directorLabel.textContent = 'Director: ';
  directorInfo.append(directorLabel, '[Placeholder Director]');

  const castInfo = document.createElement('p');
  castInfo.classList.add('text-base', 'text-gray-300');
  const castLabel = document.createElement('span');
  castLabel.classList.add('font-bold', 'text-white');
  castLabel.textContent = 'Cast: ';
  castInfo.append(castLabel, '[Actor 1], [Actor 2], [Actor 3]');

  const overviewTitle = document.createElement('h3');
  overviewTitle.classList.add('text-2xl', 'font-bold', 'mt-2');
  overviewTitle.textContent = 'Overview';

  const overview = document.createElement('p');
  overview.classList.add('text-base', 'text-gray-300', 'leading-relaxed', 'text-sm');
  overview.textContent = movie.overview;

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('mt-4');

  const addWatchlistButton = document.createElement('button');
  addWatchlistButton.setAttribute('type', 'button');

  let isExist = typeof isMovieInWatchlist === 'function' ? isMovieInWatchlist(movie.id) : false;

  const updateButtonState = (exists) => {
    addWatchlistButton.textContent = '';

    const buttonText = document.createTextNode('');

    if (exists) {
      buttonText.textContent = ' REMOVE FROM WATCHLIST';
      addWatchlistButton.className = 'cursor-pointer border py-3 px-8 rounded-full font-bold text-sm transition flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-200';
    } else {
      buttonText.textContent = ' ADD TO WATCHLIST';
      addWatchlistButton.className = 'cursor-pointer border py-3 px-8 rounded-full font-bold text-sm transition flex items-center gap-2 text-white border-white hover:bg-white hover:text-gray-900';
    }

    addWatchlistButton.append(buttonText);
  };

  updateButtonState(isExist);

  addWatchlistButton.addEventListener('click', () => {
    if (typeof toggleWatchlist === 'function') {
      toggleWatchlist(movie);
    }
    isExist = !isExist;
    updateButtonState(isExist);
  });

  buttonContainer.append(addWatchlistButton);

  infoContainer.append(genreContainer, rateContainer, directorInfo, castInfo, overviewTitle, overview, buttonContainer);

  wrapper.append(img, infoContainer);

  detailContainer.append(wrapper);
};
