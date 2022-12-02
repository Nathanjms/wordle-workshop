import Tile from "./Tile.js";

export default {
  guessesAllowed: 4,
  wordLength: 3,
  currentRowIndex: 0,
  currentColIndex: 0,

  init() {
    this.board = Array.from({ length: this.guessesAllowed }, () => {
      return Array.from({ length: this.wordLength }, () => new Tile());
    });
  },

  onKeyPress(key) {
    if (/^[A-z]$/.test(key)) {
      this.fillTile(key);
    }
  },

  fillTile(key) {
    for (let tile of this.currentRow()) {
      if (!tile.letter) {
        tile.letter = key;
        break;
      }
    }

    if (this.currentColIndex === this.wordLength - 1 && this.currentRowIndex !== this.guessesAllowed - 1) {
      ++this.currentRowIndex;
      this.currentColIndex = 0;
    } else {
      ++this.currentColIndex;
    }
  },

  currentRow() {
    return this.board[this.currentRowIndex];
  },
};
