const word = document.querySelector('.word');
const text = document.querySelector('.text');
const scoreEl = document.querySelector('.score');
const timeEl = document.querySelector('.time');
const endGameEl = document.querySelector('.end-game-container');
const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
const settingsForm = document.querySelector('.settings-form');
const difficultySelect = document.querySelector('.difficulty');
const scoreBtn = document.querySelector('.scores-btn');
const scoresContainer = document.querySelector('.scoreboard-container');
const scoreboard = document.querySelector('.scoreboard');
const scores = document.querySelector('.scores');
// Rules of game

const rules = {
  easy: {
    timeAdded: 5,
    wordsLenghtMax: 8,
    scoreMultiplier: 1,
  },
  medium: {
    timeAdded: 3,
    wordsLenghtMax: 12,
    scoreMultiplier: 2,
  },
  hard: {
    timeAdded: 2,
    wordsLenghtMax: 100,
    scoreMultiplier: 3,
  },
};

// Init word
let randomWord;

// Init score
let score = 0;

//Init time
let time = 10;

// Set  difficulty to value in LocalStorage or medium
let difficulty = 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Generate random word from array
const getRandomWord = async () => {
  let flag = true;
  let word = '';
  const maxWordLength = rules[difficulty].wordsLenghtMax;

  // Fetch a word until its match the rules
  while (flag == true) {
    const respond = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
    const data = await respond.json();
    console.log(data[0]);
    if (data[0].length <= maxWordLength) {
      flag = false;
      word = data[0];
    }
  }

  return word;
};

// Add word to DOM
const addWordToDOM = async () => {
  randomWord = await getRandomWord();
  word.innerHTML = randomWord;
};

// Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// Update time
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);

    // End game
    gameOver();
  }
};

// Game over, show end screen
const gameOver = () => {
  endGameEl.innerHTML = `
     <h1>Time ran out</h1>
     <p>Your final score is ${score}</p>

     <div style="display: flex">
      <button onclick="saveScore()" style="margin-right: 10px">Save score</button>
      <button onclick="location.reload()">Play again</button>
     </div>
  `;

  endGameEl.style.display = 'flex';
};

// Save score to LocalStorage
const saveScore = () => {
  let data = localStorage.getItem('speedTyper') !== null ? JSON.parse(localStorage.getItem('speedTyper')) : null;
  if (data) {
    data.difficulty = difficulty;
    const scoreboard = data.scoreboard;
    scoreboard.push({
      date: Date.now(),
      score: score,
      difficulty: difficulty,
    });
    data.scoreboard = scoreboard;
  } else {
    data = {
      difficulty: difficulty,
      scoreboard: [
        {
          date: Date.now(),
          score: score,
          difficulty: difficulty,
        },
      ],
    };
  }
  localStorage.setItem('speedTyper', JSON.stringify(data));
};

// Set a difficulty from LocalStorage
const setDifficulty = () => {
  let data = localStorage.getItem('speedTyper') !== null ? JSON.parse(localStorage.getItem('speedTyper')) : null;
  if (data) {
    difficulty = data.difficulty;
    difficultySelect.value = difficulty;
  }
};

// Add value to time based on difficulty
const addTime = () => {
  const timeToAdd = rules[difficulty].timeAdded;
  time += timeToAdd;
  updateTime();
};

// Add scores to scoreboard
const addScores = () => {
  let data = localStorage.getItem('speedTyper') !== null ? JSON.parse(localStorage.getItem('speedTyper')) : null;
  if (data) {
    const userScores = data.scoreboard.sort((a, b) => {
      return a.score * rules[a.difficulty].scoreMultiplier > b.score * rules[b.difficulty].scoreMultiplier ? -1 : 0;
    });

    userScores.forEach((score, index) => {
      const el = document.createElement('div');
      el.classList.add('score');
      el.innerHTML = `
        <span class="number">${getIcon(index + 1)}</span>
        <span class="score-item">Score: ${score.score} (${rules[score.difficulty].scoreMultiplier * score.score}) <br> (${score.difficulty}: score * ${rules[score.difficulty].scoreMultiplier})</span>
        <span class="date">${new Date(1596926308657).toLocaleDateString()}</span>
      `;
      scores.appendChild(el);
    });
  } else {
    const el = document.createElement('div');
    el.classList.add('score');
    el.textContent = "You don't have saved scores!";
    el.style.grid = 'unset';
    scores.appendChild(el);
  }
};

const getIcon = (number) => {
  if (number == 1) {
    return '🥇';
  } else if (number == 2) {
    return '🥈';
  } else if (number == 3) {
    return '🥉';
  } else {
    return number;
  }
};

// Update difficulty in LocalStorage

const updateDifficultyLS = () => {
  let data = localStorage.getItem('speedTyper') !== null ? JSON.parse(localStorage.getItem('speedTyper')) : null;
  if (data) {
    data.difficulty = difficulty;
  } else {
    data = {
      difficulty: difficulty,
      scoreboard: [],
    };
  }
  localStorage.setItem('speedTyper', JSON.stringify(data));
};

// Hide scoreboard
const hideScoreboard = () => {
  scoresContainer.animate([{ opacity: '1' }, { opacity: '0' }], {
    duration: 1000,
  });

  setTimeout(() => {
    scoresContainer.classList.remove('show');
  }, 990);
};

// Init a game

setDifficulty();
addWordToDOM();
addScores();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  console.log(e.target.value);
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
    addTime();
    word.style.color = 'white';
  } else if (insertedText !== randomWord && insertedText.length >= randomWord.length) {
    word.style.color = 'red';
  }
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  updateDifficultyLS();
});

scoreBtn.addEventListener('click', () => scoresContainer.classList.add('show'));
// closeModalBtn.addEventListener('click', hideModal);

window.addEventListener('click', (e) => (e.target == scoresContainer ? hideScoreboard() : false));
