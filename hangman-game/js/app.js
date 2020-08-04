const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.querySelector('.play-again');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('.final-message');
const keyboardContainer = document.querySelector('.keyboard-container');
const figuteParts = document.querySelectorAll('.figure-part');
const answear = document.querySelector('.answear');
const letters = document.querySelectorAll('.letter');
const hintBtn = document.querySelector('.hint');

const words = [
  'application',
  'programming',
  'interface',
  'wizard',
  'computer',
  'javascirp',
  'software',
  'chrome',
  'windows',
  'asynchronous',
  'database',
  'react',
  'interpreter',
  'compiler',
  'callback',
  'python',
];
//TODO: Słowa z randomowe słowo z api http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetter = [];
const wrongLetter = [];

const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `<span class="letter">
        ${correctLetter.includes(letter) ? letter : ''}
        </span>`
    )
    .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = ' 🎉 Congratulations! You won! 🎉';
    popup.style.display = 'flex';
  }
};

const updateWrongLetterEl = () => {
  wrongLettersEl.innerHTML = `
    ${wrongLetter.length > 0 ? '<p> Wrong: </p>' : ''}
    ${wrongLetter.map((letter) => `<span>${letter}</span>`)}
  `;

  figuteParts.forEach((part, index) => {
    const errors = wrongLetter.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetter.length == figuteParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😞';
    answear.innerText = `The words was: ${selectedWord}`;
    popup.style.display = 'flex';
  }
};

const showNotificaton = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetter.includes(letter)) {
        correctLetter.push(letter);
        displayWord();
      } else {
        showNotificaton();
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        wrongLetter.push(letter);
        updateWrongLetterEl();
      } else {
        showNotificaton();
      }
    }
  }
});

playAgainBtn.addEventListener('click', () => {
  correctLetter.splice(0);
  wrongLetter.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterEl();
  letters.forEach((letter) => {
    if (letter.classList.contains('error')) {
      letter.classList.remove('error');
    } else if (letter.classList.contains('success')) {
      letter.classList.remove('success');
    }
  });
  answear.innerText = '';
  popup.style.display = 'none';
});

keyboardContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('letter')) {
    const letter = e.target.dataset.letter;

    if (selectedWord.includes(letter)) {
      if (!correctLetter.includes(letter)) {
        correctLetter.push(letter);
        e.target.classList.add('success');
        displayWord();
      } else {
        showNotificaton();
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        wrongLetter.push(letter);
        updateWrongLetterEl();
        e.target.classList.add('error');
      } else {
        showNotificaton();
      }
    }
  }
});

hintBtn.addEventListener('click', () => {
  let remainingLetters = [];
  selectedWord.split('').forEach((letter) => {
    if (!correctLetter.includes(letter)) {
      remainingLetters.push(letter);
    }
  });

  const hintLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
  correctLetter.push(hintLetter);
  const letterContainer = document.querySelector(`.letter[data-letter="${hintLetter}"]`);
  letterContainer.classList.add('success');
  console.log(letterContainer);
  displayWord();
});

displayWord();
