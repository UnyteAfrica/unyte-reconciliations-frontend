import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AgentVerifyOTPPage } from "@/pages/agent/verify-otp.page";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Agent Verify OTP Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <AgentVerifyOTPPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate OTP", async () => {
    const { user } = setup(
      <BrowserRouter>
        <AgentVerifyOTPPage />
      </BrowserRouter>
    );

    const otpInput = screen.getByLabelText("OTP");
    await user.click(otpInput);
    await user.keyboard("2244");
    const submitButton = screen.getByText("Verify");
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      "OTP cannot be less than 6 characters"
    );
    expect(errorMessage).toBeVisible();
  });
});
