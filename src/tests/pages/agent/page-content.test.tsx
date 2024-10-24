import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { PageContent } from "@/components/shared/page-content";
import { CommissionsTable } from "@/components/tables/commissions-table";
import { Commission } from "@/types/types";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

const commissions: Commission[] = [
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Travel",
    date: "May 7, 2023",
    premium: 15000,
    commission: 4000,
  },
  {
    policyRef: "#WP62F3E8F93",
    policyNo: "123jkf5402",
    product: "Device",
    date: "May 7, 2023",
    premium: 20000,
    commission: 1500,
  },
];

describe("Page Content", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <PageContent
          title="Commissions"
          pageTable={<CommissionsTable commissions={commissions} />}
        />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should show filter menu when filter is clicked", async () => {
    const { user } = setup(
      <BrowserRouter>
        <PageContent
          title="Commissions"
          pageTable={<CommissionsTable commissions={commissions} />}
        />
      </BrowserRouter>
    );

    const filterBtn = screen.getByText("Filter");
    await user.click(filterBtn);
    const filterBox = screen.getByTestId("filter");

    expect(filterBox).toHaveClass("max-h-[500px]");
    expect(filterBox).not.toHaveClass("max-h-0");
  });

  it("should close filter menu when it the user clicks outside it", async () => {
    const { user } = setup(
      <BrowserRouter>
        <PageContent
          title="Commissions"
          pageTable={<CommissionsTable commissions={commissions} />}
        />
      </BrowserRouter>
    );

    const filterBtn = screen.getByText("Filter");
    await user.click(filterBtn);

    const commissionsText = screen.getByText("Commissions");
    await user.click(commissionsText);
    const filterBox = screen.getByTestId("filter");

    expect(filterBox).toHaveClass("max-h-0");
    expect(filterBox).not.toHaveClass("max-h-[500px]");
  });
});
