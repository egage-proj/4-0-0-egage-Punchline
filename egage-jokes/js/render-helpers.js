import { lastJoke } from "./event-handlers";
import { fetchJokeID } from "./fetch-helpers";

export const renderButtons = (joke) => {
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("flex-box");

    const revealButton = document.createElement("button");
    revealButton.textContent = "Punchline!";
    revealButton.dataset.jokeId = joke.id;

    const guessButton = document.createElement("button");
    guessButton.textContent = "Guess";
    guessButton.dataset.jokeId = joke.id;

    buttonDiv.append(guessButton, revealButton)
    return buttonDiv;
}

export const renderJoke = (element, joke) => {
    element.innerHTML = `<p>${joke.setup}</p>`;
    element.dataset.jokeId = joke.id;
    element.dataset.answered = 'false';
    element.classList.add("flex-box");

    element.append(renderButtons(joke));
    return element;
}

export const renderJokes = (arrOfJokes) => {
  document.querySelector("ul").innerHTML = "";
  for (const joke of arrOfJokes[0]) {
    const li = renderJoke(document.createElement('li'), joke);
    document.querySelector("ul").append(li);
  }
};

export const renderGame = (jokeObj, jokeArr) => {
  const section = document.querySelector("#guessGame");
  section.replaceChildren();

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content", "column-flex-box");
  modalContent.innerHTML = `
  <div class="flex-box">
    <h2>${jokeObj.setup}</h2>
    <span class="close">&times;</span>
  </div>
  `;

  const punchlineGrid = document.createElement("div");
  punchlineGrid.classList.add("grid-2-column");

  section.style.display = "block";

  const jokes = new Map();
  jokes.set(jokeObj.id, jokeObj);

  const right = Math.floor(Math.random() * 4);
  let createdButtons = 0;
  while (createdButtons < 4) {
    const random = Math.floor(Math.random() * jokeArr.length);
    if (right === createdButtons) {
      const button = document.createElement("button");
      button.dataset.correct = true;
      button.textContent = jokeObj.punchline;
      punchlineGrid.append(button);
      createdButtons++;
    } else if (!jokes.has(jokeArr[random].id)) {
      jokes.set(jokeArr[random].id, jokeArr[random]);
      const button = document.createElement("button");
      button.dataset.correct = false;
      button.textContent = jokeArr[random].punchline;
      punchlineGrid.append(button);
      createdButtons++;
    } else {
      continue;
    }
  }
  modalContent.append(punchlineGrid);
  section.append(modalContent);
};

export const renderAnswered = async () => {
    const currentJokes = document.querySelectorAll('li');
    for (const joke of currentJokes) {
      if (joke.children[0].textContent === lastJoke) {
          const jokeObj = await fetchJokeID(joke.dataset.jokeId);
          if (joke.dataset.answered === 'false') {
              joke.append(renderButtons(jokeObj[0]));
          } else {
              joke.innerHTML = `<p>${jokeObj[0].setup}</p><p>    </p><p>${jokeObj[0].punchline}</p>`;
          }
      }
    }
}