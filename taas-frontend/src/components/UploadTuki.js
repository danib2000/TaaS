import React, { Component, useState, useEffect } from "react";
import AWS from "aws-sdk";

import "../App.css";
import "./UploadTuki.css";
import "../fetchers/TukiFetcher";
import TukiFetcher from "../fetchers/TukiFetcher";

const UploadTuki = () => {
  const [image, setImage] = useState();
  const [tukiName, setTukiName] = useState();
  const [tukiType, setTukiType] = useState();

  const handleNameChange = (e) => {
    setTukiName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTukiType(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tukiName);
    console.log(tukiType);
    console.log(image);

    // S3 Bucket Name
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
      Key: tukiName + ".png",
      Body: image,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");

      TukiFetcher.postTuki(
        tukiName,
        tukiType,
        "https://taas-bucket-colman.s3.amazonaws.com/" + tukiName + ".png"
      );
      // TO DO add POST request to backend to create Tuki in DB
    });

    // Handle form submission here
  };

  return (
    <div>
      <div className="upload-heading">
        <h2>Upload Tuki</h2>
        <p>This page is used to upload Tuki to the service.</p>
      </div>
      <div className="input-form-container">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={tukiName}
              onChange={handleNameChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              value={tukiType}
              onChange={handleTypeChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadTuki;
