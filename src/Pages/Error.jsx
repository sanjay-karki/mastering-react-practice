import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <h1 style={{ padding: "1rem", marginTop: "5.5rem" }}>
        ERROR 404 | Page not found
      </h1>
      <Link to="/" className="nav-link">
        <h2>Go back to Homepage</h2>
      </Link>
    </>
  );
}

export default Error;
