import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { Icon } from "../shared/icon";
import { BrowserComboRoutes, BrowserRoutes } from "@/utils/routes";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type UrlLink = {
  text: string;
  url: string;
};

const navLinks: UrlLink[] = [
  {
    text: "Overview",
    url: BrowserComboRoutes.companyDashboard + BrowserRoutes.overview,
  },
  {
    text: "Policies",
    url: BrowserComboRoutes.companyDashboard + BrowserRoutes.policies,
  },
  {
    text: "Claims",
    url: BrowserComboRoutes.companyDashboard + BrowserRoutes.claims,
  },
  {
    text: "Agents",
    url: BrowserComboRoutes.companyDashboard + BrowserRoutes.agents,
  },
];

export const CompanyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        id="navbar-container"
        className="flex justify-between items-center p-4 mx-12"
      >
        <div>
          <Icon className="shrink-0" type="logo" alt="unyte logo" />
        </div>
        <div className="space-x-24">
          {navLinks.map((navLink, idx) => (
            <NavLink
              key={idx}
              to={navLink.url}
              className={({ isActive }) =>
                cx(
                  "font-semibold text-lg duration-300",
                  isActive &&
                    "text-[#25D366] underline underline-offset-[30px] decoration-4"
                )
              }
            >
              {navLink.text}
            </NavLink>
          ))}
        </div>
        <div id="profile">
          <div className="relative">
            <button
              className="px-4 py-2 text-[#333333] rounded-md"
              onClick={toggleDropdown}
            >
              <div className="space-x-2 flex flex-row items-center">
                <span className="text-lg font-semibold max-xl:hidden">
                  AXA Mansard
                </span>{" "}
                <BiChevronDown
                  className={cx(
                    "transition-all duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </button>
            <div
              className={twMerge(
                "absolute w-full top-[65px] right-0 mt-2 py-2 z-10 border border-[#e1e1e1] bg-white shadow-lg rounded-lg max-h-0 transition-all duration-300 overflow-hidden opacity-0",
                isOpen && "max-h-[240px] opacity-100"
              )}
            >
              <div className="px-6 py-4 flex items-center p-2">
                <span className="text-base text-[#333] font-normal">
                  AXA Mansard
                </span>
              </div>
              <hr />
              <NavLink
                to={BrowserComboRoutes.agentDashboard + BrowserRoutes.profile}
                className="block px-6 py-4 text-[#333] font-medium"
              >
                Profile
              </NavLink>
              <hr />
              <NavLink
                to="/"
                className="block px-6 py-4 text-[#EB5757] font-medium"
              >
                Sign out
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
