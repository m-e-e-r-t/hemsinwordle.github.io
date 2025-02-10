// List of Hamshen words with definitions
const HAMSHEN_WORDS = [
  { word: "hokur", definition: "Hala, babanın kız kardeşi" },
  { word: "horon", definition: "Karadeniz bölgesine özgü halk dansı" },
  { word: "dandz", definition: "Armut" },
  { word: "pazar", definition: "Geleneksel toplanma günü" }
];

// Date handling functions
function getLocalDateString() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0');
}

function seededRandom(seed) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function getDailyWord() {
  const dateString = getLocalDateString().replace(/-/g, '');
  const seed = parseInt(dateString, 10);
  const rand = seededRandom(seed);
  return HAMSHEN_WORDS[Math.floor(rand() * HAMSHEN_WORDS.length)];
}

// Game state
let targetWordObj = getDailyWord();
let targetWord = targetWordObj.word;
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
    alert("Lütfen 5 harf girin!");
    return;
  }

  let isCorrect = false;
  if (currentGuess === targetWord) {
    isCorrect = true;
    for (let i = 0; i < 5; i++) {
      const tile = document.getElementById(`tile-${currentRow}-${i}`);
      tile.classList.add("correct");
      tile.textContent = currentGuess[i].toUpperCase();
    }
    document.getElementById("success-message").textContent = targetWordObj.definition;
  } else {
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
  }

  if (isCorrect) {
    setTimeout(resetGame, 5000);
  } else {
    currentRow++;
    currentGuess = '';
    
    if (currentRow === 6) {
      setTimeout(() => {
        alert(`Maalesef, bilemediniz. Doğru kelime: ${targetWord.toUpperCase()}`);
        resetGame();
      }, 500);
    }
  }
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
  else if (e.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
  else if (currentGuess.length < 5 && e.key.match(/^[a-zA-ZçğıöşüÇĞİÖŞÜ]$/)) {
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
  const currentDate = getLocalDateString();
  targetWordObj = getDailyWord();
  targetWord = targetWordObj.word;
  currentGuess = '';
  currentRow = 0;
  document.getElementById("success-message").textContent = '';
  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = document.getElementById(`tile-${i}-${j}`);
      tile.textContent = '';
      tile.classList.remove("correct", "present", "absent");
    }
  }
}