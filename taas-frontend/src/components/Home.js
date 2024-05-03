import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import Slider from "react-slick"; // Assuming you're using react-slick for the carousel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const tukiImages = [
    "https://taas-cool-bucket.s3.amazonaws.com/tuki1.jpeg",
    "https://taas-cool-bucket.s3.amazonaws.com/tuki2.jpeg",
    "https://taas-cool-bucket.s3.amazonaws.com/tuki3.jpeg",
    "https://taas-cool-bucket.s3.amazonaws.com/tuki4.jpeg",
    "https://taas-cool-bucket.s3.amazonaws.com/parrot.png",
  ];

  // To DO add dynamic Tuki carousal with backend request

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to TaaS - Tuki as a Service</h1>
      <p>
        TaaS is a platform that provides Tuki as a service. Whether you need
        assistance with technical issues, guidance, or just someone to talk to,
        TaaS has got you covered for all your Tuki needs!
      </p>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center" }}>The Two Main Features:</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "20px",
          }}
        >
          <div style={{ margin: "0 20px", width: "30%" }}>
            <h3>Search for a Tuki</h3>
            <p>
              Find a Tuki by their name or type to get the support you need
              quickly and easily.
            </p>
            <Link to="/Get-Tuki" style={{ textDecoration: "none" }}>
              <button>Get Tuki</button>
            </Link>{" "}
          </div>
          <div style={{ margin: "0 20px", width: "30%" }}>
            <h3>Upload a Tuki</h3>
            <p>
              Upload your own Tuki to the backend and S3 bucket to share your
              knowledge and offer support to others.
            </p>
            <Link to="/upload-Tuki" style={{ textDecoration: "none" }}>
              <button>Upload a Tuki</button>
            </Link>{" "}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "50px", margin: "20px" }}>
        <h2>Our Current Tukis</h2>
        <Slider {...settings} style={{ height: "98%", width: "98%" }}>
          {tukiImages.map((image, index) => (
            <div key={index} style={{ height: "100%" }}>
              <img
                src={image}
                alt={`Tuki ${index}`}
                style={{ width: "500px", height: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
