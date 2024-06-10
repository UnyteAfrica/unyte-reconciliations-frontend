import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { PeriodSelector } from "@/components/shared/period-selector";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Period Selector", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <PeriodSelector />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should open dropdown", async () => {
    const { user } = setup(
      <BrowserRouter>
        <PeriodSelector />
      </BrowserRouter>
    );

    const periodSelector = screen.getByTitle("periodBtn");
    await user.click(periodSelector);
    const dailyElems = await screen.findAllByText("Daily");
    const dailyBtn = dailyElems[1];
    const weeklyBtn = screen.getByText("Weekly");
    const monthlyBtn = screen.getByText("Monthly");
    const yearlyBtn = screen.getByText("Yearly");

    expect(dailyBtn).toBeVisible();
    expect(weeklyBtn).toBeVisible();
    expect(monthlyBtn).toBeVisible();
    expect(yearlyBtn).toBeVisible();
  });

  it("selecting a new period should change the period", async () => {
    const { user } = setup(
      <BrowserRouter>
        <PeriodSelector />
      </BrowserRouter>
    );

    const periodSelector = screen.getByTitle("periodBtn");
    await user.click(periodSelector);
    const weeklyBtn = screen.getByText("Weekly");
    await user.click(weeklyBtn);
    expect(periodSelector.textContent).toEqual("Weekly");
  });
});
