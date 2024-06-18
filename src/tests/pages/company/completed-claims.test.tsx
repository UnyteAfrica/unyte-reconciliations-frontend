import { CompletedClaims } from "@/components/company/completed-claims";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Completed Claims", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <CompletedClaims />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
