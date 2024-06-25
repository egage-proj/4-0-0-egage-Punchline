import { fetchJokeID, fetchJokeListByType } from "./fetch-helpers";
import { renderGame, renderJokes } from "./render-helpers";

export const submitHandler = async (event) => {
    event.preventDefault();
    const type = document.querySelector('#jokeTypeSelect').value;
    renderJokes(await fetchJokeListByType(type));
};

export const revealEvent = async (event) => {
    if (event.target.matches('button')) {
        const joke = await fetchJokeID(event.target.dataset.jokeId);
        if (event.target.textContent === 'Reveal') event.target.parentElement.innerHTML = `<p>${joke[0].setup} | ${joke[0].punchline}</p>`;
        else if (event.target.textContent === 'Guess') {
            const fakes = await fetchJokeListByType();
            renderGame(joke[0], fakes[0]);
            event.target.parentElement.innerHTML = `<p>${joke[0].setup}</p>`;
        };
    };
}

export const gameAnswer = async (event) => {
    if (event.target.matches('button')) {
        const curJoke = event.target.parentElement.children[0].textContent;
        if (event.target.dataset.correct === 'true') document.querySelector('#guessGame').innerHTML = 'Correct!';
        else document.querySelector('#guessGame').innerHTML = 'Wrong!';
        const li = document.querySelectorAll('li');
        for (const element of li) {
            if (element.children[0].textContent === curJoke) {
                const joke = await fetchJokeID(element.dataset.jokeId);
                element.innerHTML = `<p>${joke[0].setup} | ${joke[0].punchline}</p>`;
            };
        }
        
    }
}