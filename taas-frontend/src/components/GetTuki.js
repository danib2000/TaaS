import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./GetTuki.css";
import "../App.css";
import tukiFetcher from "../fetchers/TukiFetcher";
import Slider from "react-slick"; // Assuming you're using react-slick for the carousel
import AWS from "aws-sdk";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GetTuki = () => {
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Default to searching by name
  const [visibleSearch, setVisibleSearch] = useState("unset");
  const [tukiImagess, setTukiImagess] = useState([]);
  const [visibleTuki, setVisibleTuki] = useState("none");
  const [searchErrorDisplay, setSearchErrorDisplay] = useState("none");

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
      return;
    }
    setTukiImagess([]);

    //setVisibleSearch("none");
    if (searchBy === "name") {
      console.log("name");

      tukiFetcher
        .getTukisByName(searchName)
        .then((res) => {
          console.log(res.data.data);
          res.data.data.forEach((tuki) => {
            console.log(tuki);
            setTukiImagess((tukiImagess) => [...tukiImagess, tuki]);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (searchBy === "type") {
      tukiFetcher
        .getTukisByType(searchType)
        .then((res) => {
          res.data.data.forEach((tuki) => {
            console.log(tuki);
            setTukiImagess((tukiImagess) => [...tukiImagess, tuki]);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setVisibleTuki("unset");
  };

  const handleDelete = async (index) => {
    // Remove the image at the specified index
    console.log("asdsad");

    console.log(tukiImagess[index]);
    await deleteS3Object(
      tukiImagess[index].name,
      tukiImagess[index].image_source
    );
    tukiFetcher
      .deleteTuki(tukiImagess[index].id)
      .then((res) => {
        setVisibleTuki("none");
      })
      .catch((err) => {
        console.error(err);
      });
    // You can also make a delete request to the backend to delete the image permanently
  };

  const deleteS3Object = async (tukiName, image_source) => {
    return new Promise((resolve, reject) => {
      try {
        const s3_name = image_source.split("/");

        const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;

        // S3 Region
        const REGION = process.env.REACT_APP_S3_REGION;

        // S3 Credentials
        AWS.config.update({
          accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_S3_PRIVATE_KEY,
        });
        const s3 = new AWS.S3({
          params: { Bucket: S3_BUCKET },
          region: REGION,
        });

        // Files Parameters

        const params = {
          Bucket: S3_BUCKET,
          Key: s3_name[s3_name.length - 1],
        };

        s3.deleteObject(params, function (err, data) {
          if (err) reject(err);
          // an error occurred
          else resolve(data); // successful response
        });
      } catch (e) {
        reject(e);
      }
    });
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
            {tukiImagess.map((image, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <img
                  src={image.image_source}
                  alt={image.image_source}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "1000px",
                    display: "block",
                    margin: "0 auto",
                    height: "300px",
                  }}
                />
                <div>
                  <h2>{image.name}</h2>
                  <p>{image.type}</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete-button"
                  >
                    Delete Tuki
                  </button>
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
