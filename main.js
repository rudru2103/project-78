const clickButton = document.getElementById("clickButton");
const startButton = document.getElementById("startButton");
const clickCountDisplay = document.getElementById("clickCount");
const instructions = document.getElementById("instructions");

let clickCount = 0;
let timeLimit = 10; // Default time limit in seconds
let timer;

function startGame() {
  // Reset everything
  clickCount = 0;
  clickCountDisplay.textContent = `Clicks: ${clickCount}`;
  clickButton.disabled = false;
  instructions.textContent = `Click the button as many times as you can in ${timeLimit} seconds!`;

  // Start the countdown
  let timeRemaining = timeLimit;
  timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  clickButton.disabled = true;
  instructions.textContent = `Time's up! You clicked ${clickCount} times.`;
}

function handleClick() {
  clickCount++;
  clickCountDisplay.textContent = `Clicks: ${clickCount}`;
}

// Attach event listeners
startButton.addEventListener("click", startGame);
clickButton.addEventListener("click", handleClick);
