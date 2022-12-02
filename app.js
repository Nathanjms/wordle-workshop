import game from "./game.js";

document.addEventListener("alpine:init", () => {
  Alpine.data("game", () => game);
});
