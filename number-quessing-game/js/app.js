const msgEl = document.querySelector('.msg');

// Generate random number
const getRandomNumber = () => Math.floor(Math.random() * 100);

const randomNum = getRandomNumber();

console.log(`Number: ${randomNum}`);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Capture user speak
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  console.log(msg);

  writeMessege(msg);
  checkNumber(msg);
};

// Wirte what user speaks
const writeMessege = (msg) => {
  msgEl.innerHTML = `
    <div>You said:</div>
      <span class="box">${msg}</span>
  `;
};

//Check msg against number

const checkNumber = (msg) => {
  const num = +msg;

  //Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>❗ That is not a valid number ❗</div> `;
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>❗ Number must be between 1 and 100 ❗</div> `;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h1>🎉 Conrats! You have guessed the number! 🎉</h1><h2> It was ${num}</h2>
      <button class="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>⬇ GO LOWER ⬇</div> `;
  } else {
    msgEl.innerHTML += `<div>⬆ GO HIGHER ⬆</div> `;
  }
};

// Start recogniton and game
recognition.start();

//Speak result
recognition.addEventListener('result', onSpeak);

// End SP service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
  if (e.target.classList == 'play-again') {
    window.location.reload();
  }
});
