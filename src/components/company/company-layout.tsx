import { Outlet, useNavigate } from "react-router-dom";
import { CompanyNavbar } from "./company-navbar";
import { useContext, useEffect } from "react";
import { CompanyContext } from "@/context/company.context";
import { BrowserComboRoutes } from "@/utils/routes";

export const CompanyLayout = () => {
  const { isLoggedIn } = useContext(CompanyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate(BrowserComboRoutes.companyLogin);
  }, [isLoggedIn]);

  return (
    <div>
      <CompanyNavbar />
      <Outlet />
    </div>
  );
};
