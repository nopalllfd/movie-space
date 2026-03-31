import { response } from '../response/index.js';
import { isMovieInWatchlist, toggleWatchlist, watchlistTotal } from '../services/watchlistService.js';

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

export const renderSortByOptions = (sortByOpts) => {
  const sortSelect = document.querySelector('#sort-by-tmdb-select');
  const data = sortByOpts;
  data.forEach((sort) => {
    const opt = document.createElement('option');
    opt.textContent = sort;
    opt.setAttribute('value', sort);
    opt.classList.add('bg-gray-700', 'text-white');
    sortSelect.append(opt);
  });
  console.log(data);
};

export const renderMovies = (movies, isWatchlistPage = false) => {
  const movieTitleContainer = document.querySelector('.movie-list');
  movieTitleContainer.innerHTML = '';

  if (isWatchlistPage) {
    const totalMoviesInWatchlist = watchlistTotal();
    const totalMoviesInPage = document.querySelector('.moviesTotal');
    totalMoviesInPage.textContent = totalMoviesInWatchlist;
  }

  const items = movies.map((movie) => {
    const list = document.createElement('li');
    list.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-[160px_1fr]', 'gap-4', 'sm:gap-x-6', 'sm:gap-y-3', 'p-4', 'sm:p-6', 'rounded-xl', 'text-white', 'font-sans', 'bg-gray-800', 'sm:bg-transparent');

    const img = document.createElement('img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`);
    img.setAttribute('alt', `${movie.title} cover`);
    img.classList.add('w-[200px]', 'sm:w-[150px]', 'h-auto', 'sm:h-[225px]', 'sm:row-span-5', 'object-cover', 'rounded-lg', 'justify-self-center', 'sm:justify-self-start', 'mb-2', 'sm:mb-0');

    const heading = document.createElement('h2');
    heading.classList.add('text-xl', 'sm:text-2xl', 'font-bold', 'text-center', 'sm:text-left');
    heading.textContent = movie.title;

    const genreContainer = document.createElement('div');
    genreContainer.classList.add('flex', 'gap-2', 'sm:gap-3', 'flex-wrap', 'justify-center', 'sm:justify-start');

    movie.genres.forEach((g) => {
      const genreBadge = document.createElement('span');
      genreBadge.classList.add('p-1', 'px-3', 'sm:px-4', 'border', 'border-gray-500', 'rounded-2xl', 'text-[10px]', 'sm:text-sm');
      genreBadge.textContent = g.name || g;
      genreContainer.append(genreBadge);
    });

    const rateContainer = document.createElement('div');
    rateContainer.classList.add('flex', 'gap-2', 'sm:gap-3', 'items-center', 'justify-center', 'sm:justify-start');

    const imdbIcon = document.createElement('img');
    imdbIcon.setAttribute('src', '../../assets/imdb.svg');
    imdbIcon.setAttribute('alt', 'imdb icon');
    imdbIcon.classList.add('w-6', 'sm:w-8');

    const ratePoint = document.createElement('span');
    ratePoint.classList.add('text-sm', 'sm:text-base');
    ratePoint.textContent = movie.vote_average.toFixed(1);

    const starIcon = document.createElement('img');
    starIcon.setAttribute('src', '../../assets/star.svg');
    starIcon.setAttribute('alt', 'star icon');
    starIcon.classList.add('w-4', 'sm:w-5');

    rateContainer.append(imdbIcon, ratePoint, starIcon);

    const overview = document.createElement('p');
    overview.classList.add('text-xs', 'sm:text-sm', 'text-gray-300', 'line-clamp-4', 'sm:line-clamp-3', 'text-center', 'sm:text-left');
    overview.textContent = movie.overview;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'flex-col', 'sm:flex-row', 'gap-3', 'sm:gap-4', 'mt-4', 'sm:mt-2', 'items-stretch', 'sm:items-center', 'w-full', 'sm:w-auto');

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'VIEW DETAILS';
    detailsButton.setAttribute('type', 'button');
    detailsButton.classList.add('cursor-pointer', 'border', 'py-2', 'px-6', 'rounded-full', 'bg-white', 'text-gray-900', 'font-bold', 'text-xs', 'sm:text-sm', 'hover:bg-gray-200', 'transition', 'text-center', 'w-full', 'sm:w-auto');
    detailsButton.addEventListener('click', () => {
      window.location.href = `../../pages/movieDetails/index.html?id=${movie.id}`;
    });

    const addWatchlistButton = document.createElement('button');
    addWatchlistButton.textContent = 'ADD TO WATCHLIST';
    addWatchlistButton.setAttribute('type', 'button');
    addWatchlistButton.classList.add('cursor-pointer', 'border', 'py-2', 'px-6', 'rounded-full', 'font-bold', 'text-xs', 'sm:text-sm', 'hover:bg-gray-800', 'transition', 'text-center', 'w-full', 'sm:w-auto');

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

    const updateWatchlistButtonStyle = (exists) => {
      addWatchlistButton.classList.remove('bg-gray-800', 'text-white', 'hover:text-gray-800', 'hover:bg-white');
      addWatchlistButton.classList.remove('bg-white', 'text-gray-800', 'hover:text-white');

      if (exists) {
        if (isWatchlistPage) {
          addWatchlistButton.classList.add('bg-gray-800', 'border', 'text-white', 'hover:text-gray-800', 'hover:bg-white');
        } else {
          addWatchlistButton.classList.add('bg-white', 'text-gray-800', 'hover:text-white');
        }
      } else {
        addWatchlistButton.classList.add('hover:bg-gray-800');
      }
    };

    addWatchlistButton.addEventListener('click', () => {
      const result = toggleWatchlist(movie);
      if (result === null) return;
      isExist = result;

      if (isWatchlistPage && !isExist) {
        setTimeout(() => {
          list.remove();
          const totalMoviesInWatchlist = watchlistTotal();
          const totalMoviesInPage = document.querySelector('.moviesTotal');
          totalMoviesInPage.textContent = totalMoviesInWatchlist;
          const noContentText = document.createElement('p');
          noContentText.textContent = 'Tidak ada film di watchlist anda';
          noContentText.classList.add('text-gray-300');
          movieTitleContainer.append(noContentText);
        }, 500);

        return;
      }

      if (isExist) {
        response('Berhasil menambahkan film ke watchlist', 'green');
        addWatchlistButton.innerText = 'REMOVE FROM WATCHLIST';
      } else {
        response('Berhasil menghapus film dari watchlist', 'red');
        addWatchlistButton.innerText = 'ADD TO WATCHLIST';
      }
      updateWatchlistButtonStyle(isExist);
    });

    buttonContainer.append(detailsButton, addWatchlistButton);
    list.append(img, heading, genreContainer, rateContainer, overview, buttonContainer);

    return list;
  });

  if (items.length == 0 && isWatchlistPage) {
    const noContentText = document.createElement('p');
    noContentText.textContent = 'Tidak ada film di watchlist anda';
    noContentText.classList.add('text-gray-300');
    movieTitleContainer.append(noContentText);
  }

  movieTitleContainer.append(...items);
};

