import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import UnyteLogo from "../assets/Icons/UnyteLogo.svg";

function NavBar() {
  const location = useLocation();
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
        <div id="logo">
          <img src={UnyteLogo} alt="unyte logo" />
        </div>
        <div id="pages" className="space-x-24">
          <NavLink
            to="/app"
            className={`${
              location.pathname.includes("/app") && (!location.pathname.includes("/app/policies")) && (!location.pathname.includes("app/claims"))
                ? "text-[#25D366] underline underline-offset-[30px] decoration-4"
                : "text-[#333333]"
            } font-semibold text-lg duration-300`}
          >
            Overview
          </NavLink>
          <NavLink
            to="policies"
            className={`${
              location.pathname.includes("/app/policies")
                ? "text-[#25D366] underline underline-offset-[30px] decoration-4"
                : "text-[#333333]"
            } font-semibold text-lg duration-300`}
          >
            Policies
          </NavLink>
          <NavLink
            to="claims"
            className={`${
              location.pathname.includes("/app/claims")
                ? "text-[#25D366] underline underline-offset-[30px] decoration-4"
                : "text-[#333333]"
            } font-semibold text-lg duration-300`}
          >
            Claims
          </NavLink>
        </div>
        <div id="profile">
          <div className="relative">
            <button
              className="px-4 py-2 text-[#333333] rounded-md"
              onClick={toggleDropdown}
            >
              <div className="space-x-2 flex flex-row items-center">
                <div className="rounded-full h-7 w-7 p-2 bg-gray-200 text-[10px] flex items-center justify-center">
                  FA
                </div>
                <span className="text-lg font-semibold">Fortunate Anozie</span>{" "}
                {isOpen ? <BiChevronUp /> : <BiChevronDown />}{" "}
              </div>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 py-2 bg-white shadow-lg rounded-md">
                <div className="space-x-2 flex flex-row items-center p-2">
                  <div className="rounded-full p-2 bg-gray-200 text-[10px] flex items-center justify-center">
                    FA
                  </div>
                  <span className="text-base font-medium">
                    Fortunate Anozie
                  </span>
                </div>
                <hr />
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-red-600 hover:bg-gray-200 font-medium"
                >
                  Sign out
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default NavBar;
