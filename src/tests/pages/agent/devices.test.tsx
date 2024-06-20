import { Devices } from "@/pages/agent/devices";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Devices", () => {
  it("renders correctly", () => {
    const tree = render(
      <BrowserRouter>
        <Devices />
      </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
