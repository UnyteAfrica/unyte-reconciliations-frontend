import { cx } from "class-variance-authority";
import { BaseClaim, ClaimStatus } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";

type ClaimsTableProps = {
  claims: BaseClaim[];
};

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims }) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {claims.map((claim, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {claim.email}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {claim.policyNo}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">{claim.claimType}</em>
              <em className="not-italic text-[#828282]">{claim.status}</em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table
      headers={[
        "Policy Number",
        "User Email",
        "Date Created",
        "Status",
        "Claim Type",
      ]}
    >
      {claims.map((claim, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4 text-center">{claim.policyNo}</td>
          <td className="p-4 text-center">{claim.email}</td>
          <td className="p-4 text-center">{claim.date}</td>
          <td className="p-4 text-center">
            <div
              className={cx(
                "py-2 px-4 text-center rounded-lg inline-block",
                claim.status == ClaimStatus.Completed &&
                  "bg-green/[.1] text-green",
                claim.status == ClaimStatus.Processing &&
                  "bg-grey/[.1] text-grey",
                claim.status == ClaimStatus.Submitted &&
                  "bg-orange/[.1] text-orange"
              )}
            >
              {claim.status}
            </div>
          </td>
          <td className="p-4 text-center"> {claim.claimType}</td>
        </tr>
      ))}
    </Table>
  );
};
