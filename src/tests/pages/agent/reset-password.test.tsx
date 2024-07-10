import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AgentResetPasswordPage } from "@/pages/agent/reset-password";
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

describe("Agent Reset Password Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <AgentResetPasswordPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentResetPasswordPage />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    await user.click(passwordInput);
    await user.keyboard("john");
    const submitButton = screen.getByText("Reset");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Password cannot be less than 6 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate that both passwords are the same", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentResetPasswordPage />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    await user.click(passwordInput);
    await user.keyboard("johndoe");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    await user.click(confirmPasswordInput);
    await user.keyboard("john");
    const submitButton = screen.getByText("Reset");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Passwords don't match");
    expect(errorMessage).toBeVisible();
  });
});
