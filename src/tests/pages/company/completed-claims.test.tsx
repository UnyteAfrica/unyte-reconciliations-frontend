import { InsurerCompletedClaims } from "@/components/company/completed-claims";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Insurer Completed Claims", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <InsurerCompletedClaims />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
