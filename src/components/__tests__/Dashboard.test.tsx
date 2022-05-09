import { render, screen, cleanup, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { intialFilterState } from "../../utils/DropdownData";
import Dashboard from "../Dashboard";

afterEach(() => {
  cleanup();
});

describe("dashboard", () => {
  it("should be rendered correctly", () => {
    const mockHandleSetFilters = jest.fn();
    const mockSetCurrentPage = jest.fn();
    const mockHandleMagicCardClick = jest.fn();
    const props = {
      filters: intialFilterState,
      handleSetFilters: mockHandleSetFilters,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      handleMagicCardClick: mockHandleMagicCardClick,
    };
    act(() => {
      render(
        <Provider store={store}>
          <Dashboard {...props} />
        </Provider>
      );
    });

    const dashboard = screen.getByTestId("dashboard");

    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveTextContent(
      "No Records found. Please check Search box and Filter values."
    );
  });
});
