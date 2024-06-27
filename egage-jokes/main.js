import {
  closeModal,
  gameAnswer,
  revealEvent,
  submitHandler,
} from "./js/event-handlers";
import { fetchJokeListByType } from "./js/fetch-helpers";
import { getScore, initScore } from "./js/local-storage-helpers";
import { renderJokes } from "./js/render-helpers";
import "./style.css";

const main = async () => {
  if (!getScore())  initScore();
  renderJokes(await fetchJokeListByType());
  document.querySelector("form").addEventListener("submit", submitHandler);
  document.querySelector("ul").addEventListener("click", revealEvent);
  document.querySelector("#guessGame").addEventListener("click", gameAnswer);
  document.querySelector("#guessGame").addEventListener("click", closeModal);
};

main();
