const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');
const rules = document.querySelector('.rules');
const canvas = document.querySelector('.canvas');
const popupContainer = document.querySelector('.popup-container');
const gameTitle = document.querySelector('.game-title');
const scoreContainer = document.querySelector('.score');
const personalContainer = document.querySelector('.personal');
const playAgain = document.querySelector('.play-again');
const ctx = canvas.getContext('2d');
const audioEl = document.querySelector('.audio');

let score = 0;
let personalBest = localStorage.getItem('breakoutGame') ? +localStorage.getItem('breakoutGame') : 0;
let lives = 3;
let path = '';
try {
  audioEl.src = `${path}music/break.wav`;
} catch {
  path = 'https://raw.githubusercontent.com/Ptasi0r/javascript-projects/master/breakout-game/';
}

// Flag: true when lose or win
let isEnd = false;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

//Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

//Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw ball on canvas
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

//Draw paddle on canvas
const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const playSong = (type) => {
  audioEl.src = `${path}music/${type}.wav`;
  audioEl.volume = 0.2;
  audioEl.play();
};

//Draw score and personal best on canvas
const drawScore = () => {
  ctx.font = '20px Open Sans';
  ctx.fillText(`Lives: ${lives}     Score: ${score}`, canvas.width - 200, 30);
  ctx.fillText(`Personal Best: ${personalBest}`, 30, 30);
};

// Draw bricks on canvas
const drawBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
};

//Move paddle on canvas
const movePaddle = () => {
  paddle.x += paddle.dx;

  //Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

// Move ball on canvas
const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
    playSong('wall');
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
    playSong('wall');
  }

  //Paddle collision
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed;
    playSong('wall');
  }

  //Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
          playSong('break');
        }
      }
    });
  });
  // Hit bottom wall = Lose
  if (ball.y + ball.size > canvas.height) {
    lives--;
    if (lives == 0) {
      isEnd = true;
      playSong('lose');
    }
  }
};

// Increase score
const increaseScore = () => {
  score += 1;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    isEnd = true;
    playSong('win');
  }
};

// Make all bricks aprear
const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
};

//Draw everything
const draw = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

//End game
const endGame = () => {
  popupContainer.classList.add('show');
  if (score % (brickRowCount * brickColumnCount) === 0) {
    gameTitle.textContent = `🎉 You Win! 🎉`;
  } else {
    gameTitle.textContent = `😥 You Lose! 😥`;
  }

  scoreContainer.textContent = `Your score is: ${score}`;
  if (score >= personalBest) {
    personalContainer.textContent = `🎉 It's Yours PB! 🎉`;
    personalBest = score;
    localStorage.setItem('breakoutGame', score);
  } else {
    personalContainer.textContent = `😓 It's not Yours PB. try harder 😓`;
  }
};

//Update canvas drawing and animation
const update = () => {
  if (!isEnd) {
    movePaddle();
    moveBall();
    //Draw everything
    draw();
    requestAnimationFrame(update);
  } else {
    endGame();
  }
};

update();

const keyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
};
//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

playAgain.addEventListener('click', () => {
  score = 0;
  showAllBricks();
  popupContainer.classList.remove('show');
  isEnd = false;
  lives = 3;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  paddle.x = canvas.width / 2 - 40;
  paddle.y = canvas.height - 20;
  requestAnimationFrame(update);
});
