import { PageContent } from "@/components/shared/page-content";
import { ClaimsTable } from "../tables/claims-table";
import { Claim, ClaimStatus } from "@/types/types";

export const CompletedClaims = () => {
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
    />
  );
};
