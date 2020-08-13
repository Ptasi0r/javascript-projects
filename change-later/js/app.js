const switchTheme = document.querySelector('#switchTheme');
const cardsContainer = document.querySelector('.cards-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentEl = document.querySelector('.current');
const showBtn = document.querySelector('.show');
const hideBtn = document.querySelector('.hide');
const questionEl = document.querySelector('.question');
const answerEl = document.querySelector('.answer');
const clearBtn = document.querySelector('.clear');
const addContainer = document.querySelector('.add-container');
const addCardBtn = document.querySelector('.add-card');

// Keep track of current card
let currentActiveCard = 0;

// Check if are any cards
let isCards = false;

//Keep track of current theme
let theme = '';

// Store DOM cards
const cardsEl = [];

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

//TODO: zapis theme do ls + odczyt jeśli brak kart pusta karta z info

//Create a single card in DOM
const createCard = (data, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <span class="number">#${index + 1}</span>
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <span class="number">#${index + 1}</span>
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
};

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
};

//Create all cards
const createCards = () => {
  if (cardsData.length != 0) {
    console.log(cardsData.length != 0, cardsData.length);
    cardsData.forEach((data, index) => createCard(data, index));
  } else {
    console.log(cardsData.length != 0, cardsData.length);
    createCard({ question: 'You dont have any cards!', answer: 'First you must create one ;)' }, 0);
  }
};

// Create transition between themes
const transition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 1000);
};

// Get cards from local storage
const getCardsData = () => {
  const data = JSON.parse(localStorage.getItem('memoryCards'));
  if (data !== null) {
    if (data.theme) {
      document.documentElement.setAttribute('data-theme', data.theme);
      theme = data.theme;
      if (theme == 'dark') {
        switchTheme.checked = true;
      }
    }
    return data.cards === null ? [] : data.cards;
  } else {
    return [];
  }
};

//Add card to local storage
const setCardsData = (cards, ...rest) => {
  const data = {
    cards,
    theme,
  };
  localStorage.setItem('memoryCards', JSON.stringify(data));
  if (!rest) {
    window.location.reload();
  }
};

//

// Store cards data
const cardsData = getCardsData();

createCards();

switchTheme.addEventListener('change', (e) => {
  if (e.target.checked) {
    transition();
    document.documentElement.setAttribute('data-theme', 'dark');
    theme = 'dark';
  } else {
    transition();
    document.documentElement.setAttribute('data-theme', 'light');
    theme = 'light';
  }
  setCardsData(cardsData, theme);
});

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

//Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Add new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear all cards
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    cardsData = [];
    setCardsData(cardsData, theme);
    cardsContainer.innerHTML = '';
    window.location.reload();
  }
});
