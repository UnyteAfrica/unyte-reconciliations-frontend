import { formatToNaira } from "@/utils/utils";
import { Agent, AgentStatus } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";
import { cx } from "class-variance-authority";
import { createPortal } from "react-dom";
import { SideModal } from "../shared/side-modal";
import { useState } from "react";
import { AgentCard } from "../agent/agent-card";

type AgentsTableProps = {
  agents: Agent[];
};

export const AgentsTable: React.FC<AgentsTableProps> = ({ agents }) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent>();

  if (!isMediaQueryMatched)
    return (
      <div>
        {agents.map((agent, idx) => (
          <div key={idx} className="border-b py-2">
            <div className="flex justify-between items-center mb-2">
              <em className="not-italic font-semibold text-[#333]">
                {agent.name}
              </em>
              <em className="not-italic font-semibold text-[#333]">
                {formatToNaira(agent.commissions)}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">{agent.email}</em>
              <em className="not-italic text-[#828282]">
                Policies Sold: {agent.policiesSold}
              </em>
            </div>
            <div className="flex justify-between items-center">
              <em className="not-italic text-[#828282]">
                Status: {agent.agentStatus}
              </em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table
      headers={[
        "Agent Name",
        "Agent Email",
        "Date Added",
        "Status",
        "Policies Sold",
        "Commissions Earned",
      ]}
    >
      {createPortal(
        <SideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {!!activeAgent && (
            <AgentCard
              agent={activeAgent}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </SideModal>,
        document.body
      )}
      {agents.map((agent, idx) => (
        <tr
          key={idx}
          className="border-b font-medium transition hover:bg-[#F8F8F8] cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
            setActiveAgent(agent);
          }}
        >
          <td className="p-4 text-center">{agent.name}</td>
          <td className="p-4 text-center">{agent.email}</td>
          <td className="p-4 text-center">{agent.dateAdded}</td>
          <td className="p-4 text-center">
            <div
              className={cx(
                "py-2 px-4 text-center rounded-lg inline-block w-[120px]",
                agent.agentStatus == AgentStatus.Active &&
                  "bg-green/[.1] text-green",
                agent.agentStatus == AgentStatus.Inactive &&
                  "bg-[#D32525]/[.1] text-[#D32525]"
              )}
            >
              {agent.agentStatus}
            </div>
          </td>

          <td className="p-4 text-center">{agent.policiesSold}</td>
          <td className="p-4 text-center">
            {formatToNaira(agent.commissions)}
          </td>
        </tr>
      ))}
    </Table>
  );
};
