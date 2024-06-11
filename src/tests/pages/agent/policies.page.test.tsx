import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import Policies from "@/pages/policies";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Agent Policies Page", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <Policies />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should show filter menu when filter is clicked", async () => {
    const { user } = setup(
      <BrowserRouter>
        <Policies />
      </BrowserRouter>
    );

    const filterBtn = screen.getByText("Filter");
    await user.click(filterBtn);
    const cancelBtn = screen.getByText("Cancel");
    const applyBtn = screen.getByText("Apply Filter");

    expect(cancelBtn).toBeVisible();
    expect(applyBtn).toBeVisible();
  });
});
