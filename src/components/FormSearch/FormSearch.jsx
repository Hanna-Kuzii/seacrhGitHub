export const FormSearch = ({
  searchInput,
  setSearchInput,
  setError,
  setResults
}) => {

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

  return (
    <form className="form form-inline" onSubmit={handleSearch}>
      <div className="form__group form-group row mx-sm-3 mb-2">
        <label htmlFor="inputSearch" className="sr-only">
          Enter GitHub searchInput to search
        </label>
        <input
          type="text"
          id="inputSearch"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter a GitHub repository name to search"
          className="form__input form-control"
        />
      </div>
      <button type="submit" className="form__button btn btn-primary mb-2">
        Search
      </button>
    </form>
  );
};
