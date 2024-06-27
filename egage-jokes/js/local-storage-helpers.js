export const getScore = () => {
    try {
        return JSON.parse(localStorage.getItem('score'));
    } catch (err) {
        console.warn(err);
        return null;
    }
}

export const addScore = (plusScore) => {
    const score = getScore();
    localStorage.clear();
    localStorage.setItem('score', JSON.stringify(score + plusScore));
}

export const initScore = () => {
    localStorage.setItem('score', JSON.stringify(0));
}

export const resetScore = () => {
    localStorage.clear();
    initScore();
}