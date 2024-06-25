export const renderJokes = (arrOfJokes) => {
    document.querySelector('ul').innerHTML = '';
    for (const joke of arrOfJokes[0]) {
        const li = document.createElement('li');
        li.innerHTML = `<p>${joke.setup}</p>`;

        const revealButton = document.createElement('button');
        revealButton.textContent = 'Reveal';
        revealButton.dataset.jokeId = joke.id;

        const guessButton = document.createElement('button');
        guessButton.textContent = 'Guess';
        guessButton.dataset.jokeId = joke.id;

        li.append(guessButton, revealButton);
        document.querySelector('ul').append(li);
    }
};

export const renderGame = (jokeObj, jokeArr) => {
    const section = document.querySelector('#guessGame');
    section.innerHTML = `<p>${jokeObj.setup}</p>`;
    const right = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.classList.add('answers');
        button.textContent = jokeArr[Math.floor(Math.random() * jokeArr.length)].punchline;
        if (i === right) {
            button.dataset.correct = true;
            button.textContent = jokeObj.punchline;
        } else {
            button.dataset.correct = false;
        }
        section.append(button);
    };
    
};