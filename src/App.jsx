import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SharedLayout from "./SharedLayout";
import Overview from "./Pages/Overview";
import Policies from "./Pages/Policies";
import Claims from "./Pages/Claims";
import Login from "./Pages/Login";
import { DashboardProvider } from "./Context/Context";

function App() {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app/*" element={<SharedLayout />}>
            <Route path="" element={<Overview />} />
            <Route path="policies" element={<Policies />} />
            <Route path="claims/*" element={<Claims />} />
          </Route>
        </Routes>
      </DashboardProvider>
    </div>
  );
}

export default App;
