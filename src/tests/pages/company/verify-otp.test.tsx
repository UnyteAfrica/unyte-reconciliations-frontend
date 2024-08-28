import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CompanyVerifyOTPPage } from "@/pages/company/verify-otp.page";
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

describe("Company Verify OTP Page", () => {
  it("renders correctly", () => {
    const tree = setup(
      <BrowserRouter>
        <CompanyVerifyOTPPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should validate OTP", async () => {
    const { user } = setup(
      <BrowserRouter>
        <CompanyVerifyOTPPage />
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
