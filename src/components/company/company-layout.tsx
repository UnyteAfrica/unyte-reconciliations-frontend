import { Outlet, useNavigate } from "react-router-dom";
import { CompanyNavbar } from "./company-navbar";
import { useContext, useEffect } from "react";
import { CompanyContext } from "@/context/company.context";
import { BrowserComboRoutes } from "@/utils/routes";
import { LocalStorage } from "@/services/local-storage";

export const CompanyLayout = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(CompanyContext);

  const navigate = useNavigate();

  const listener = (e: CustomEvent) => {
    if (e.detail.key == "companyAccessToken" && e.detail.value == null) {
      navigate(BrowserComboRoutes.companyLogin);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    window.addEventListener(LocalStorage.eventName, listener as EventListener);

    return () =>
      window.removeEventListener(
        LocalStorage.eventName,
        listener as EventListener
      );
  }, []);

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
