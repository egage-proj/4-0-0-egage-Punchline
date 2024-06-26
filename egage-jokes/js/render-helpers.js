export const renderJokes = (arrOfJokes) => {
  document.querySelector("ul").innerHTML = "";
  for (const joke of arrOfJokes[0]) {
    const li = document.createElement("li");
    li.innerHTML = `<p>${joke.setup}</p>`;
    li.dataset.jokeId = joke.id;

    const revealButton = document.createElement("button");
    revealButton.textContent = "Punchline!";
    revealButton.dataset.jokeId = joke.id;

    const guessButton = document.createElement("button");
    guessButton.textContent = "Guess";
    guessButton.dataset.jokeId = joke.id;

    li.append(guessButton, revealButton);
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
    <p>${jokeObj.setup}</p>
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
      console.log("repeated");
      continue;
    }
  }
  modalContent.append(punchlineGrid);
  section.append(modalContent);
};
