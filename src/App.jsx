import React, { useEffect, useState } from "react";
import logo from "./images/logo.png";
import mark from "./images/mark.svg";
import "./style/App.css";
import { escape } from "querystring";
import { FormSearch } from "./components/FormSearch/FormSearch";
import { DisplayResults } from "./components/DisplayResults/DisplayResults";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  console.log(results);
  useEffect(() => {
    setError(false);
  }, [searchInput]);

  return (
    <div className="app">
      <h1 className="app__header">Search repositories</h1>
      <div className="app__github">
        <img src={logo} alt="github" className="app__logo" />
        <img src={mark} alt="mark" className="app__mark" />
      </div>
      <FormSearch
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setError={setError}
        setResults={setResults}
      />
      {results.length !== 0 && (
        <DisplayResults results={results} />
      )}
      {error && <div className="app__error">Can't find any repositories</div>}
    </div>
  );
}

export default App;
