import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import SharedLayout from "./shared-layout";
import Overview from "./pages/overview";
import Policies from "./pages/policies";
import Claims from "./pages/claims";
import { Login } from "./pages/login.page";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<SharedLayout />}>
          <Route path="" element={<Overview />} />
          <Route path="policies" element={<Policies />} />
          <Route path="claims/*" element={<Claims />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
