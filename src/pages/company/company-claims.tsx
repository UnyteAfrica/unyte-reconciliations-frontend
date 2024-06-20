import { NavLink, Route, Routes } from "react-router-dom";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { PendingClaims } from "../../components/company/pending-claims";
import { CompletedClaims } from "../../components/company/completed-claims";

type UrlLink = {
  text: string;
  url: string;
};

const links: UrlLink[] = [
  {
    text: "Pending Claims",
    url: BrowserComboRoutes.pendingCompanyClaims,
  },
  {
    text: "Completed Claims",
    url: BrowserComboRoutes.completedCompanyClaims,
  },
];

export const CompanyClaims = () => {
  return (
    <div>
      <div className="flex flex-row space-x-8 px-32 my-10 border-b pb-[7px] border-[#333] mx-auto max-w-6xl mt-12 mb-16 lg:px-0">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.url}
            className={({ isActive }) =>
              cx(
                "font-medium text-lg duration-300",
                isActive &&
                  "text-[#25D366] underline underline-offset-[15px] decoration-2",
                !isActive && "text-[#333333]"
              )
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>
      <div>
        <Routes>
          <Route
            path={BrowserRoutes.pending.substring(1)}
            element={<PendingClaims />}
          />
          <Route
            path={BrowserRoutes.completed.substring(1)}
            element={<CompletedClaims />}
          />
        </Routes>
      </div>
    </div>
  );
};
