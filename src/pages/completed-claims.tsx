import { ClaimsTable } from "../components/tables/claims-table";

//import { paginate } from "../utils/paginate";

function CompletedClaims() {
  const claims = [
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: "completed",
      estimate: "₦40,000.00",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: "completed",
      estimate: "₦40,000.00",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: "completed",
      estimate: "₦40,000.00",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: "completed",
      estimate: "₦40,000.00",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: "completed",
      estimate: "₦40,000.00",
    },
  ];

  return (
    <>
      <div className="mb-10">
        <ClaimsTable claims={claims} />
      </div>
    </>
  );
}

export default CompletedClaims;
