import React, { Component, useState, useEffect } from "react";
import "../App.css";
import "./UploadTuki.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tukiName);
    console.log(tukiType);
    console.log(image);
    // Handle form submission here
  };

  // useEffect(() => {
  //   if (uploadedFile) {
  //     console.log(uploadedFile);
  //   }
  //   if (tukiName) {
  //     console.log(tukiName);
  //   }
  //   // Do something
  // }, [uploadedFile, tukiName]);

  // const uploadFile = (e) => {
  //   console.log(uploadedFile);
  // };

  // return (
  //   <div className="App">
  //     <div>
  //       <input
  //         type="file"
  //         onChange={(e) => setUploadedFile(e.target.files[0])}
  //       />
  //       <input type="text" onChange={(e) => setTukiName(e.target.value)} name />
  //       <button onClick={uploadFile}>Upload</button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="input-form-container">
      {/* <h2>Input Form</h2> */}
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
  );
};

export default UploadTuki;
