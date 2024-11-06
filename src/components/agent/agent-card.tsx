import { Agent, AgentStatus } from "@/types/types";
import { Icon } from "../shared/icon";
import { formatToNaira, getCompanyInitials } from "@/utils/utils";
import { twMerge } from "tailwind-merge";

export const AgentCard: React.FC<{ agent: Agent; onClose?: () => void }> = ({
  onClose,
  agent,
}) => {
  return (
    <div className="bg-white p-10 h-screen w-[720px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[32px] font-semibold">Agent Information</h1>
        <button onClick={onClose}>
          <Icon type="cancel" className="w-3 h-3" />
        </button>
      </div>
      <div className="bg-[#F2F2F2] py-4 px-8 rounded-2xl flex items-center mb-8">
        <div
          style={{
            background:
              "linear-gradient(163.115deg, #C8FFC6 0%, rgba(252, 230, 26, 10%) 62%), linear-gradient(#5CC758, #5CC758)",
          }}
          className="w-[102px] h-[102px] rounded-full flex justify-center items-center text-white mr-4 text-[32px] font-semibold"
        >
          {getCompanyInitials(agent?.name)}
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="text-2xl font-medium mr-4 text-[#333]">
              {agent.name}
            </h3>
            <div
              className={twMerge(
                "w-[84px] h-[24px] text-white flex justify-center items-center rounded font-medium",
                agent.agentStatus == AgentStatus.Active && "bg-[#25d366]",
                agent.agentStatus == AgentStatus.Inactive && "bg-[#D32525]"
              )}
            >
              {agent.agentStatus}
            </div>
          </div>
          <a
            href={`mailto:${agent.email}`}
            className="text-xl font-medium text-[#25d366] underline"
          >
            {agent.email}
          </a>
        </div>
      </div>
      <div className="flex justify-between items-stretch mb-8">
        <div className="w-[201px]  bg-[#f2f2f2] rounded-2xl px-8 py-9 flex flex-col">
          <em className="not-italic font-medium text-[#4f4f4f] mb-4">
            Policies Sold
          </em>
          <em className="not-italic font-medium text-xl text-[#333]">
            {agent.policiesSold} policies
          </em>
        </div>
        <div className="w-[201px]  bg-[#f2f2f2] rounded-2xl px-8 py-9 flex flex-col">
          <em className="not-italic font-medium text-[#4f4f4f] mb-4">
            Commission Total
          </em>
          <em className="not-italic font-medium text-xl text-[#333]">
            {formatToNaira(agent.commissions)}
          </em>
        </div>
        <div className="w-[201px]  bg-[#f2f2f2] rounded-2xl pl-8 py-9 flex flex-col">
          <em className="not-italic font-medium text-[#4f4f4f] mb-4">
            Date Added
          </em>
          <em className="not-italic font-medium text-xl text-[#333]">
            {agent.dateAdded}
          </em>
        </div>
      </div>
      <div className="bg-[#f2f2f2] rounded-2xl flex flex-col p-8 space-y-2 mb-8">
        <em className="not-italic text-2xl text-[#4f4f4f]">{agent.name}</em>
        <em className="not-italic text-2xl text-[#333]">3324156708</em>
        <em className="not-italic text-2xl text-[#333]">
          Moniepoint Microfinance Bank
        </em>
      </div>
      <div className="bg-[#f2f2f2] rounded-2xl flex flex-col p-8 space-y-4">
        <h2 className="font-medium text-2xl">Commission Activity</h2>
        <div className="flex justify-between items-center">
          <em className="not-italic text-2xl text-[#4f4f4f]">May 2023</em>
          <em className="not-italic font-medium text-2xl text-[#333]">
            {formatToNaira(5000)}
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-2xl text-[#4f4f4f]">June 2023</em>
          <em className="not-italic font-medium text-2xl text-[#333]">
            {formatToNaira(10000)}
          </em>
        </div>
        <div className="flex justify-between items-center">
          <em className="not-italic text-2xl text-[#4f4f4f]">July 2023</em>
          <em className="not-italic font-medium text-2xl text-[#333]">
            {formatToNaira(6000)}
          </em>
        </div>
      </div>
    </div>
  );
};
