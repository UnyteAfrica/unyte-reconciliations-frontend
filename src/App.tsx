import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserComboRoutes, BrowserRoutes } from "./utils/routes";
import { AgentLoginPage } from "./pages/agent/login.page";
import { AgentSignupPage } from "./pages/agent/signup.page";
import { CompanyLoginPage } from "./pages/company/login.page";
import { CompanySignupPage } from "./pages/company/signup.page";
import { AgentOverview } from "./pages/agent/agent-overview.page";
import { AgentLayout } from "./components/agent/agent-layout";
import { CompanyLayout } from "./components/company/company-layout";
import { CompanyOverview } from "./pages/company/company-overview";
import { AgentPolicies } from "./pages/agent/agent-policies";
import { Commissions } from "./pages/agent/commissions";
import { Devices } from "./pages/agent/devices";
import { CompanyPolicies } from "./pages/company/company-policies";
import { CompanyClaims } from "./pages/company/company-claims";
import { CompanyAgents } from "./pages/company/company-agents";
import { AgentForgotPasswordPage } from "./pages/agent/forgot-password";
import { AgentResetPasswordPage } from "./pages/agent/reset-password";
import { AgentVerifyOTPPage } from "./pages/agent/verify-otp.page";
import { CompanyForgotPasswordPage } from "./pages/company/forgot-password";
import { CompanyResetPasswordPage } from "./pages/company/reset-password";
import { CompanyVerifyOTPPage } from "./pages/company/verify-otp.page";
import { ViewClaimsPage } from "./pages/company/view-claims";
import { CompanyProfile } from "./pages/company/company-profile";
import { AgentProfile } from "./pages/agent/agent-profile";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={BrowserComboRoutes.companyLogin} />}
        />
        <Route
          path={BrowserComboRoutes.agentLogin}
          element={<AgentLoginPage />}
        />
        <Route
          path={BrowserComboRoutes.agentSignup}
          element={<AgentSignupPage />}
        />
        <Route
          path={BrowserComboRoutes.agentForgotPassword}
          element={<AgentForgotPasswordPage />}
        />
        <Route
          path={BrowserComboRoutes.agentResetPassword + "/:id/:token"}
          element={<AgentResetPasswordPage />}
        />
        <Route
          path={BrowserComboRoutes.agentVerify}
          element={<AgentVerifyOTPPage />}
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
          path={BrowserComboRoutes.companyForgotPassword}
          element={<CompanyForgotPasswordPage />}
        />
        <Route
          path={BrowserComboRoutes.companyResetPassword + "/:id/:token"}
          element={<CompanyResetPasswordPage />}
        />
        <Route
          path={BrowserComboRoutes.companyVerify}
          element={<CompanyVerifyOTPPage />}
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
            element={<AgentPolicies />}
          />
          <Route
            path={BrowserRoutes.profile.substring(1)}
            element={<AgentProfile />}
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
            element={<CompanyPolicies />}
          />
          <Route
            path={BrowserRoutes.profile.substring(1)}
            element={<CompanyProfile />}
          />
          <Route
            path={BrowserRoutes.claims.substring(1) + BrowserRoutes.wildcard}
            element={<CompanyClaims />}
          />
          <Route
            path={BrowserRoutes.viewClaim.substring(1)}
            element={<ViewClaimsPage />}
          />
          <Route
            path={BrowserRoutes.agents.substring(1)}
            element={<CompanyAgents />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
