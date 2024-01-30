import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// importing pages

import BasicAuth from "./pages/basicAuth";
import Auth0 from "./pages/auth0";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")} style={{ margin: "5px" }}>
        Basic
      </button>
      <button onClick={() => navigate("/oauth")} style={{ margin: "5px" }}>
        OAuth
      </button>
      <Routes>
        <Route path="/" element={<BasicAuth />} />
        <Route path="/oauth" element={<Auth0 />} />
      </Routes>
    </div>
  );
}

export default App;
