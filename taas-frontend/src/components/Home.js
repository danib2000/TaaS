import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Home = () => {
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
    </div>
  );
};

export default Home;
