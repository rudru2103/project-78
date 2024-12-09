const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";

function handleClick(event) {
  const cell = event.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
    disableBoard();
    return;
  }

  if (isDraw()) {
    winnerMessage.textContent = "It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

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
    pattern.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

function disableBoard() {
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function restartGame() {
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleClick, { once: true });
  });
  winnerMessage.textContent = "";
}

// Initialize game
cells.forEach(cell => cell.addEventListener("click", handleClick, { once: true }));
restartButton.addEventListener("click", restartGame);
