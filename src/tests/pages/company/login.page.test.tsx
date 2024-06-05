import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CompanyLoginPage } from "@/pages/company/login.page";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Company Login Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <CompanyLoginPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate company ID", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanyLoginPage />
      </BrowserRouter>
    );

    const companyIdInput = screen.getByLabelText("Company ID");
    await user.click(companyIdInput);
    await user.keyboard("A012");
    const submitButton = screen.getByText("Sign In");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Company ID cannot be less than 5 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanyLoginPage />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    await user.click(passwordInput);
    await user.keyboard("pass");
    const submitButton = screen.getByText("Sign In");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Password cannot be less than 6 characters"
    );
    expect(errorMessage).toBeVisible();
  });
});
