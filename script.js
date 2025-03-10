const gameBoard = document.getElementById("game-board");
const boardSize = 300;
const blockSize = 10;
let snake = [{ x: 150, y: 150 }];
let direction = 'right';
let food = spawnFood();

// Create the initial snake on the board
function drawSnake() {
  gameBoard.innerHTML = ''; // Clear previous snake and food
  snake.forEach(segment => {
    const snakeSegment = document.createElement('div');
    snakeSegment.classList.add('snake');
    snakeSegment.style.width = `${blockSize}px`;
    snakeSegment.style.height = `${blockSize}px`;
    snakeSegment.style.left = `${segment.x}px`;
    snakeSegment.style.top = `${segment.y}px`;
    gameBoard.appendChild(snakeSegment);
  });
}

// Draw the food
function drawFood() {
  const foodElement = document.createElement('div');
  foodElement.classList.add('food');
  foodElement.style.width = `${blockSize}px`;
  foodElement.style.height = `${blockSize}px`;
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  gameBoard.appendChild(foodElement);
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };

  if (direction === 'up') {
    head.y -= blockSize;
  } else if (direction === 'down') {
    head.y += blockSize;
  } else if (direction === 'left') {
    head.x -= blockSize;
  } else if (direction === 'right') {
    head.x += blockSize;
  }

  snake.unshift(head);

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood(); // Generate new food
  } else {
    snake.pop(); // Remove last segment
  }

  // Check for wall collision
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    alert('Game Over!');
    resetGame();
  }

  // Check for self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('Game Over!');
      resetGame();
    }
  }

  drawSnake();
  drawFood();
}

// Spawn food in a random position
function spawnFood() {
  const x = Math.floor(Math.random() * (boardSize / blockSize)) * blockSize;
  const y = Math.floor(Math.random() * (boardSize / blockSize)) * blockSize;
  return { x, y };
}

// Handle keyboard input for direction
document.addEventListener('keydown', (event) => {
  if (event.key === 'w' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 's' && direction !== 'up') {
    direction = 'down';
  } else if (event.key === 'a' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'd' && direction !== 'left') {
    direction = 'right';
  }
});

// Reset the game
function resetGame() {
  snake = [{ x: 150, y: 150 }];
  direction = 'right';
  food = spawnFood();
  drawSnake();
  drawFood();
}

// Update the game every 100ms
setInterval(moveSnake, 100);
