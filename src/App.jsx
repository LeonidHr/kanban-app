import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

import "./styles/common.scss";
import "./styles/null.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/boards"
          element={<ComingSoon />}
        />

        <Route
          path="/calendar"
          element={<ComingSoon />}
        />

        <Route
          path="/favorites"
          element={<ComingSoon />}
        />

        <Route
          path="/settings"
          element={<ComingSoon />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;