import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CompanySignupPage } from "@/pages/company/signup.page";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Company Signup Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate email", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    await user.click(emailInput);
    await user.keyboard("notanemail");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText("The email you entered is invalid");
    expect(errorMessage).toBeVisible();
  });

  it("should validate Company ID", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const companyIdInput = screen.getByLabelText("Company ID");
    await user.click(companyIdInput);
    await user.keyboard("A099");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Company ID cannot be less than 5 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    await user.click(passwordInput);
    await user.keyboard("pass");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Password cannot be less than 6 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate confirm password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    await user.click(passwordInput);
    await user.keyboard("password");
    await user.click(confirmPasswordInput);
    await user.keyboard("pass");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Passwords don't match");
    expect(errorMessage).toBeVisible();
  });
});
