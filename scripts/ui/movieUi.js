export const renderTotalMovies = (totalMovies) => {
  const totalMoviesText = document.querySelector('.title .moviesTotal');
  totalMoviesText.innerHTML = totalMovies;
};

export const renderMovies = (movies) => {
  const movieTitleContainer = document.querySelector('.movie-list');
  const items = movies.map((movie) => {
    const list = document.createElement('li');
    const img = document.createElement('img');
    const heading = document.createElement('h2');
    list.classList.add('grid', 'grid-cols-[160px_1fr]', 'gap-x-6', 'gap-y-3', 'p-6', 'rounded-xl', 'text-white', 'font-sans');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`);
    img.setAttribute('alt', `${movie.title} cover`);
    img.classList.add('w-[150px]', 'h-[200px]', 'row-span-5', 'object-cover');
    console.log(movie);
    heading.classList.add('text-2xl');
    heading.innerText = movie.title;
    list.append(img, heading);
    return list;
  });
  console.log(...items);
  movieTitleContainer.append(...items);
};
