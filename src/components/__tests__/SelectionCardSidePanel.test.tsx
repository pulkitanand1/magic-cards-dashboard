import { render, screen, cleanup, act } from "@testing-library/react";
import { SelectionCardSidePanel } from "../sidePanel/SelectionCardSidePanel";

afterEach(() => {
  cleanup();
});

describe("Selection side panel", () => {
  it("should render side panel correctly", () => {
    const mockHandleSelection = jest.fn();

    const props = {
      filterLabel: "TestLabel",
      handleSelection: mockHandleSelection,
      optionValues: ["All", "value1", "value2"],
      selectedItem: "All",
    };
    act(() => {
      render(<SelectionCardSidePanel {...props} />);
    });

    const selectionSidePanel = screen.getByTestId("selection-sidepanel");

    expect(selectionSidePanel).toBeInTheDocument();
    expect(selectionSidePanel).toHaveTextContent(props.filterLabel);
    expect(selectionSidePanel).toHaveTextContent(props.selectedItem); // Only selected item is to be displayed.
  });
});
