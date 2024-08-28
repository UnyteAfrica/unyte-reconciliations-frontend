import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Commissions } from "@/pages/agent/commissions";

describe("Agent Commissions Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <Commissions />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
