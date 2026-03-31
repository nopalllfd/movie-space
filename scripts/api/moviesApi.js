const url = 'https://api.themoviedb.org/3/discover/movie?';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmRjZTdlZWFhMzFmMWU3YjE3ZWM0ZDQ1NmRmNzk4OSIsIm5iZiI6MTc1MzM0MDgzNi43Mjg5OTk5LCJzdWIiOiI2ODgxZGJhNDdiMDFmMTA5MjYxNmIzZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6MhOMkvNGecZsGzTb6um2Wr3HBm-zQ7gGZk3mXtdi0I',
  },
};

export const fetchMovies = async (genreId, page, sortBy) => {
  try {
    let finalUrl = url;
    console.log(typeof genreId);
    if (genreId || page) {
      console.log('masuk');
      finalUrl = url + 'with_genres=' + genreId + '&page=' + page + '&sortBy=' + sortBy;
    }
    console.log(finalUrl);
    const response = await fetch(finalUrl, options);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
