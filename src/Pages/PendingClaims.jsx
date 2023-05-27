import { useState, useEffect } from "react";

import Table from "../Components/Table";

//import { paginate } from "../utils/paginate";

function PendingClaims() {
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
        <div id="policies-table" className="mb-10">
          <Table tableHead={tableHead} tableBody={tableBody} />
        </div>
    </>
  );
}

export default PendingClaims;
