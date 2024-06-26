import {
  closeModal,
  gameAnswer,
  revealEvent,
  submitHandler,
} from "./js/event-handlers";
import { fetchJokeID, fetchJokeListByType } from "./js/fetch-helpers";
import { renderJokes } from "./js/render-helpers";
import "./style.css";

// API Test
const apiTest = async () => {
  const testRoute = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);
    return data;
  };
  const url1 = `https://official-joke-api.appspot.com/jokes/programming/ten`;
  const url2 = `https://official-joke-api.appspot.com/jokes/programming/random`;
  const testMany = await testRoute(url1);
  const testSingle = await testRoute(url2);

  document.body.innerHTML += `
  <p>${testSingle[0].setup} | ${testSingle[0].punchline}</p>
  <p>-------------------------------------------------</p>`;

  for (let joke of testMany) {
    document.body.innerHTML += `
    <p>${joke.setup} | ${joke.punchline}</p>`;
  }
};

const main = async () => {
  // apiTest();
  renderJokes(await fetchJokeListByType());
  document.querySelector("form").addEventListener("submit", submitHandler);
  document.querySelector("ul").addEventListener("click", revealEvent);
  const testJoke = await fetchJokeID(Math.floor(Math.random() * 406));
  const testArr = await fetchJokeListByType();
  document.querySelector("#guessGame").addEventListener("click", gameAnswer);
  document.querySelector("#guessGame").addEventListener("click", closeModal);
};

main();
