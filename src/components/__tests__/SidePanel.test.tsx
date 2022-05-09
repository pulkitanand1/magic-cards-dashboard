import { render, screen, cleanup, act } from "@testing-library/react";
import { DashboardFilters } from "../../dataTypes/DashboardFilters";
import SidePanel from "../sidePanel/SidePanel";

afterEach(() => {
  cleanup();
});

describe("Side panel", () => {
  it("should render sidepanels correctly", () => {
    const mockSetCurrentPage = jest.fn();
    const mockSetFilters = jest.fn();
    const filters: DashboardFilters = {
      language: "English",
      pageSize: 50,
      colors: [],
      rarity: "All",
      superType: "All",
      searchText: "",
    };
    const props = {
      setCurrentPage: mockSetCurrentPage,
      filters: filters,
      handleSetFilters: mockSetFilters,
    };
    act(() => {
      render(<SidePanel {...props} />);
    });

    const sidePanel = screen.getByTestId("side-panel");

    expect(sidePanel).toBeInTheDocument();
    expect(sidePanel).toHaveTextContent("Colors");
    expect(sidePanel).toHaveTextContent("SuperType");
    expect(sidePanel).toHaveTextContent("Rarity");
    expect(sidePanel).toHaveTextContent("Page Size");
    expect(sidePanel).toHaveTextContent("Apply");
    expect(sidePanel).toHaveTextContent("Reset");
  });

  it("Apply button is working correctly", () => {
    const mockSetFilters = jest.fn();
    const filters: DashboardFilters = {
      language: "English",
      pageSize: 50,
      colors: [],
      rarity: "All",
      superType: "All",
      searchText: "",
    };
    const props = {
      filters: filters,
      handleSetFilters: mockSetFilters,
    };
    act(() => {
      render(<SidePanel {...props} />);
    });
    const sidePanel = screen.getByTestId("side-panel");
    const applyButton = screen.getByTestId("apply-button");
    expect(applyButton).toBeInTheDocument();

    // Checking the color value
    const colorCB = sidePanel.querySelector("input");
    act(() => {
      colorCB?.click();
      applyButton.click();
    });

    expect(mockSetFilters).toBeCalled();
  });

  it("Reset button is working correctly", () => {
    const mockSetFilters = jest.fn();
    const filters: DashboardFilters = {
      language: "English",
      pageSize: 10,
      colors: ["White"],
      rarity: "Rare",
      superType: "Basic",
      searchText: "",
    };
    let newFiters: DashboardFilters = filters;
    mockSetFilters.mockImplementation((filters: DashboardFilters) => {
      newFiters = filters;
    });

    const props = {
      filters: filters,
      handleSetFilters: mockSetFilters,
    };
    act(() => {
      render(<SidePanel {...props} />);
    });
    const resetButton = screen.getByTestId("reset-button");
    expect(resetButton).toBeInTheDocument();

    expect(newFiters.colors).toBe(filters.colors);
    expect(newFiters.pageSize).toBe(filters.pageSize);
    expect(newFiters.rarity).toBe(filters.rarity);
    expect(newFiters.superType).toBe(filters.superType);

    act(() => {
      resetButton.click();
    });

    // Resetting filters to default values supplied to mockSetFilters.
    expect(mockSetFilters).toBeCalled();
    expect(newFiters.colors).toStrictEqual([]);
    expect(newFiters.pageSize).toBe(50);
    expect(newFiters.rarity).toBe("All");
    expect(newFiters.superType).toBe("All");
  });
});
