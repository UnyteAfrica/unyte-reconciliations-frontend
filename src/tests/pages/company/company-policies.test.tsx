import { CompanyPolicies } from "@/pages/company/company-policies";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Company Policies", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <CompanyPolicies />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
