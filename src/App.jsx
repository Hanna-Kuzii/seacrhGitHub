import React, { useEffect, useState } from "react";
import logo from "./images/logo.png";
import mark from "./images/mark.svg";
import "./style/App.css";
import { escape } from "querystring";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchInput}+in:name,description`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.items.length === 0) {
        setError(true);
      } else {
        setError(false);
      }

      setResults(data.items);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
      setError(false);
  }, [searchInput])


  return (
    <div className="app">
      <h1 className="app__header">Search repositories</h1>
      <div className="app__github">
        <img src={logo} alt="github" className="app__logo" />
        <img src={mark} alt="mark" className="app__mark" />
      </div>
      <form className="app__form form-inline" onSubmit={handleSearch}>
        <div className="app__form_group form-group row mx-sm-3 mb-2">
          <label htmlFor="inputSearch" className="sr-only">
            Enter GitHub searchInput to search
          </label>
          <input
            type="text"
            id="inputSearch"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter a GitHub repository name to search"
            className="app__input form-control"
          />
        </div>
        <button type="submit" className="app__button btn btn-primary mb-2">
          Search
        </button>
      </form>
      {results.length !== 0 && (
        <div className="app__results results">
          <table className="table results__table">
            <thead className="results__head">
              <tr className="results__row">
                <th scope="col" className="results__column">
                  #
                </th>
                <th scope="col" className="results__column">
                  Name of repository
                </th>
                <th scope="col" className="results__column">
                  Description
                </th>
                <th scope="col" className="results__column">
                  Author
                </th>
              </tr>
            </thead>
            <tbody className="results__body">
              {results.map((item, index) => (
                <tr key={item.id} className="results__item">
                  <th scope="row">{index + 1}</th>
                  <td className="results__name">
                    <a href={item.html_url}>{item.name}</a>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.owner.login}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <div className="app__error">Can't find any repositories</div>}
    </div>
  );
}

export default App;
