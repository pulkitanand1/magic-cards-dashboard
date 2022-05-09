import { render, screen, cleanup } from "@testing-library/react";
import SearchForm from "../SearchForm";

afterEach(() => {
  cleanup();
});

describe("Search form", () => {
  it("should be rendered correctly", () => {
    const mockHandleSearchButtonClick = jest.fn();
    const props = {
      handleSearchButtonClick: mockHandleSearchButtonClick,
      isVisible: true,
    };
    render(<SearchForm {...props} />);
    const searchForm = screen.getByTestId("search-form");
    expect(searchForm).toBeInTheDocument();
  });

  it("should not be rendered when set to invisible", () => {
    const mockHandleSearchButtonClick = jest.fn();
    const props = {
      handleSearchButtonClick: mockHandleSearchButtonClick,
      isVisible: false,
    };
    render(<SearchForm {...props} />);
    const searchForm = screen.queryByTestId("search-form");
    expect(searchForm).toBeNull();
  });

  it("should call the search function on search-button click", () => {
    const mockHandleSearchButtonClick = jest.fn();
    const props = {
      handleSearchButtonClick: mockHandleSearchButtonClick,
      isVisible: true,
    };
    render(<SearchForm {...props} />);
    const searchButton = screen.getByTestId("search-button");
    searchButton.click();
    expect(mockHandleSearchButtonClick).toBeCalled();
  });
});
