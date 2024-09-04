import { AgentPolicy, CompanyPolicy } from "@/types/types";
import { Table } from "../table";
import { formatToNaira } from "@/utils/utils";
import { useMediaQuery } from "@/utils/hooks";

type AgentPoliciesTableProps = {
  policies: AgentPolicy[];
};

export const AgentPoliciesTable: React.FC<AgentPoliciesTableProps> = ({
  policies,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {policies.map((policy, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {policy.policyRef}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {policy.product}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">{policy.date}</em>
              <em className="not-italic text-[#828282]">
                {formatToNaira(policy.price)}
              </em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table headers={["Policy Ref.", "Policy No.", "Product", "Date", "Price"]}>
      {policies.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4 text-center">{policy.policyRef}</td>
          <td className="p-4 text-center">{policy.policyNo}</td>
          <td className="p-4 text-center">{policy.product}</td>
          <td className="p-4 text-center">{policy.date}</td>
          <td className="p-4 text-center">{formatToNaira(policy.price)}</td>
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
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {policies.map((policy, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {policy.policyType}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {policy.agent}
              </em>
            </div>
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-medium text-[#333]">
                {policy.policyName}
              </em>
              <em className="not-italic font-medium text-[#333]">
                {policy.policyCategory}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">{policy.date}</em>
              <em className="not-italic text-[#828282]">
                {formatToNaira(Number(policy.price))}
              </em>
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <Table
      headers={[
        "Policy Category",
        "Policy Name",
        "Policy Type",
        "Agent",

        "Price",
        "Date",
      ]}
    >
      {policies.map((policy, i) => (
        <tr key={i} className="border-b font-medium">
          <td className="p-4 text-center">{policy.policyCategory}</td>
          <td className="p-4 text-center">{policy.policyName}</td>
          <td className="p-4 text-center">{policy.policyType}</td>
          <td className="p-4 text-center">{policy.agent}</td>

          <td className="p-4 text-center">
            {formatToNaira(Number(policy.price))}
          </td>
          <td className="p-4 text-center">{policy.date}</td>
        </tr>
      ))}
    </Table>
  );
};
