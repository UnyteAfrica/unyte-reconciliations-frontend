import { PageContent } from "@/components/shared/page-content";
import { AgentsTable } from "@/components/tables/agents-table";
import { Overlay } from "@/components/overlay";
import { NewAgentOverlay } from "@/components/overlays/new-agent-overlay";
import { useContext, useState } from "react";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getAllAgents } from "@/services/api/api-company";
import { Agent, AgentStatus } from "@/types/types";
import { PAGE_COUNT } from "@/utils/constants";

let faker = true;

const agents: Agent[] = [
  {
    agentStatus: AgentStatus.Active,
    commissions: 5000,
    dateAdded: "May 7, 2023",
    email: "fortunateanozie@gmail.com",
    id: Date.now().toString(),
    name: "Fortunate Anozie",
    policiesSold: 26,
  },
  {
    agentStatus: AgentStatus.Inactive,
    commissions: 6500,
    dateAdded: "May 10, 2023",
    email: "sanusi@gmail.com",
    id: Date.now().toString(),
    name: "Sanusi Lamido",
    policiesSold: 18,
  },
  {
    agentStatus: AgentStatus.Inactive,
    commissions: 25000,
    dateAdded: "July 12, 2022",
    email: "omarr@gmail.com",
    id: Date.now().toString(),
    name: "Omarr Titan",
    policiesSold: 10,
  },
  {
    agentStatus: AgentStatus.Active,
    commissions: 250000,
    dateAdded: "April 27, 2024",
    email: "dro@gmail.com",
    id: Date.now().toString(),
    name: "Dro Tempah",
    policiesSold: 53,
  },
  {
    agentStatus: AgentStatus.Active,
    commissions: 16500,
    dateAdded: "May 7, 2023",
    email: "remy201@hotmail.com",
    id: Date.now().toString(),
    name: "Divine Ikubor",
    policiesSold: 12,
  },
  {
    agentStatus: AgentStatus.Inactive,
    commissions: 55000,
    dateAdded: "December 7, 2023",
    email: "fenty@gmail.com",
    id: Date.now().toString(),
    name: "Calvin Harris",
    policiesSold: 25,
  },
  {
    agentStatus: AgentStatus.Inactive,
    commissions: 50000,
    dateAdded: "May 1, 2022",
    email: "toluday0@gmail.com",
    id: Date.now().toString(),
    name: "Tolulope Olamide",
    policiesSold: 10,
  },
];

export const CompanyAgents = () => {
  const { isNewAgentOverlayOpened } = useContext(
    OverlayContext
  ) as OverlayContextType;

  const {
    isPending: isLoadingAgents,
    data: agentsData,
    error: agentsError,
  } = useQuery({
    queryKey: [CompanyQueryKeys.agents],
    queryFn: () => getAllAgents(),
  });

  const [page, setPage] = useState(1);

  if (faker)
    return (
      <>
        {isNewAgentOverlayOpened && (
          <Overlay>
            <NewAgentOverlay />
          </Overlay>
        )}
        <PageContent
          title="Agents"
          searchbarPlaceholder="Find Agent ID"
          pageTable={<AgentsTable agents={agents} />}
          hasNewAgent
          downloadClassName="border border-[#E0E0E0] bg-white text-[#4F4F4F] font-semibold"
        />
      </>
    );

  if (isLoadingAgents)
    return (
      <PageContent
        title="Policies"
        pageTable={<AgentsTable agents={[]} />}
        isLoading={true}
      />
    );

  const actualAgents = agentsData!.data || agents;
  const totalPages = agents.length;
  const paginatedMap: { [key: number]: Agent[] } = {};
  for (let i = 0; i < totalPages; i++) {
    paginatedMap[i + 1] = agents.slice(
      i * PAGE_COUNT,
      i * PAGE_COUNT + (PAGE_COUNT - 1)
    );
  }

  return (
    <>
      {isNewAgentOverlayOpened && (
        <Overlay>
          <NewAgentOverlay />
        </Overlay>
      )}

      <PageContent
        title="Agents"
        searchbarPlaceholder="Find Agent ID"
        pageTable={
          <AgentsTable
            agents={actualAgents.map((agent) => ({
              dateAdded: "May 7, 2023",
              agentStatus: AgentStatus.Active,
              commissions: 2000,
              id: agent.id.toString(),
              email: agent.email,
              name: `${agent.first_name} ${agent.last_name}`,
              policiesSold: 50000,
            }))}
          />
        }
        error={agentsError}
        isLoading={isLoadingAgents}
        page={page}
        pageCount={PAGE_COUNT}
        totalItems={totalPages}
        onPageChange={(page: number) => setPage(page)}
        hasNewAgent
      />
    </>
  );
};
