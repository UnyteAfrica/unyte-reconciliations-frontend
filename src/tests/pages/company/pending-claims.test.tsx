import { PendingClaims } from "@/components/company/pending-claims";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Pending Claims", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <PendingClaims />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
