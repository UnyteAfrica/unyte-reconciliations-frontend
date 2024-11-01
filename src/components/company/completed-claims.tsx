import { PageContent } from "@/components/shared/page-content";
import { ClaimsTable } from "../tables/claims-table";
import { Claim, ClaimStatus } from "@/types/types";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";

export const InsurerCompletedClaims = () => {
  const [page, setPage] = useState(1);
  const claims: Claim[] = [
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: ClaimStatus.Completed,
      estimate: 40000,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: ClaimStatus.Completed,
      estimate: 40000,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: ClaimStatus.Completed,
      estimate: 40000,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: ClaimStatus.Completed,
      estimate: 40000,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      insurer: "AXA mansard",
      status: ClaimStatus.Completed,
      estimate: 40000,
    },
  ];
  return (
    <PageContent
      title="Completed Claims"
      pageTable={<ClaimsTable claims={claims} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
