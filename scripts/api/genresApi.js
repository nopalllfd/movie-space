const url = 'https://api.themoviedb.org/3/genre/movie/list';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmRjZTdlZWFhMzFmMWU3YjE3ZWM0ZDQ1NmRmNzk4OSIsIm5iZiI6MTc1MzM0MDgzNi43Mjg5OTk5LCJzdWIiOiI2ODgxZGJhNDdiMDFmMTA5MjYxNmIzZDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6MhOMkvNGecZsGzTb6um2Wr3HBm-zQ7gGZk3mXtdi0I',
  },
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

fetchGenres();
