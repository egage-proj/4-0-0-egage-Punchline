export const fetchJokeListByType = async (jokeType = "") => {
  // we will have to make the passed in strings start with a "/"
  // so they can be added to the url cleanly
  const url = `https://official-joke-api.appspot.com/jokes${jokeType}/ten`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Fetch failed with status - ${response.status}, ${response.statusText}`
      );
    }

    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );
    if (isJson) {
      const json = await response.json();
      return [json, null];
    }

    const textData = await response.text();
    return [textData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

export const fetchJokeID = async (jokeId) => {
  const url = `https://official-joke-api.appspot.com/jokes${jokeId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Fetch failed with status - ${response.status}, ${response.statusText}`
      );
    }

    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );
    if (isJson) {
      const json = await response.json();
      return [json, null];
    }

    const textData = await response.text();
    return [textData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};
