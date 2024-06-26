export const renderJokes = (arrOfJokes) => {
    document.querySelector('ul').innerHTML = '';
    for (const joke of arrOfJokes[0]) {
        const li = document.createElement('li');
        li.innerHTML = `<p>${joke.setup}</p>`;
        li.dataset.jokeId = joke.id;

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

    const jokes = new Map();
    jokes.set(jokeObj.id, jokeObj);
    
    const right = Math.floor(Math.random() * 4);
    let createdButtons = 0;
    while (createdButtons < 4) {
        const random = Math.floor(Math.random() * jokeArr.length);
        if (right === createdButtons) {
            const button = document.createElement('button');
            button.dataset.correct = true;
            button.textContent = jokeObj.punchline;
            section.append(button);
            createdButtons++;
        } else if (!jokes.has(jokeArr[random].id)) {
            jokes.set(jokeArr[random].id, jokeArr[random]);
            const button = document.createElement('button');
            button.dataset.correct = false;
            button.textContent = jokeArr[random].punchline;
            section.append(button);
            createdButtons++;
        } else {
            console.log('repeated');
            continue;
        }
    }
};