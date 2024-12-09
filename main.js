const gameBoard = document.getElementById("gameBoard");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let boardState = Array(9).fill(""); // To track the state of the board

// Function to create the board dynamically
function createBoard() {
  gameBoard.innerHTML = ""; // Clear the board
  boardState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleClick, { once: true });
    gameBoard.appendChild(cell);
  });
}

// Handle a cell click
function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins! 🎉`;
    disableBoard();
    return;
  }

  if (isDraw()) {
    winnerMessage.textContent = "It's a Draw! 🤝";
    return;
  }

  // Switch the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check if the current player has won
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => boardState[index] === player)
  );
}

// Check if the game is a draw
function isDraw() {
  return boardState.every(cell => cell);
}

// Disable all cells
function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  boardState.fill(""); // Reset the board state
  winnerMessage.textContent = "";
  createBoard();
}

// Initialize the game
createBoard();
restartButton.addEventListener("click", restartGame);
