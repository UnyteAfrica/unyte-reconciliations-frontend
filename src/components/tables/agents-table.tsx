import { formatToNaira } from "@/utils/utils";
import { Agent } from "../../types/types";
import { Table } from "../table";

type AgentsTableProps = {
  agents: Agent[];
};

export const AgentsTable: React.FC<AgentsTableProps> = ({ agents }) => {
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
