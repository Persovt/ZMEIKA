const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const config = {
  step: 0,
  maxStep: 6,
  sizeSell: 16,
  sizeBerry: 4,
};
const snake = {
  x: 16,
  y: 16,
  dx: config.sizeSell,
  dy: 0,
  tails: [],
  maxTails: 99999,
};
const berry = {
  x: 16,
  y: 16,
};
const drawGame = () => {
  requestAnimationFrame(drawGame);

  if (++config.step < config.maxStep) return;

  config.step = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBarry();
  drawSlither();
};

const drawSlither = () => {
  snake.x += snake.dx;
  snake.y += snake.dy;
  collisionBorder();
  snake.tails.unshift({ x: snake.x, y: snake.y });
  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  snake.tails.forEach((item, index) => {
    if (!index) ctx.fillStyle = "red";
    else ctx.fillStyle = "#ffb1b1aa";
    ctx.fillRect(item.x, item.y, config.sizeSell, config.sizeSell);

    if (item.x === berry.x && item.y === berry.y) {
      snake.maxTails++;
      randomPositionBerry();
    }
    for (let i = index + 1; i < snake.tails.length; i++) {
      if (item.x === snake.tails[i].x && item.y === snake.tails[i].y) {
        gameOver();
      }
    }
  });
};

const drawBarry = () => {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(
    berry.x + config.sizeSell / 2,
    berry.y + config.sizeSell / 2,
    config.sizeBerry,
    0,
    2 * Math.PI
  );
  ctx.fill();
};
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const randomPositionBerry = () => {
  berry.x = randomInt(0, canvas.width / config.sizeSell) * config.sizeSell;
  berry.y = randomInt(0, canvas.height / config.sizeSell) * config.sizeSell;
};
const collisionBorder = () => {
  if (snake.x < 0) snake.x = canvas.width;
  else if (snake.x >= canvas.width) snake.x = 0;

  if (snake.y < 0) snake.y = canvas.height;
  else if (snake.y >= canvas.height) snake.y = 0;
};
const gameOver = () => {
  snake.tails = [];
  snake.maxTails = 3;
  snake.dx = config.sizeSell;
  snake.dy = 0;
};
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyW" && snake.dy <= 0) {
    snake.dy = -config.sizeSell;
    snake.dx = 0;
  }
  if (e.code === "KeyS" && snake.dy >= 0) {
    snake.dy = config.sizeSell;
    snake.dx = 0;
  }
  if (e.code === "KeyA" && snake.dx <= 0) {
    snake.dx = -config.sizeSell;
    snake.dy = 0;
  }
  if (e.code === "KeyD" && snake.dx >= 0) {
    snake.dx = config.sizeSell;
    snake.dy = 0;
  }
});
randomPositionBerry();
drawGame();
