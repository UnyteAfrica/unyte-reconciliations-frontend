import { AgentPolicy, InsurerPolicy, Policy, SoldPolicy } from "@/types/types";
import { Table } from "../table";
import { createPolicyId, formatToNaira, sanitizePremium } from "@/utils/utils";
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
  policies: Policy[];
};

export const CompanyPoliciesTable: React.FC<CompanyPoliciesTableProps> = ({
  policies,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {policies.map((policy, idx) => {
          const sanitizedPremium = sanitizePremium(policy.premium);
          return (
            <div key={idx} className="border-b py-2">
              <div className="flex justify-between items-center mb-2">
                <em className="not-italic font-semibold text-[#333]">
                  {createPolicyId(policy)}
                </em>
                <em className="not-italic font-semibold text-[#333]">
                  {policy.agent}
                </em>
              </div>

              <div className="flex justify-between items-center">
                <em className="not-italic text-[#828282]">
                  {policy.date_sold}
                </em>
                <em className="not-italic text-[#828282]">
                  {sanitizedPremium
                    ? formatToNaira(Number(sanitizedPremium))
                    : formatToNaira(1000)}
                </em>
              </div>
            </div>
          );
        })}
      </div>
    );
  return (
    <Table
      headers={[
        "Policy ID",
        "Sales Agent",
        "Date",
        "Premium",
        "Agent's Commission",
      ]}
    >
      {policies.map((policy, i) => {
        const sanitizedPremium = sanitizePremium(policy.premium);
        return (
          <tr key={i} className="border-b font-medium">
            <td className="p-4 text-center">{createPolicyId(policy)}</td>
            <td className="p-4 text-center">{policy.agent}</td>
            <td className="p-4 text-center">{policy.date_sold}</td>
            <td className="p-4 text-center">
              {sanitizedPremium
                ? formatToNaira(Number(sanitizedPremium))
                : formatToNaira(1000)}
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

type InsurerPoliciesTableProps = {
  policies: InsurerPolicy[];
};

export const InsurerPoliciesTable: React.FC<InsurerPoliciesTableProps> = ({
  policies,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {policies.map((policy, idx) => {
          return (
            <div key={idx} className="border-b py-2">
              <div className="flex justify-between items-center mb-2">
                <em className="not-italic font-semibold text-[#333]">
                  {policy.policyType}
                </em>
                <em className="not-italic font-semibold text-[#333]">
                  {policy.policyNo}
                </em>
              </div>

              <div className="flex justify-between items-center">
                <em className="not-italic text-[#828282]">{policy.date}</em>
                <em className="not-italic text-[#828282]">
                  {formatToNaira(policy.premium)}
                </em>
              </div>
            </div>
          );
        })}
      </div>
    );
  return (
    <Table
      headers={["Policy Type", "Policy Number", "Insurer", "Date", "Premium"]}
    >
      {policies.map((policy, i) => {
        return (
          <tr key={i} className="border-b font-medium">
            <td className="p-4 text-center">{policy.policyType}</td>
            <td className="p-4 text-center">{policy.policyNo}</td>
            <td className="p-4 text-center">{policy.insurer}</td>
            <td className="p-4 text-center">{policy.date}</td>
            <td className="p-4 text-center">{formatToNaira(policy.premium)}</td>
          </tr>
        );
      })}
    </Table>
  );
};

type SoldPoliciesTableProps = {
  policies: SoldPolicy[];
};

export const SoldPoliciesTable: React.FC<SoldPoliciesTableProps> = ({
  policies,
}) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

  if (!isMediaQueryMatched)
    return (
      <div>
        {policies.map((policy, idx) => {
          return (
            <div key={idx} className="border-b py-2">
              <div className="flex justify-between items-center mb-2">
                <em className="not-italic font-semibold text-[#333]">
                  {policy.policyType}
                </em>
                <em className="not-italic font-semibold text-[#333]">
                  {policy.policyNo}
                </em>
              </div>

              <div className="flex justify-between items-center">
                <em className="not-italic text-[#828282]">{policy.date}</em>
                <em className="not-italic text-[#828282]">
                  {formatToNaira(policy.premium)}
                </em>
              </div>
            </div>
          );
        })}
      </div>
    );
  return (
    <Table
      headers={[
        "Policy Type",
        "Policy Number",
        "User Email",
        "Date",
        "Premium",
      ]}
    >
      {policies.map((policy, i) => {
        return (
          <tr key={i} className="border-b font-medium">
            <td className="p-4 text-center">{policy.policyType}</td>
            <td className="p-4 text-center">{policy.policyNo}</td>
            <td className="p-4 text-center">{policy.userEmail}</td>
            <td className="p-4 text-center">{policy.date}</td>
            <td className="p-4 text-center">{formatToNaira(policy.premium)}</td>
          </tr>
        );
      })}
    </Table>
  );
};
