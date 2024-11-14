import { PageContent } from "@/components/shared/page-content";
import { ClaimsTable } from "../tables/claims-table";
import { Claim, ClaimStatus } from "@/types/types";
import { useState } from "react";
import { PAGE_COUNT } from "@/utils/constants";

export const MerchantCompletedClaims = () => {
  const [page, setPage] = useState(1);
  const claims: Claim[] = [
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      status: ClaimStatus.Completed,
      estimate: 40000,
      claimType: "Accidental Damage",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      status: ClaimStatus.Completed,
      estimate: 40000,
      claimType: "Accidental Damage",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      status: ClaimStatus.Completed,
      estimate: 40000,
      claimType: "Accidental Damage",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      status: ClaimStatus.Completed,
      estimate: 40000,
      claimType: "Accidental Damage",
    },
    {
      policyNo: "123jkf5402",
      email: "samloco@gmail.com",
      date: "May 7, 2023",
      status: ClaimStatus.Completed,
      estimate: 40000,
      claimType: "Accidental Damage",
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
