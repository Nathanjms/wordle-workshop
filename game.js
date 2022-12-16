import Tile from "./Tile.js";

export default {
  guessesAllowed: 4,
  currentRowIndex: 0,
  currentColIndex: 0,
  theWord: "cat",
  state: "active",
  message: "",

  get wordLength() {
    return this.theWord.length;
  },
  get currentRow() {
    return this.board[this.currentRowIndex];
  },
  get currentGuess() {
    return this.currentRow.map((tile) => tile.letter).join("");
  },

  init() {
    this.board = Array.from({ length: this.guessesAllowed }, () => {
      return Array.from({ length: this.wordLength }, () => new Tile());
    });
  },

  onKeyPress(key) {
    if (/^[A-z]$/.test(key)) {
      this.fillTile(key);
      return;
    }
    if (key === "Enter") {
      this.submitGuess(key);
    }
  },

  fillTile(key) {
    this.message = "";
    for (let tile of this.currentRow) {
      if (!tile.letter) {
        tile.letter = key;
        break;
      }
    }
  },

  submitGuess() {
    let guess = this.currentGuess;

    if (guess.length < this.wordLength) {
      return;
    }

    this.currentRow.forEach((tile, index) => {
      tile.updateStatus(this.theWord, index);
    });

    if (guess === this.theWord) {
      this.message = "Correct, you win!";
    } else if (this.guessesAllowed === this.currentRowIndex + 1) {
      this.message = "Game over, You Lose!";
      this.state = "complete";
    } else {
      this.currentRowIndex++;
      this.message = "Zing-zong you are wrong";
    }
  },
};
