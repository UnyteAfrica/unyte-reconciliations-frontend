import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AgentForgotPasswordPage } from "@/pages/agent/forgot-password";
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

describe("Agent Forgot Password Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <AgentForgotPasswordPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate email", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentForgotPasswordPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    await user.click(emailInput);
    await user.keyboard("johndoe");
    const submitButton = screen.getByText("Reset Password");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Invalid email entered");
    expect(errorMessage).toBeVisible();
  });
});
