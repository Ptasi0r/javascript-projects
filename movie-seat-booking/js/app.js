const moviesCard = document.querySelectorAll('.movie');

const getMovieSeats = async (movieName) => {
  const data = await fetch('./js/seats.json');
  const moviesSeats = await data.json();
  let a = 'harry-potter';
  return moviesSeats[movieName];
};

const removeClass = (className, inputs) => {
  inputs.forEach((input) => {
    if (input.classList.contains(className)) {
      input.classList.remove(className);
    }
  });
};

const updateUI = (data) => {
  console.log(data);
  const containers = document.querySelector('.movie-theater-container');
  const rows = containers.querySelectorAll('.movie-row');
  const seats = [];
  rows.forEach((row) => {
    const list = row.querySelectorAll('.seat');
    list.forEach((el) => seats.push(el));
  });
  removeClass('occupied', seats);
  seats.forEach((el, index) => {
    if (data.includes(index)) {
      el.classList.add('occupied');
    }
  });
};

moviesCard.forEach((movie) => {
  movie.addEventListener('click', () => {
    removeClass('selected', moviesCard);
    movie.classList.add('selected');

    const movieName = movie.dataset.title;
    getMovieSeats(movieName).then((data) => updateUI(data.occupied));
  });
});
