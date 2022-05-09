import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SiteNavBar from "../SiteNavBar";

describe("Site navigation bar", () => {
  it("should be rendered correctly", () => {
    const mockHandleSearchButtonClick = jest.fn();

    const { getByText } = render(
      <>
        <BrowserRouter>
          <SiteNavBar handleSearchButtonClick={mockHandleSearchButtonClick} />
        </BrowserRouter>
      </>
    );

    expect(getByText("Magic Cards Dashboard"));
  });
});
