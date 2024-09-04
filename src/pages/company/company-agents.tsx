import { PageContent } from "@/components/shared/page-content";
import { AgentsTable } from "@/components/tables/agents-table";
import { Overlay } from "@/components/overlay";
import { NewAgentOverlay } from "@/components/overlays/new-agent-overlay";
import { useContext, useState } from "react";
import { OverlayContext, OverlayContextType } from "@/context/overlay.context";
import { useQuery } from "@tanstack/react-query";
import { CompanyQueryKeys } from "@/utils/query-keys";
import { getAllAgents } from "@/services/api/api-company";
import { ApiCompanyAgent } from "@/types/types";
import { PAGE_COUNT } from "@/utils/constants";

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

  if (isLoadingAgents)
    return (
      <PageContent
        title="Policies"
        pageTable={<AgentsTable agents={[]} />}
        isLoading={true}
      />
    );

  const agents = agentsData!.data;
  const totalPages = agents.length;
  const paginatedMap: { [key: number]: ApiCompanyAgent[] } = {};
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
            agents={agents.map((agent) => ({
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
