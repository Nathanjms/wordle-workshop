import Tile from "./Tile.js";

export default {
  isLoading: false,
  guessesAllowed: 4,
  currentRowIndex: 0,
  currentColIndex: 0,
  wordLength: 3,
  theWord: "",
  state: "active",
  message: "",

  get currentRow() {
    return this.board[this.currentRowIndex];
  },
  get currentGuess() {
    return this.currentRow.map((tile) => tile.letter).join("");
  },
  get remainingGuesses() {
    return this.guessesAllowed - this.currentRowIndex - 1;
  },

  async init() {
    this.board = Array.from({ length: this.guessesAllowed }, () => {
      return Array.from({ length: this.wordLength }, () => new Tile());
    });
    await this.fetchValidWords();
  },

  async fetchValidWords() {
    this.isLoading = true;
    try {
      const res = await fetch(`/wordLists/words${this.wordLength}.json`);
      this.validWords = await res.json();
      this.theWord = this.validWords[Math.floor(Math.random() * this.validWords.length)].toLowerCase();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  },

  onKeyPress(key) {
    if (/^[A-z]$/.test(key)) {
      this.message = "";
      this.fillTile(key.toLowerCase());
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
      this.message = "Game over, You Lose! Word was " + this.theWord;
      this.state = "complete";
      return;
    }

    this.message = "Zing-zong you are wrong";
    this.currentRowIndex++;
  },
};
