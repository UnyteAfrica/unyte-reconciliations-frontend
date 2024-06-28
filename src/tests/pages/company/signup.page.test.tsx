import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CompanySignupPage } from "@/pages/company/signup.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function setup(reactNode: React.ReactNode) {
  const queryClient = new QueryClient();
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        {reactNode}
      </QueryClientProvider>
    ),
  };
}

describe("Company Signup Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate business name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("Company Name");
    await user.click(nameInput);
    await user.keyboard("no");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Business name must be 3 or more characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate company reg. no.", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Company Registration No.");
    await user.click(targetInput);
    await user.keyboard("noti");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Business Reg No must be 5 or more characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate admin name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Admin Name");
    await user.click(targetInput);
    await user.keyboard("bi");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Admin name must be 3 or more characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate admin email", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Admin Email");
    await user.click(targetInput);
    await user.keyboard("john@");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText("The email you entered is invalid");
    expect(errorMessage).toBeVisible();
  });

  it("should validate gamp id", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanySignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("GAMP ID (optional)");
    await user.click(targetInput);
    await user.keyboard("gamp");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "GAMP ID cannot be less than 5 characters"
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
