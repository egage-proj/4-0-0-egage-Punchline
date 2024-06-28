export const getScore = () => {
  try {
    // console.log("score", JSON.parse(localStorage.getItem("score")));
    return JSON.parse(localStorage.getItem("score"));
  } catch (err) {
    console.warn(err);
    return null;
  }
};
export const getHighScore = () => {
  try {
    // console.log("hiscore", JSON.parse(localStorage.getItem("hiscore")));
    return JSON.parse(localStorage.getItem("hiscore"));
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const addScore = (plusScore) => {
  const score = getScore();
  //   console.log(score);
  //   localStorage.clear();
  localStorage.setItem("score", JSON.stringify(score + plusScore));
  setHighScore(score + plusScore);
};
export const setHighScore = (currScore) => {
  const hiScore = getHighScore();
  //   console.log(hiScore);
  //   console.log(currScore);
  //   console.log(Number(currScore) > Number(hiScore));
  if (currScore > hiScore) {
    localStorage.setItem("hiscore", JSON.stringify(currScore));
  }
};

export const initScore = () => {
  localStorage.setItem("score", JSON.stringify(0));
};
export const initHighScore = () => {
  localStorage.setItem("hiscore", JSON.stringify(0));
};

export const resetScore = () => {
  //   localStorage.clear();
  initScore();
};
