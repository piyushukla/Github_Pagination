import React from "react";
import Fetch from "./Components/Fetch_data";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>
        Developers who have forked React Repository.
      </h1>
      <Fetch />
    </div>
  );
}

export default App;
