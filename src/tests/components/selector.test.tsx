import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Selector } from "@/components/shared/selector";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

describe("Selector", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <Selector
          options={["Hello", "World", "Foo"]}
          containerClassName="w-full"
          value={"Hello"}
          onChange={(_) => {}}
        />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should open dropdown", async () => {
    const { user } = setup(
      <BrowserRouter>
        <Selector
          options={["Hello", "World", "Foo"]}
          containerClassName="w-full"
          value={"Hello"}
          onChange={(_) => {}}
        />
      </BrowserRouter>
    );

    const valueSelector = screen.getByTitle("selectBtn");
    await user.click(valueSelector);
    const dailyElems = await screen.findAllByText("Hello");
    const helloBtn = dailyElems[1];
    const worldBtn = screen.getByText("World");
    const fooBtn = screen.getByText("Foo");

    expect(helloBtn).toBeVisible();
    expect(worldBtn).toBeVisible();
    expect(fooBtn).toBeVisible();
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
