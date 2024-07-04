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

  it("should validate affiliated company", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const targetInput = screen.getByLabelText("Affiliated Company");
    await user.click(targetInput);
    await user.keyboard("john");
    const submitButton = screen.getByText("Sign Up");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "Company name must be more than 5 characters"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should validate GAMP ID", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentSignupPage />
      </BrowserRouter>
    );

    const gampIdInput = screen.getByLabelText("GAMP ID (optional)");
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
