import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserComboRoutes, BrowserRoutes } from "./utils/routes";
import { AgentSignupPage } from "./pages/agent/signup.page";
import { LoginPage } from "./pages/auth/login.page";
import { CompanySignupPage } from "./pages/company/signup.page";
import { AgentOverview } from "./pages/agent/agent-overview.page";
import { AgentLayout } from "./components/agent/agent-layout";
import { CompanyLayout } from "./components/company/company-layout";
import { CompanyOverview } from "./pages/company/company-overview";
import { CompanyPolicies } from "./pages/company/company-policies";
import { CompanyClaims } from "./pages/company/company-claims";
import { CompanyAgents } from "./pages/company/company-agents";
import { ViewClaimsPage } from "./pages/company/view-claims";
import { CompanyProfile } from "./pages/company/company-profile";
import { AgentProfile } from "./pages/agent/agent-profile";
import { ForgotPasswordPage } from "./pages/auth/forgot-password";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { VerifyOTPPage } from "./pages/auth/verify-otp.page";
import { AgentCustomers } from "./pages/agent/agent-customers";
import { Commissions } from "./pages/agent/commissions";
import { AgentPolicies } from "./pages/agent/agent-policies";
import { MerchantSignupPage } from "./pages/merchant/signup.page";
import { MerchantLayout } from "./components/merchant/merchant-layout";
import { MerchantOverview } from "./pages/merchant/merchant-overview";
import { MerchantClaims } from "./pages/merchant/merchant-claims";
import { MerchantPolicies } from "./pages/merchant/merchant-policies";
import { MerchantProfile } from "./pages/merchant/merchant-profile";
import { CompanyProducts } from "./pages/company/company-products";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to={BrowserRoutes.login} />} />
        <Route path={BrowserRoutes.login} element={<LoginPage />} />
        <Route
          path={BrowserRoutes.forgotPassword}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={BrowserRoutes.resetPassword + "/:id/:token"}
          element={<ResetPasswordPage />}
        />
        <Route path={BrowserRoutes.verify} element={<VerifyOTPPage />} />
        <Route
          path={BrowserComboRoutes.agentSignup}
          element={<AgentSignupPage />}
        />
        <Route
          path={BrowserComboRoutes.companySignup}
          element={<CompanySignupPage />}
        />
        <Route
          path={BrowserComboRoutes.merchantSignup}
          element={<MerchantSignupPage />}
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
            path={BrowserRoutes.profile.substring(1)}
            element={<AgentProfile />}
          />
          <Route
            path={BrowserRoutes.commissions.substring(1)}
            element={<Commissions />}
          />
          <Route
            path={BrowserRoutes.policies.substring(1)}
            element={<AgentPolicies />}
          />
          <Route
            path={BrowserRoutes.customers.substring(1)}
            element={<AgentCustomers />}
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
            path={BrowserRoutes.products.substring(1)}
            element={<CompanyProducts />}
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
        <Route
          path={BrowserComboRoutes.merchantDashboard}
          element={<MerchantLayout />}
        >
          <Route
            path={BrowserRoutes.overview.substring(1)}
            element={<MerchantOverview />}
          />
          <Route
            path={BrowserRoutes.policies.substring(1) + BrowserRoutes.wildcard}
            element={<MerchantPolicies />}
          />

          <Route
            path={BrowserRoutes.claims.substring(1) + BrowserRoutes.wildcard}
            element={<MerchantClaims />}
          />
          <Route
            path={BrowserRoutes.profile.substring(1)}
            element={<MerchantProfile />}
          />
          <Route
            path={BrowserRoutes.viewClaim.substring(1)}
            element={<ViewClaimsPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
