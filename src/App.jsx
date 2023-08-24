import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  let [query, setQuery] = useState("");
  let [word, setWord] = useState("");
  let [data, setData] = useState({
    responseData: { translatedText: "Default text" },
  });
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const api_url = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Ces&q=${query}&mt=1&onlyprivate=0&de=a%40b.c`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ce6398b989mshb1a121f24c9fb40p104d72jsn873ec3b6a7e8",
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };
    setIsLoading(true);
    fetch(api_url, options)
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
        setIsLoading(false);
      });
  }, [query]);
  const handleForm = (event) => {
    event.preventDefault();
    setQuery(word);
  };
  const handleButton = (e) => {
    setWord(e.target.value);
  };
  return (
    <>
      <h1>Traductor del ingles al español</h1>
      <main className="container ">
        <form action="" onSubmit={handleForm}>
          <textarea
            type="text"
            className="input"
            onKeyUp={handleButton}
          ></textarea>
          <button type="submit">Traducir</button>
        </form>
        <div className="traduccion">
          {isLoading ? (
            <p>Cargando....</p>
          ) : data.responseStatus === '403' ? (
            <p>No hay texto</p>
          ) : (
            <p>{data.responseData.translatedText}</p>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
