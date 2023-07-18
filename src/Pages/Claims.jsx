import { useState, useEffect } from "react";
import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import FilterBtn from "../Components/FilterBtn";
import DownloadBtn from "../Components/DownloadBtn";
import SearchBar from "../Components/SearchBar";
import CompletedClaims from "./CompletedClaims";
import PendingClaims from "./PendingClaims";
import PaginationComponent from "../Components/Pagination";

import { paginate } from "../Helpers/helpers";

function Claims() {
  const location = useLocation();

  const handleSearch = () => {
    //
  };

  const tableHead = [
    "Policy number",
    "User email",
    "Date created",
    "Insurer",
    "Status",
    "Bill estimate",
  ];
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    setTableBody([
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "completed",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "completed",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "completed",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "completed",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "completed",
        estimate: "₦40,000.00",
      },
    ]);
  }, []);

  //pagination configurations
  const [page, setPage] = useState(1);
  const itemsCount = tableBody.length;
  const pageSize = 10;
  const count = Math.ceil(itemsCount / pageSize);
  const onPageChange = (e, value) => {
    setPage(value);
  };
  const claims = paginate(tableBody, page, pageSize);

  return (
    <>
      <div className="mx-auto max-w-[48rem] xl:max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row space-x-8 p-4">
          <NavLink
            to="/app/claims/pending"
            className={`${
              location.pathname.includes("/claims/pending")
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
          <Route
            path="pending"
            element={<PendingClaims tableHead={tableHead} tableBody={claims} />}
          />
          <Route
            path="completed"
            element={
              <CompletedClaims tableHead={tableHead} tableBody={claims} />
            }
          />
        </Routes>
        <div className="mb-40">
          <PaginationComponent
            count={count}
            handleChange={onPageChange}
            page={page}
          />
        </div>
      </div>
    </>
  );
}

export default Claims;
