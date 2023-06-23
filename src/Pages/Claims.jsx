import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import FilterBtn from "../Components/FilterBtn";
import DownloadBtn from "../Components/DownloadBtn";

import SearchBar from "../Components/SearchBar";
import CompletedClaims from "./CompletedClaims";
import PendingClaims from "./PendingClaims";
//import { paginate } from "../utils/paginate";

function Claims() {
  const location = useLocation();

  const handleSearch = () => {
    //
  };

  return (
    <>
      <div className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row space-x-8 p-4">
          <NavLink
            to="/app/claims"
            className={`${
              location.pathname.includes("/claims") &&
              !location.pathname.includes("claims/completed")
                ? "text-[#25D366] underline underline-offset-[21px] decoration-4"
                : "text-[#333333]"
            } font-semibold text-lg duration-300`}
          >
            Pending Claims
          </NavLink>
          <NavLink
            to="/app/claims/completed"
            className={`${
              location.pathname.includes("/claims/completed")
                ? "text-[#25D366] underline underline-offset-[21px] decoration-4"
                : "text-[#333333]"
            } font-semibold text-lg duration-300`}
          >
            Completed Claims
          </NavLink>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center my-10">
          <span className="text-3xl text-[#333333] font-semibold">
            Policies
          </span>
          <SearchBar
            handleSearch={handleSearch}
            placeholder="Find policy number"
          />
          <div id="dates" className="flex flex-row items-center space-x-3">
            <FilterBtn />
            <DownloadBtn />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<PendingClaims />} />
          <Route path="completed" element={<CompletedClaims />} />
        </Routes>
        <div className="mb-40">
          {/*Pagination component */}
        </div>
      </div>
    </>
  );
}

export default Claims;
