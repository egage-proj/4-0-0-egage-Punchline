import "./style.css";

// API Test
const apiTest = () => {
  const testRoute = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);
  };
  const url1 = `https://official-joke-api.appspot.com/jokes/programming/ten`;
  const url2 = `https://official-joke-api.appspot.com/jokes/programming/random`;
  testRoute(url1);
  testRoute(url2);
};
apiTest();
