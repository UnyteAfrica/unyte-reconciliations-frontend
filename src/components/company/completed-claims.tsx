import { PageContent } from "@/components/shared/page-content";
import { ClaimsTable } from "../tables/claims-table";
import { BaseClaim, ClaimStatus } from "@/types/types";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";

export const InsurerCompletedClaims = () => {
  const [page, setPage] = useState(1);
  const claims: BaseClaim[] = [
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Medications",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Accidental Damage",
      status: ClaimStatus.Completed,
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      claimType: "Lost Luggage",
      status: ClaimStatus.Completed,
    },
  ];

  return (
    <PageContent
      title="Completed Claims"
      searchbarPlaceholder="Find policy number"
      pageTable={<ClaimsTable claims={claims} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={2}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
