import "./style.css";

// API Test
const apiTest = async () => {
  const testRoute = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);
    return data;
  };
  const url1 = `https://official-joke-api.appspot.com/jokes/programming/ten`;
  const url2 = `https://official-joke-api.appspot.com/jokes/programming/random`;
  const testMany = await testRoute(url1);
  const testSingle = await testRoute(url2);

  document.body.innerHTML += `
  <p>${testSingle[0].setup} | ${testSingle[0].punchline}</p>
  <p>-------------------------------------------------</p>`;

  for (let joke of testMany) {
    document.body.innerHTML += `
    <p>${joke.setup} | ${joke.punchline}</p>`;
  }
};

const main = () => {
  // apiTest();

  const form = document.querySelector("form");
  console.log(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
  });
};

main();
