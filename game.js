import Tile from "./Tile.js";

export default {
  isLoading: false,
  guessesAllowed: 5,
  currentRowIndex: 0,
  currentColIndex: 0,
  wordLength: 4,
  theWord: "",
  state: "active",
  message: "",
  error: "",

  letters: ["QWERTYUIOP".split(""), "ASDFGHJKL".split(""), ["Enter", ..."ZXCVBNM".split(""), "Backspace"]],

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
    this.error = "";
    try {
      const res = await fetch(`/wordLists/words${this.wordLength}.json`);
      this.validWords = (await res.json()).map((w) => w.toLowerCase());
      // Grab random word from list
      this.theWord = this.validWords[Math.floor(Math.random() * this.validWords.length)];
    } catch (error) {
      this.error = "An error has occurred, please let me know!";
      console.error(error);
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

    if (!this.validWords.includes(guess)) {
      this.message = "Invalid Word";
      return;
    }

    this.setTileStatuses();

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

  setTileStatuses() {
    let wordLetters = this.theWord.split("");

    this.currentRow.forEach((tile, idx) => {
      // Mark all as absent...
      tile.status = "absent";
      // ...then if an exact match is found, remove that letter from the word
      if (tile.letter === wordLetters[idx]) {
        tile.status = "correct";
        wordLetters.splice(idx, 1, "_");
      }
    });

    // Loop again on the partial word
    this.currentRow.forEach((tile) => {
      // If letter still exists in the word, mark as present and remove letter from word
      const foundIndex = wordLetters.indexOf(tile.letter);
      if (foundIndex !== -1 && tile.status === "absent") {
        tile.status = "present";
        wordLetters.splice(foundIndex, 1, "_");
      }
    });
  },
};
