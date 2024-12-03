import { PageContent } from "@/components/shared/page-content";
import { ClaimsTable } from "../tables/claims-table";
import { BaseClaim, ClaimStatus } from "@/types/types";
import { useState } from "react";

export const InsurerPendingClaims = () => {
  const [page, setPage] = useState(1);
  const claims: BaseClaim[] = [
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Submitted,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Submitted,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Medications",
      status: ClaimStatus.Processing,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Processing,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Submitted,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Submitted,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Submitted,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Processing,
    },
  ];

  return (
    <PageContent
      title="Pending Claims"
      searchbarPlaceholder="Find policy number"
      pageTable={<ClaimsTable claims={claims} />}
      page={page}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
