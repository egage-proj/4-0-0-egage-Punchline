export const renderJokes = (arrOfJokes) => {
    document.querySelector('ul').innerHTML = '';
    for (const joke of arrOfJokes[0]) {
        const li = document.createElement('li');
        li.innerHTML = `<p>${joke.setup}</p>`;

        const revealButton = document.createElement('button');
        revealButton.textContent = 'Reveal';
        revealButton.dataset.jokeId = joke.id;

        li.append(revealButton);
        document.querySelector('ul').append(li);
    }
};

export const renderGame = (jokeObj, arrOfJokes) => {
    const section = document.querySelector('#guessGame');
};