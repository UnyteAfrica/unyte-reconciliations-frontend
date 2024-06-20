import { cx } from "class-variance-authority";
import { Claim, ClaimStatus } from "../../types/types";
import { Table } from "../table";

type ClaimsTableProps = {
  claims: Claim[];
};

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims }) => {
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
      {claims.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4 text-center">{policy.policyNo}</td>
          <td className="p-4 text-center">{policy.email}</td>
          <td className="p-4 text-center">{policy.date}</td>
          <td className="p-4 text-center">{policy.insurer}</td>
          <td className="p-4 text-center">
            <div
              className={cx(
                "py-2 px-4 text-center rounded-lg inline-block",
                policy.status == ClaimStatus.Completed &&
                  "bg-green/[.1] text-green",
                policy.status == ClaimStatus.Processing &&
                  "bg-grey/[.1] text-grey",
                policy.status == ClaimStatus.Submitted &&
                  "bg-orange/[.1] text-orange"
              )}
            >
              {policy.status}
            </div>
          </td>
          <td className="p-4 text-center">{policy.estimate}</td>
        </tr>
      ))}
    </Table>
  );
};
