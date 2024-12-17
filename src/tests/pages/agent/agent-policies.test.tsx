import { AgentPolicies } from "@/pages/agent/agent-policies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function setup(reactNode: React.ReactNode) {
  const queryClient = new QueryClient();
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        {reactNode}
      </QueryClientProvider>
    ),
  };
}

describe("Agent Policies", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <AgentPolicies />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
