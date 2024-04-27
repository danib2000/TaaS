import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./GetTuki.css";
import "../App.css";

const GetTuki = () => {
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Default to searching by name
  const [visibleSearch, setVisibleSearch] = useState("unset");

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search based on searchType and searchName values
    console.log(
      "Searching Tukis by type:",
      searchType,
      "and name:",
      searchName
    );
    //setVisibleSearch("none");
    // You can add your search logic here
  };

  return (
    <div>
      <div className="search-container" style={{ display: visibleSearch }}>
        <h1>Search Tukis</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="radio-group">
            <label className="label-form">
              <input
                type="radio"
                value="name"
                checked={searchBy === "name"}
                onChange={() => setSearchBy("name")}
              />
              Search by Name
            </label>
            <label className="label-form">
              <input
                type="radio"
                value="type"
                checked={searchBy === "type"}
                onChange={() => setSearchBy("type")}
              />
              Search by Type
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="searchInput">
              {searchBy === "name" ? "Name" : "Type"}:
            </label>
            <input
              type="text"
              id="searchInput"
              value={searchBy === "name" ? searchName : searchType}
              onChange={(e) =>
                searchBy === "name"
                  ? setSearchName(e.target.value)
                  : setSearchType(e.target.value)
              }
              placeholder={`Enter ${searchBy === "name" ? "name" : "type"}`}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetTuki;
