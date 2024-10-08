export default class Tile {
  letter = "";
  status = ""; // correct, present, absent

  fill(key) {
    this.letter = key.toLowerCase();
  }

  empty() {
    this.letter = "";
  }

  updateStatus(theWord, index) {
    if (!theWord.includes(this.letter)) {
      this.status = "absent";
    } else if (this.letter === theWord[index]) {
      this.status = "correct";
    } else {
      this.status = "present";
    }
  }
}
