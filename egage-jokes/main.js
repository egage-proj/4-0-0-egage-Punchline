import {
  closeModal,
  gameAnswer,
  revealEvent,
  submitHandler,
} from "./js/event-handlers";
import { fetchJokeListByType } from "./js/fetch-helpers";
import {
  getHighScore,
  getScore,
  initHighScore,
  initScore,
} from "./js/local-storage-helpers";
import { renderJokes } from "./js/render-helpers";
import "./style.css";

const main = async () => {
  if (!getScore()) initScore();
  if (!getHighScore()) initHighScore();
  renderJokes(await fetchJokeListByType());
  document.querySelector("form").addEventListener("submit", submitHandler);
  document.querySelector("ul").addEventListener("click", revealEvent);
  document.querySelector("#guessGame").addEventListener("click", gameAnswer);
  document.querySelector("#guessGame").addEventListener("click", closeModal);
};

main();
