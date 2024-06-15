import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BrowserComboRoutes, BrowserRoutes } from "./utils/routes";
import { AgentLoginPage } from "./pages/agent/login.page";
import { AgentSignupPage } from "./pages/agent/signup.page";
import { CompanyLoginPage } from "./pages/company/login.page";
import { CompanySignupPage } from "./pages/company/signup.page";
import { AgentOverview } from "./pages/agent/agent-overview.page";
import { AgentLayout } from "./components/agent/agent-layout";
import { CompanyLayout } from "./components/company/company-layout";
import { CompanyOverview } from "./pages/company/company-overview";
import { Policies } from "./pages/policies";
import { Commissions } from "./pages/agent/commissions";
import { Devices } from "./pages/agent/devices";

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
        <Route
          path={BrowserComboRoutes.companyLogin}
          element={<CompanyLoginPage />}
        />
        <Route
          path={BrowserComboRoutes.companySignup}
          element={<CompanySignupPage />}
        />
        <Route
          path={BrowserComboRoutes.agentDashboard}
          element={<AgentLayout />}
        >
          <Route
            path={BrowserRoutes.overview.substring(1)}
            element={<AgentOverview />}
          />
          <Route
            path={BrowserRoutes.policies.substring(1)}
            element={<Policies />}
          />
          <Route
            path={BrowserRoutes.commissions.substring(1)}
            element={<Commissions />}
          />
          <Route
            path={BrowserRoutes.devices.substring(1)}
            element={<Devices />}
          />
        </Route>
        <Route
          path={BrowserComboRoutes.companyDashboard}
          element={<CompanyLayout />}
        >
          <Route
            path={BrowserRoutes.overview.substring(1)}
            element={<CompanyOverview />}
          />
          <Route
            path={BrowserRoutes.policies.substring(1)}
            element={<CompanyOverview />}
          />
          <Route
            path={BrowserRoutes.claims.substring(1)}
            element={<CompanyOverview />}
          />
          <Route
            path={BrowserRoutes.agents.substring(1)}
            element={<CompanyOverview />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
