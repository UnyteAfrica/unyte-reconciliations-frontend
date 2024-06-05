import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AgentSignupPage } from "@/pages/agent/signup.page";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Agent Signup Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate username", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("Username");
    await user.click(usernameInput);
    await user.keyboard("de");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Username cannot be less than 3 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate GAMP ID", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const gampIdInput = screen.getByLabelText("GAMP ID");
    await user.click(gampIdInput);
    await user.keyboard("A099");
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
        <AgentSignupPage />
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
        <AgentSignupPage />
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
