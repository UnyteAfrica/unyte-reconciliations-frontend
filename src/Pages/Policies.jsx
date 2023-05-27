import { useState, useEffect } from "react";
import FilterBtn from "../Components/FilterBtn";
import DownloadBtn from "../Components/DownloadBtn";

import Table from "../Components/Table";

function Policies() {
  const tableHead = [
    "Policy reference",
    "Policy number",
    "Insurer",
    "Date",
    "Price",
  ];
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    setTableBody([
      {
        ref: "#WP62F3E8F93",
        number: "123jkf5402",
        insurer: "AXA mansard",
        date: "May 7, 2023",
        price: "₦40,000.00",
      },
      {
        ref: "#WP62F3E8F93",
        number: "123jkf5402",
        insurer: "AXA mansard",
        date: "May 7, 2023",
        price: "₦40,000.00",
      },
      {
        ref: "#WP62F3E8F93",
        number: "123jkf5402",
        insurer: "AXA mansard",
        date: "May 7, 2023",
        price: "₦40,000.00",
      },
      {
        ref: "#WP62F3E8F93",
        number: "123jkf5402",
        insurer: "AXA mansard",
        date: "May 7, 2023",
        price: "₦40,000.00",
      },
      {
        ref: "#WP62F3E8F93",
        number: "123jkf5402",
        insurer: "AXA mansard",
        date: "May 7, 2023",
        price: "₦40,000.00",
      },
    ]);
  }, []);
  return (
    <>
      <div className="mx-auto max-w-6xl mt-12 px-6 lg:px-0">
        <div className="flex flex-row justify-between items-center mb-10">
          <span className="text-3xl text-[#333333] font-semibold">
            Policies
          </span>
          <div id="dates" className="flex flex-row items-center space-x-3">
            <FilterBtn />
            <DownloadBtn />
          </div>
        </div>
        <div id="policies-table">
          <Table tableHead={tableHead} tableBody={tableBody} />
        </div>
      </div>
    </>
  );
}

export default Policies;
