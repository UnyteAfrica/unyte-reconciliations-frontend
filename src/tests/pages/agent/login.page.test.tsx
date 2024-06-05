import { render, screen } from "@testing-library/react";
import { AgentLoginPage } from "@/pages/agent/login.page";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Agent Login Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <AgentLoginPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate email", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentLoginPage />
      </BrowserRouter>
    );

    const gampIdInput = screen.getByLabelText("GAMP ID");
    await user.click(gampIdInput);
    await user.keyboard("A012");
    const submitButton = screen.getByText("Sign In");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "GAMP ID cannot be less than 5 characters"
    );
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
