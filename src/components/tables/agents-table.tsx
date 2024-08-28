import { formatToNaira } from "@/utils/utils";
import { Agent } from "../../types/types";
import { Table } from "../table";
import { useMediaQuery } from "@/utils/hooks";

type AgentsTableProps = {
  agents: Agent[];
};

export const AgentsTable: React.FC<AgentsTableProps> = ({ agents }) => {
  const { isMediaQueryMatched } = useMediaQuery(1024);

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
              <em className="not-italic text-[#828282]">{agent.id}</em>
              <em className="not-italic text-[#828282]">
                Policies Sold: {agent.policiesSold}
              </em>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Table
      headers={[
        "Agent ID",
        "Agent Name",
        "Commissions Earned",
        "Policies Sold",
      ]}
    >
      {agents.map((agent, idx) => (
        <tr key={idx} className="border-b font-medium">
          <td className="p-4 text-center">{agent.id}</td>
          <td className="p-4 text-center">{agent.name}</td>
          <td className="p-4 text-center">
            {formatToNaira(agent.commissions)}
          </td>
          <td className="p-4 text-center">{agent.policiesSold}</td>
        </tr>
      ))}
    </Table>
  );
};
