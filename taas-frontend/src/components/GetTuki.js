import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./GetTuki.css";
import "../App.css";
import tukiFetcher from "../fetchers/TukiFetcher";
import Slider from "react-slick"; // Assuming you're using react-slick for the carousel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GetTuki = () => {
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Default to searching by name
  const [visibleSearch, setVisibleSearch] = useState("unset");
  const [tukiImagess, setTukiImagess] = useState("");
  const [visibleTuki, setVisibleTuki] = useState("none");
  const [searchErrorDisplay, setSearchErrorDisplay] = useState("none");

  const tukiImages = [
    "https://taas-cool-bucket.s3.amazonaws.com/tuki1.jpeg",
    "https://taas-cool-bucket.s3.amazonaws.com/tuki2.jpeg",
    // "https://taas-cool-bucket.s3.amazonaws.com/tuki3.jpeg",
    // "https://taas-cool-bucket.s3.amazonaws.com/tuki4.jpeg",
    // "https://taas-cool-bucket.s3.amazonaws.com/parrot.png",
  ];

  // To DO add dynamic Tuki carousal with backend request

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search based on searchType and searchName values
    console.log(
      "Searching Tukis by type:",
      searchType,
      "and name:",
      searchName
    );

    setSearchErrorDisplay("none");

    if (!searchName && !searchType) {
      setSearchErrorDisplay("unset");
    }

    //setVisibleSearch("none");
    if (searchBy === "name") {
      console.log("name");

      tukiFetcher
        .getTukisByName(searchName)
        .then((res) => {
          setTukiImagess(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (searchBy === "type") {
      tukiFetcher
        .getTukisByType(searchType)
        .then((res) => {
          setTukiImagess(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // request backend

    setVisibleTuki("unset");

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
          <p style={{ display: searchErrorDisplay, color: "red" }}>
            {"You need to enter something to search!"}
          </p>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <div
        style={{ textAlign: "center", padding: "20px", display: visibleTuki }}
      >
        <h1>Your requested Tuki:</h1>
        <div style={{ width: "70%", margin: "auto" }}>
          <Slider {...settings}>
            {tukiImages.map((image, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <img
                  src={image}
                  alt={image}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "1000px",
                    display: "block",
                    margin: "0 auto",
                    height: "300px",
                  }}
                />
                <div>
                  <h2>"tuki"</h2>
                  <p>"asdsad</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default GetTuki;
