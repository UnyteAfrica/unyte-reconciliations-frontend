import { PageContent } from "@/components/shared/page-content";
import { CommissionsTable } from "@/components/tables/commissions-table";
import { Commission } from "@/types/types";
import { PAGE_COUNT } from "@/utils/constants";
import { useState } from "react";

const commissions: Commission[] = [
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Comprehensive",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Credit Life",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Card Protect",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Comprehensive",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Credit Life",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Card Protect",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Comprehensive",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Credit Life",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Card Protect",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Student",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Travel",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Device",
    premium: 50000,
    date: "May 7, 2023",
    commission: 40000,
  },
];

export const Commissions = () => {
  const [page, setPage] = useState(1);

  const totalPages = commissions.length;
  const paginatedMap: { [key: number]: Commission[] } = {};
  for (let i = 0; i < totalPages; i++) {
    paginatedMap[i + 1] = commissions.slice(
      i * PAGE_COUNT,
      i * PAGE_COUNT + PAGE_COUNT
    );
  }

  return (
    <PageContent
      title="Commissions"
      searchbarPlaceholder="Find policy name"
      pageTable={<CommissionsTable commissions={paginatedMap[page]} />}
      page={page}
      pageCount={PAGE_COUNT}
      totalItems={totalPages}
      onPageChange={(page: number) => setPage(page)}
    />
  );
};
