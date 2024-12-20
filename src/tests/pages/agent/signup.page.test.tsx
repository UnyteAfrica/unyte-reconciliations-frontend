import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AgentSignupPage } from "@/pages/agent/signup.page";
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

describe("Agent Signup Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate first name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("First Name");
    await user.click(nameInput);
    await user.keyboard("de");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "First name cannot be less than 3 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate middle name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("Middle Name");
    await user.click(nameInput);
    await user.keyboard("de");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Middle name cannot be less than 3 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate last name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("Last Name");
    await user.click(nameInput);
    await user.keyboard("de");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Last name cannot be less than 3 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate address", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText("Home Address");
    await user.click(nameInput);
    await user.keyboard("2 street");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Home Address cannot be less than 10 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate email", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Email");
    await user.click(targetInput);
    await user.keyboard("john@");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText("Invalid email entered");
    expect(errorMessage).toBeVisible();
  });

  it("should validate BVN", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("BVN");
    await user.click(targetInput);
    await user.keyboard("12345678");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText("BVN must be 11 characters");
    expect(errorMessage).toBeVisible();
  });
  it("should validate bank name", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Bank Name");
    await user.click(targetInput);
    await user.keyboard("ba");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Bank name cannot be less than 3 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate account number", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Account No");
    await user.click(targetInput);
    await user.keyboard("12345");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Account number must be 10 characters"
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
