import { render, screen } from "@testing-library/react";
import { AgentLoginPage } from "@/pages/agent/login.page";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
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

describe("Agent Login Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <AgentLoginPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate email or gamp id", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentLoginPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Email / GAMP ID");
    await user.click(targetInput);
    await user.keyboard("jgh@");
    const submitButton = screen.getByText("Sign In");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Email / GAMP ID Invalid");
    expect(errorMessage).toBeVisible();
  });

  it("should validate password", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentLoginPage />
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
