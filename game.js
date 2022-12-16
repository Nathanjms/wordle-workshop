import Tile from "./Tile.js";

export default {
  guessesAllowed: 4,
  currentRowIndex: 0,
  currentColIndex: 0,
  theWord: "cat",

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
    console.log(this.currentGuess, this.wordLength);
    if (guess.length < this.wordLength) {
      return;
    }

    if (guess === this.theWord) {
      alert("correct");
    } else {
      this.currentRowIndex++;
      alert("zing zong you are wrong");
    }
  },
};
