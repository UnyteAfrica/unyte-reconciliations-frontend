import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "@/pages/auth/login.page";

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

describe("Company Login Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate company ID", async () => {
    const { user } = setup(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const companyIdInput = screen.getByLabelText("Email");
    await user.click(companyIdInput);
    await user.keyboard("john@");
    const submitButton = screen.getByText("Sign In");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Email is invalid");
    expect(errorMessage).toBeVisible();
  });

  it("should validate password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <LoginPage />
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
