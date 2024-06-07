import { Outlet } from "react-router-dom";
import { CompanyNavbar } from "./company-navbar";

export const CompanyLayout = () => {
  return (
    <div>
      <CompanyNavbar />
      <Outlet />
    </div>
  );
};
