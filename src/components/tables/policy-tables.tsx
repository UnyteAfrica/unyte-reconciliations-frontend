import { AgentPolicy, CompanyPolicy } from "@/types/types";
import { Table } from "../table";

type AgentPoliciesTableProps = {
  policies: AgentPolicy[];
};

export const AgentPoliciesTable: React.FC<AgentPoliciesTableProps> = ({
  policies,
}) => {
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

type CompanyPoliciesTableProps = {
  policies: CompanyPolicy[];
};

export const CompanyPoliciesTable: React.FC<CompanyPoliciesTableProps> = ({
  policies,
}) => {
  return (
    <Table headers={["Policy Ref.", "Policy No.", "Agent ID", "Date", "Price"]}>
      {policies.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4">{policy.policyRef}</td>
          <td className="p-4">{policy.policyNo}</td>
          <td className="p-4">{policy.agentId}</td>
          <td className="p-4">{policy.date}</td>
          <td className="p-4">{policy.price}</td>
        </tr>
      ))}
    </Table>
  );
};