export const renderPagination = (totalItems, itemsPerPage, currentPage, onPageClick) => {
  const pagination = document.querySelector('.pagination');
  pagination.classList.add('flex', 'items-center', 'gap-6', 'text-sm', 'text-gray-400', 'justify-end', 'p-4');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const labelPerPage = document.createElement('div');
  labelPerPage.innerHTML = `items per page: <span class="text-white ml-2">${itemsPerPage}</span>`;

  const rangeLabel = document.createElement('div');
  rangeLabel.innerText = `${startItem} - ${endItem} of ${totalItems}`;

  const navAction = document.createElement('div');
  navAction.classList.add('flex', 'gap-8');

  const btnPrev = document.createElement('button');
  btnPrev.innerHTML = `&#10094;`;
  btnPrev.className = `hover:text-white transition ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`;
  btnPrev.disabled = currentPage === 1;
  btnPrev.onclick = () => currentPage > 1 && onPageClick(currentPage - 1);

  const btnNext = document.createElement('button');
  btnNext.innerHTML = `&#10095;`;
  btnNext.className = `hover:text-white transition ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`;
  btnNext.disabled = currentPage === totalPages;
  btnNext.onclick = () => currentPage < totalPages && onPageClick(currentPage + 1);

  navAction.append(btnPrev, btnNext);
  pagination.append(labelPerPage, rangeLabel, navAction);
};

export const loading = () => {
  if (document.getElementById('loading-spinner')) return;
  const loader = document.createElement('div');
  loader.id = 'loading-spinner';
  loader.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/50';
  loader.innerHTML = `
    <div role="status">
      <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor""")/>>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill""")/>>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>`;
  document.body.appendChild(loader);
};

export const stopLoading = () => {
  const loader = document.getElementById('loading-spinner');
  if (loader) loader.remove();
};
