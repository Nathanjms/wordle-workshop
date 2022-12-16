import Tile from "./Tile.js";

export default {
  guessesAllowed: 4,
  currentRowIndex: 0,
  currentColIndex: 0,
  theWord: "cat",
  state: "active",
  message: "",

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

  get wordLength() {
    return this.theWord.length;
  },
  get currentRow() {
    return this.board[this.currentRowIndex];
  },
  get currentGuess() {
    return this.currentRow.map((tile) => tile.letter).join("");
  },

  submitGuess() {
    let guess = this.currentGuess;

    if (guess.length < this.wordLength) {
      return;
    }

    this.handleTileStatusesForRow();

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

  handleTileStatusesForRow() {
    this.currentRow.forEach((tile, index) => {
      if (!this.theWord.includes(tile.letter)) {
        tile.status = "absent";
      } else if (tile.letter === this.theWord[index]) {
        tile.status = "correct";
      } else {
        tile.status = "present";
      }
    });
  },
};
