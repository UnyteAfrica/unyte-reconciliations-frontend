import { InsurerPendingClaims } from "@/components/company/pending-claims";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Pending Claims", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <InsurerPendingClaims />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
