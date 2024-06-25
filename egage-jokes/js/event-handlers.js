import { fetchJokeID, fetchJokeListByType } from "./fetch-helpers";
import { renderJokes } from "./render-helpers";

export const submitHandler = async (event) => {
    event.preventDefault();
    const type = document.querySelector('#jokeTypeSelect').value;
    renderJokes(await fetchJokeListByType(type));
};

export const revealEvent = async (event) => {
    if (event.target.matches('button')) {
        const joke = await fetchJokeID(event.target.dataset.jokeId);
        event.target.parentElement.innerHTML = `<p>${joke[0].setup} | ${joke[0].punchline}</p>`;
    };
}