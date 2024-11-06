import {
  AgentPolicy,
  BasePolicy,
  MerchantInsurerPolicy,
  MerchantSoldPolicy,
} from "@/types/types";
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
  policies: BasePolicy[];
};

export const CompanyPoliciesTable: React.FC<CompanyPoliciesTableProps> = ({
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
    <Table headers={["Policy Type", "Policy Number", "Date", "Price"]}>
      {policies.map((policy, i) => {
        return (
          <tr key={i} className="border-b font-medium">
            <td className="p-4 text-center">{policy.policyType}</td>
            <td className="p-4 text-center">{policy.policyNo}</td>
            <td className="p-4 text-center">{policy.date}</td>
            <td className="p-4 text-center">{formatToNaira(policy.premium)}</td>
          </tr>
        );
      })}
    </Table>
  );
};

type MerchantInsurerPoliciesTableProps = {
  policies: MerchantInsurerPolicy[];
};

export const MerchantInsurerPoliciesTable: React.FC<
  MerchantInsurerPoliciesTableProps
> = ({ policies }) => {
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
                <em className="not-italic text-[#828282]">{policy.insurer}</em>
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
    <Table headers={["Policy Type", "Policy Number", "Insurer", "Premium"]}>
      {policies.map((policy, i) => {
        return (
          <tr key={i} className="border-b font-medium">
            <td className="p-4 text-center">{policy.policyType}</td>
            <td className="p-4 text-center">{policy.policyNo}</td>
            <td className="p-4 text-center">{policy.insurer}</td>
            <td className="p-4 text-center">{formatToNaira(policy.premium)}</td>
          </tr>
        );
      })}
    </Table>
  );
};

type MerchantSoldPoliciesTableProps = {
  policies: MerchantSoldPolicy[];
};

export const MerchantSoldPoliciesTable: React.FC<
  MerchantSoldPoliciesTableProps
> = ({ policies }) => {
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
