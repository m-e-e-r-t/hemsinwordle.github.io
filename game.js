// List of Hamshen words in modern Turkish script
const HAMSHEN_WORDS = ["aakag"];
let targetWord = HAMSHEN_WORDS[Math.floor(Math.random() * HAMSHEN_WORDS.length)];
let currentGuess = '';
let currentRow = 0;

// Generate the grid
const grid = document.getElementById("grid");
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = `tile-${i}-${j}`;
    grid.appendChild(tile);
  }
}

// Check the guess
function checkGuess() {
  if (currentGuess.length !== 5) {
    alert("Lütfen 5 harf girin!"); // "Please enter 5 letters!"
    return;
  }

  for (let i = 0; i < 5; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    const letter = currentGuess[i];
    if (targetWord[i] === letter) {
      tile.classList.add("correct");
    } else if (targetWord.includes(letter)) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
    tile.textContent = letter.toUpperCase();
  }

  // Check if the guess is correct
  if (currentGuess === targetWord) {
    alert("Tebrikler! Doğru kelimeyi buldunuz!"); // "Congratulations! You guessed the word!"
    resetGame();
    return;
  }

  // Move to the next row
  currentRow++;
  currentGuess = '';

  // Check if the player has run out of guesses
  if (currentRow === 6) {
    alert(`Maalesef, bilemediniz. Doğru kelime: ${targetWord.toUpperCase()}`); // "Sorry, you lost. The correct word was: ..."
    resetGame();
  }
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
  else if (e.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
  else if (currentGuess.length < 5 && e.key.match(/^[a-zA-ZçğıöşüÇĞİÖŞÜ]$/)) { // Allow Turkish characters
    currentGuess += e.key.toLowerCase();
  }
  updateTiles();
});

// Update tiles with current guess
function updateTiles() {
  for (let i = 0; i < 5; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    tile.textContent = currentGuess[i] ? currentGuess[i].toUpperCase() : '';
  }
}

// Reset the game
function resetGame() {
  targetWord = HAMSHEN_WORDS[Math.floor(Math.random() * HAMSHEN_WORDS.length)];
  currentGuess = '';
  currentRow = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = document.getElementById(`tile-${i}-${j}`);
      tile.textContent = '';
      tile.classList.remove("correct", "present", "absent");
    }
  }
}