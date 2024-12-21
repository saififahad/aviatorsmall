import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

serviceWorkerRegistration.register();
