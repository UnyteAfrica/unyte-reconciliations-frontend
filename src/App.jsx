import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import SharedLayout from "./SharedLayout";
import Overview from "./Pages/Overview";
import Policies from "./Pages/Policies";
import Claims from "./Pages/Claims";
import ClaimsInformation from "./Pages/ClaimsInformation";
import SignUp from "./Pages/SignUp";
import { DashboardProvider } from "./Context/Context";

function ProtectedRoute({ children, token }) {
  if (!token) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [token, setToken] = useState("");
  const [claimsInfoPath, setClaimsInfoPath] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/app/claims/pending") {
      setClaimsInfoPath("claims/pending/claimsInformation/:policyNumber");
    } else if (location.pathname === "/app/claims/completed") {
      setClaimsInfoPath("claims/completed/claimsInformation/:policyNumber");
    }
  }, [location.pathname]);
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/app/*" element={<SharedLayout />}>
            <Route
              path=""
              element={
                <ProtectedRoute token={token}>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path="policies"
              element={
                <ProtectedRoute token={token}>
                  <Policies />
                </ProtectedRoute>
              }
            />
            <Route
              path="claims/*"
              element={
                <ProtectedRoute token={token}>
                  <Claims />
                </ProtectedRoute>
              }
            />
            <Route
              path={claimsInfoPath}
              element={
                <ProtectedRoute token={token}>
                  <ClaimsInformation />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </DashboardProvider>
    </div>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string.isRequired,
};

export default App;
