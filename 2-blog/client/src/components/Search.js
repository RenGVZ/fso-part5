import React from "react";

const Search = ({ getResults, useSearch, setSearch, useSearchResults }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    getResults();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        Search:{" "}
        <input value={useSearch} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul style={{ listStyle: "none" }}>
        {useSearchResults.length > 0 ? (
          useSearchResults.map((res) => (
            <li key={res.name}>
              Name: {res.name} #: {res.number}
            </li>
          ))
        ) : (
          <p>No results</p>
        )}
      </ul>
    </>
  );
};

export default Search;
