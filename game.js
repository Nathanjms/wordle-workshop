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
  get remainingGuesses() {
    return this.guessesAllowed - this.currentRowIndex - 1;
  },

  init() {
    this.board = Array.from({ length: this.guessesAllowed }, () => {
      return Array.from({ length: this.wordLength }, () => new Tile());
    });
  },

  onKeyPress(key) {
    if (/^[A-z]$/.test(key)) {
      this.message = "";
      this.fillTile(key);
      return;
    }
    if (key === "Backspace") {
      this.emptyTile();
    }
    if (key === "Enter") {
      this.submitGuess(key);
      return;
    }
  },

  fillTile(key) {
    this.currentRow.find((t) => !t.letter)?.fill(key); // Fill the next tile in the row without a letter (if one exists)
  },

  emptyTile() {
    this.currentRow.findLast((t) => t.letter)?.empty(); // Empty the last tile in the row that isn't empty (if one exists)
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
      this.state = "complete";
      return;
    }

    if (this.remainingGuesses === 0) {
      this.message = "Game over, You Lose!";
      this.state = "complete";
      return;
    }

    this.message = "Zing-zong you are wrong";
    this.currentRowIndex++;
  },
};
