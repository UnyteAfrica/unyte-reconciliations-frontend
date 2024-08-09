import { cx } from "class-variance-authority";
import { Claim, ClaimStatus } from "../../types/types";
import { Table } from "../table";
import { formatToNaira } from "@/utils/utils";
import { useMediaQuery } from "@/utils/hooks";

type ClaimsTableProps = {
  claims: Claim[];
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
                {claim.estimate}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">{claim.policyNo}</em>
              <em className="not-italic text-[#828282]">{claim.status}</em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table
      headers={[
        "Policy No.",
        "User Email",
        "Date Created",
        "Insurer",
        "Status",
        "Bill estimate",
      ]}
    >
      {claims.map((claim, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4 text-center">{claim.policyNo}</td>
          <td className="p-4 text-center">{claim.email}</td>
          <td className="p-4 text-center">{claim.date}</td>
          <td className="p-4 text-center">{claim.insurer}</td>
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
          <td className="p-4 text-center"> {formatToNaira(claim.estimate)}</td>
        </tr>
      ))}
    </Table>
  );
};
