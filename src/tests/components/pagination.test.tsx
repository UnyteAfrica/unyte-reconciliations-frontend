import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Selector } from "@/components/shared/selector";
import { Pagination } from "@/components/shared/pagination";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Pagination", () => {
  it("renders with page 4 as the active page", () => {
    render(
      <BrowserRouter>
        <Pagination
          currentPage={4}
          itemsCount={56}
          pageSize={10}
          onPageChange={(_) => {}}
        />
      </BrowserRouter>
    );
    const activeBtn = screen.getByText("4/6");
    expect(activeBtn).toBeVisible();
  });

  it("previous button is disabled when on first page", async () => {
    const onPageChange = vi.fn();
    const { user } = setup(
      <BrowserRouter>
        <Pagination
          currentPage={1}
          itemsCount={56}
          pageSize={10}
          onPageChange={(newPage) => onPageChange(newPage)}
        />
      </BrowserRouter>
    );

    const previousBtn = screen.getByText("Previous");
    await user.click(previousBtn);

    expect(onPageChange).toBeCalledTimes(0);
  });

  it("next button is disabled when on last page", async () => {
    const onPageChange = vi.fn();
    const { user } = setup(
      <BrowserRouter>
        <Pagination
          currentPage={6}
          itemsCount={56}
          pageSize={10}
          onPageChange={(newPage) => onPageChange(newPage)}
        />
      </BrowserRouter>
    );

    const nextBtn = screen.getByText("Next");
    await user.click(nextBtn);

    expect(onPageChange).toBeCalledTimes(0);
  });

  it("selecting a new period should change the period", async () => {
    const onValueChange = vi.fn();
    const { user } = setup(
      <BrowserRouter>
        <Selector
          options={["Hello", "World", "Foo"]}
          containerClassName="w-full"
          value={"Hello"}
          onChange={(val) => onValueChange(val)}
        />
      </BrowserRouter>
    );

    const valueSelector = screen.getByTitle("selectBtn");
    await user.click(valueSelector);
    const worldBtn = screen.getByText("World");
    await user.click(worldBtn);
    expect(onValueChange).toBeCalledWith("World");
  });
});
