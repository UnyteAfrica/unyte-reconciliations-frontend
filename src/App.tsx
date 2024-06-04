import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BrowserComboRoutes } from "./utils/routes";
import { AgentLoginPage } from "./pages/agent/auth/login.page";
import { AgentSignupPage } from "./pages/agent/auth/signup.page";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path={BrowserComboRoutes.agentLogin}
          element={<AgentLoginPage />}
        />
        <Route
          path={BrowserComboRoutes.agentSignup}
          element={<AgentSignupPage />}
        />
        {/* <Route path="/app" element={<SharedLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/claims/*" element={<Claims />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
