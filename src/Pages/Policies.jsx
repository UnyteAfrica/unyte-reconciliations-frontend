import { useState, useEffect, useContext } from "react";

import { DashboardContext } from "../Context/Context"
import FilterBtn from "../Components/FilterBtn";
import DownloadBtn from "../Components/DownloadBtn";
import Table from "../Components/Table";
import SearchBar from "../Components/SearchBar";
import PaginationComponent from "../Components/Pagination"

import { paginate } from "../Helpers/helpers";

function Policies() {
  const { userData } = useContext(DashboardContext);
  const tableHead = [
    "Policy reference",
    "Policy number",
    "Insurer",
    "Email",
    "Price",
  ];
  const [tableBody, setTableBody] = useState([]);
  //Pagination configuration
  const [page, setPage] = useState(1);
  const itemsCount = tableBody.length;
  const pageSize = 10;
  const count = Math.ceil(itemsCount / pageSize)
  const onPageChange = (e, value) => {
    setPage(value);
  }
  const policySales = paginate(tableBody, page, pageSize);

  const handleSearch = () => {
    //
  }


  useEffect(() => {
    setTableBody(userData.sales);
  }, [userData.sales]);
  return (
    <>
      <div className="mx-auto max-w-[48rem] xl:max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row justify-between items-center mb-10">
          <span className="text-3xl text-[#333333] font-semibold">
            Policies
          </span>
          <SearchBar handleSearch={handleSearch} placeholder="Find policy reference" />
          <div id="dates" className="flex flex-row items-center space-x-3">
            <FilterBtn />
            <DownloadBtn />
          </div>
        </div>
        <div id="policies-table" className="mb-10">
          <Table tableHead={tableHead} tableBody={policySales} tableType="policies" />
        </div>
        <div className="mb-40">
            <PaginationComponent count={count} handleChange={onPageChange} page={page} />
        </div>
      </div>
    </>
  );
}

export default Policies;
