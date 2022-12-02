let grid = document.querySelector("#game");

let fragment = document.createDocumentFragment();

const wordCount = 3;
const attempts = 3;

Array.from({ length: attempts }).forEach(() => {
  let row = document.createElement("div");
  row.classList.add("row");
  Array.from({ length: wordCount }).forEach(() => {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    row.appendChild(tile);
  });
  fragment.appendChild(row);
});

grid.appendChild(fragment);
