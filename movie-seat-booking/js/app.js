const moviesCard = document.querySelectorAll('.movie');
const containers = document.querySelector('.movie-theater-container');
const rows = containers.querySelectorAll('.movie-row');
const seatsCount = document.querySelector('.seats-count');
const seatsPrice = document.querySelector('.seats-price');

let isMovieSelected = false;
let currentMovie = '';
let moviePrice = 0;
let movieTitle = '';

const getMovieSeats = async (movieName) => {
  const data = await fetch('./js/seats.json');
  const moviesSeats = await data.json();
  return moviesSeats[movieName];
};

const removeClass = (className, inputs) => {
  inputs.forEach((input) => {
    if (input.classList.contains(className)) {
      input.classList.remove(className);
    }
  });
};

const getAllSeats = () => {
  const seats = [];
  rows.forEach((row) => {
    const list = row.querySelectorAll('.seat');
    list.forEach((el) => seats.push(el));
  });
  return seats;
};

const updateUI = (data) => {
  console.log(data);
  const seats = getAllSeats();
  removeClass('occupied', seats);
  seats.forEach((el, index) => {
    if (data.includes(index)) {
      el.classList.add('occupied');
    }
  });
};

const updateSeatsCount = () => {
  const selectedSeats = document.querySelectorAll('.movie-row .seat.selected');
  const seats = getAllSeats();
  seatsCount.textContent = selectedSeats.length;
  seatsPrice.textContent = selectedSeats.length * moviePrice;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const movieBill = {
    selectedSeats: seatsIndex,
    selectedMovie: movieTitle,
    pricePerSeat: moviePrice,
    totalPrice: selectedSeats.length * moviePrice,
  };

  localStorage.setItem('movieBill', JSON.stringify(movieBill));
};

const getDataFromLocalStorage = () => {
  const movieBill = JSON.parse(localStorage.getItem('movieBill'));
  console.log(movieBill);
  if (movieBill) {
    if (movieBill.selectedSeats.length > 0) {
      const selectedSeats = movieBill.selectedSeats;
      const seats = getAllSeats();
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });

      seatsCount.textContent = selectedSeats.length;
      seatsPrice.textContent = movieBill.totalPrice;
    }
    if (movieBill.selectedMovie) {
      const movieName = movieBill.selectedMovie;
      const movieCard = document.querySelector(`.movie[data-title="${movieName}"`);
      movieCard.classList.add('selected');
      getMovieSeats(movieName).then((data) => updateUI(data.occupied));
    }
  }
};

moviesCard.forEach((movie) => {
  movie.addEventListener('click', () => {
    removeClass('selected', moviesCard);
    movie.classList.add('selected');
    isMovieSelected = true;
    if (currentMovie != movie.dataset.title) {
      const seats = getAllSeats();
      removeClass('selected', seats);
      updateSeatsCount();
      movieTitle = movie.dataset.title;
      currentMovie = movie.dataset.title;
      moviePrice = movie.dataset.price;
    }

    const movieName = movie.dataset.title;
    getMovieSeats(movieName).then((data) => updateUI(data.occupied));
  });
});

containers.addEventListener('click', (e) => {
  if (isMovieSelected && e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSeatsCount();
  }
});

getDataFromLocalStorage();
