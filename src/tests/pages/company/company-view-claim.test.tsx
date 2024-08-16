import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ViewClaimsPage } from "@/pages/company/view-claims";
import { OverlayContextProvider } from "@/context/overlay.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function setup(reactNode: React.ReactNode) {
  const queryClient = new QueryClient();
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <OverlayContextProvider>{reactNode}</OverlayContextProvider>
      </QueryClientProvider>
    ),
  };
}

describe("View Claims", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <ViewClaimsPage />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should show update claim overlay when update claim status button is clicked", async () => {
    const { user } = setup(
      <BrowserRouter>
        <ViewClaimsPage />
      </BrowserRouter>
    );

    const updateBtn = screen.getByText("Update Claim Status");
    await user.click(updateBtn);
    const processingTxt = screen.getByText("Processing");
    const completedTxt = screen.getByText("Completed");
    expect(processingTxt).toBeVisible();
    expect(completedTxt).toBeVisible();
  });

  it("should close update claim overlay when click is made outside of the box", async () => {
    const { user } = setup(
      <BrowserRouter>
        <ViewClaimsPage />
      </BrowserRouter>
    );

    const updateBtn = screen.getByText("Update Claim Status");
    await user.click(updateBtn);
    const processingTxt = screen.getByText("Processing");
    const completedTxt = screen.getByText("Completed");
    expect(processingTxt).toBeVisible();
    expect(completedTxt).toBeVisible();

    const overlay = screen.getByTestId("overlay");
    await user.click(overlay);
    const hiddenProcessing = screen.queryByText("Processing");
    const hiddenCompleted = screen.queryByText("Completed");
    expect(hiddenProcessing).toBeNull();
    expect(hiddenCompleted).toBeNull();
  });
});
