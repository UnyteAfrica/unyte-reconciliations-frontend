import { AgentPolicies } from "@/pages/agent/agent-policies";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Agent Policies", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <AgentPolicies />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
