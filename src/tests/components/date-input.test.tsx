import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { DateInput } from "@/components/shared/input";

function setup(reactNode: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(reactNode),
  };
}

const date = new Date(
  "Mon Jun 10 2024 09:07:08 GMT+0100 (West Africa Standard Time)"
);

describe("Period Selector", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <DateInput
          containerClassName="rounded-tl-none rounded-bl-none font-semibold"
          date={date}
          onDateChange={(_) => {}}
        />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it("should call new date with onDateChange", async () => {
    const onDateChange = vi.fn();
    setup(
      <BrowserRouter>
        <DateInput
          containerClassName="rounded-tl-none rounded-bl-none font-semibold"
          date={date}
          onDateChange={(date) => onDateChange(date)}
        />
      </BrowserRouter>
    );

    const dateSelector = screen.getByText("June 10, 2024");
    expect(dateSelector).toBeVisible();

    const dateInput = screen.getByPlaceholderText("date");
    await fireEvent.change(dateInput, { target: { value: "2020-05-24" } });

    expect(onDateChange).toHaveBeenCalledWith(new Date("2020-05-24"));
  });
});
