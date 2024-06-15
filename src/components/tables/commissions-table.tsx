import { formatAmount, nairaSign } from "@/utils/utils";
import { Commission } from "../../types/types";
import { Table } from "../table";

type CommissionsTableProps = {
  commissions: Commission[];
};

export const CommissionsTable: React.FC<CommissionsTableProps> = ({
  commissions,
}) => {
  return (
    <Table
      headers={["Policy Ref.", "Policy No.", "Product", "Date", "Commission"]}
    >
      {commissions.map((commission, idx) => (
        <tr key={idx} className="border-b font-medium">
          <td className="p-4">{commission.policyRef}</td>
          <td className="p-4">{commission.policyNo}</td>
          <td className="p-4">{commission.product}</td>
          <td className="p-4">{commission.date}</td>
          <td className="p-4">
            {nairaSign + formatAmount(commission.commission)}
          </td>
        </tr>
      ))}
    </Table>
  );
};
