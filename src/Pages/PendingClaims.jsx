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
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "processing",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "submitted",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "processing",
        estimate: "₦40,000.00",
      },
      { 
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "processing",
        estimate: "₦40,000.00",
      },
      {
        number: "123jkf5402",
        email: "samloco@gmail.com",
        date: "May 7, 2023",
        insurer: "AXA mansard",
        status: "submitted",
        estimate: "₦40,000.00",
      },
    ]);
  }, []);
  return (
    <>
        <div id="policies-table" className="mb-10">
          <Table tableHead={tableHead} tableBody={tableBody} tableType="claims" />
        </div>
    </>
  );
}

export default PendingClaims;
