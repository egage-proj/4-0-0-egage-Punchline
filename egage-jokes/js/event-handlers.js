import { fetchJokeID, fetchJokeListByType } from "./fetch-helpers";
import {
  addScore,
  getHighScore,
  getScore,
  resetScore,
} from "./local-storage-helpers";
import { renderAnswered, renderGame, renderJokes } from "./render-helpers";

export const submitHandler = async (event) => {
  event.preventDefault();
  const type = document.querySelector("#jokeTypeSelect").value;
  renderJokes(await fetchJokeListByType(type));
  event.target.reset();
};

export let lastJoke = "placeholder";

export const revealEvent = async (event) => {
  if (event.target.matches("button")) {
    const joke = await fetchJokeID(event.target.dataset.jokeId);
    if (event.target.textContent === "Punchline!")
      event.target.parentElement.parentElement.innerHTML = `<p>${joke[0].setup}</p><p>    </p><p>${joke[0].punchline}</p>`;
    else if (event.target.textContent === "Guess") {
      const fakes = await fetchJokeListByType();
      renderGame(joke[0], fakes[0]);
      lastJoke = joke[0].setup;
      event.target.parentElement.parentElement.innerHTML = `<p>${joke[0].setup}</p>`;
    }
  }
};

export const gameAnswer = async (event) => {
  if (event.target.matches("button")) {
    const curJoke =
      event.target.parentElement.parentElement.children[0].children[0]
        .textContent;
    if (event.target.dataset.correct === "true") {
      document.querySelector("#guessGame").innerHTML = `
    <div class="flex-box modal-content">
      <h2>Ha Ha! Yeah!!</h2>
      <span class="close">&times;</span>
    </div>
    `;
      const li = document.querySelectorAll("li");
      for (const element of li) {
        if (element.children[0].textContent === curJoke) {
          element.dataset.answered = "true";
        }
      }
      addScore(1);
      // const highScoreCounter = document.querySelector("#score-tracker");
      // if (Number(highScoreCounter.dataset.highScore) < getScore()) {
      //   highScoreCounter.textContent = `High Score: ${getScore()}`;
      //   highScoreCounter.dataset.highScore = getScore();
      // }
    } else {
      document.querySelector("#guessGame").innerHTML = `
    <div class="flex-box modal-content">
      <h2>Nah. thats not it...</h2>
      <span class="close">&times;</span>
    </div>
    `;
      resetScore();
    }
    const highScoreCounter = document.querySelector("#score-tracker");
    highScoreCounter.textContent = `Current Score: ${getScore()} | High Score: ${getHighScore()}`;
    // console.log("curr score: ", getScore());
    // console.log("hi score: ", getHighScore());
  }
};

export const closeModal = async (event) => {
  if (!event.target.matches(".close") && event.target.matches("div, div > *")) {
    return;
  }

  event.currentTarget.style.display = "none";
  renderAnswered();
};
