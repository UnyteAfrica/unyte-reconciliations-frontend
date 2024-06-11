import { Policy } from "../../types/types";
import { Table } from "../table";

type PoliciesTableProps = {
  policies: Policy[];
};

export const PoliciesTable: React.FC<PoliciesTableProps> = ({ policies }) => {
  return (
    <Table headers={["Policy Ref.", "Policy No.", "Product", "Date", "Price"]}>
      {policies.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4">{policy.policyRef}</td>
          <td className="p-4">{policy.policyNo}</td>
          <td className="p-4">{policy.product}</td>
          <td className="p-4">{policy.date}</td>
          <td className="p-4">{policy.price}</td>
        </tr>
      ))}
    </Table>
  );
};
