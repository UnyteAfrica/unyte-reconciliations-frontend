import { Claim } from "../../types/types";
import { Table } from "../table";

type ClaimsTableProps = {
  claims: Claim[];
};

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims }) => {
  return (
    <Table
      headers={[
        "Policy number",
        "User email",
        "Date created",
        "Insurer",
        "Status",
        "Bill estimate",
      ]}
    >
      {claims.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4">{policy.policyNo}</td>
          <td className="p-4">{policy.email}</td>
          <td className="p-4">{policy.date}</td>
          <td className="p-4">{policy.insurer}</td>
          <td className="p-4">{policy.status}</td>
          <td className="p-4">{policy.estimate}</td>
        </tr>
      ))}
    </Table>
  );
};
