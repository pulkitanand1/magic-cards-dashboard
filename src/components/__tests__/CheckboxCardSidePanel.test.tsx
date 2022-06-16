import { render, screen, cleanup, act } from "@testing-library/react";
import { CheckboxCardSidePanel } from "../sidePanel/CheckboxCardSidePanel";

afterEach(() => {
  cleanup();
});

describe("Checkbox side panel", () => {
  it("should be rendered correctly", () => {
    const mockHandleCheckedValues = jest.fn();
    const props = {
      filterLabel: "TestLabel",
      handleCheckedValues: mockHandleCheckedValues,
      optionValues: ["value1", "value2"],
      checkedItems: ["value1"],
    };
    act(() => {
      render(<CheckboxCardSidePanel {...props} />);
    });

    const checkboxPanel = screen.getByTestId("checkbox-panel");
    expect(checkboxPanel).toHaveTextContent(props.filterLabel);
    expect(checkboxPanel).toHaveTextContent("value1");
    expect(checkboxPanel).toHaveTextContent("value2");

    const checkBoxLabels = checkboxPanel.querySelectorAll("label"); // Input is wrapped inside label
    expect(checkBoxLabels[0]).toHaveTextContent("value1");
    expect(checkBoxLabels[0].querySelector("input")).toBeChecked(); // Inner checkbox should be checked

    expect(checkBoxLabels[1]).toHaveTextContent("value2");
    expect(checkBoxLabels[1].querySelector("input")).not.toBeChecked(); // Not selected value shouldn't be checked.
  });

  it("Upon check, should add value to checkedItems list ", () => {
    let checkedValues: string[] = [];
    const mockHandleCheckedValues = jest.fn();
    mockHandleCheckedValues.mockImplementation((values: string[]) => {
      checkedValues = values;
    });
    const passedProps = {
      filterLabel: "TestLabel",
      handleCheckedValues: mockHandleCheckedValues,
      optionValues: ["value1", "value2"],
      checkedItems: [],
    };
    act(() => {
      render(<CheckboxCardSidePanel {...passedProps} />);
    });

    const checkboxPanel = screen.getByTestId("checkbox-panel");

    const checkBoxLabels = checkboxPanel.querySelectorAll("label"); // Input is wrapped inside label
    expect(checkBoxLabels[0]).toHaveTextContent("value1");
    const fistCheckBox = checkBoxLabels[0].querySelector("input");
    expect(fistCheckBox).not.toBeChecked(); // Unchecked when started.

    (fistCheckBox as HTMLInputElement).click();
    expect(mockHandleCheckedValues).toBeCalled();
    expect(checkedValues).toContain("value1"); // Check operation works!
  });

  it("Upon uncheck, should remove value from checkedItems list ", () => {
    let checkedValues: string[] = [];
    const mockHandleCheckedValues = jest.fn();
    mockHandleCheckedValues.mockImplementation((values: string[]) => {
      checkedValues = values;
    });
    const passedProps = {
      filterLabel: "TestLabel",
      handleCheckedValues: mockHandleCheckedValues,
      optionValues: ["value1", "value2"],
      checkedItems: ["value1"],
    };
    act(() => {
      render(<CheckboxCardSidePanel {...passedProps} />);
    });

    const checkboxPanel = screen.getByTestId("checkbox-panel");

    const checkBoxLabels = checkboxPanel.querySelectorAll("label"); // Input is wrapped inside label
    expect(checkBoxLabels[0]).toHaveTextContent("value1");
    const fistCheckBox = checkBoxLabels[0].querySelector("input");
    expect(fistCheckBox).toBeChecked(); // checked when started.

    (fistCheckBox as HTMLInputElement).click();
    expect(mockHandleCheckedValues).toBeCalled();
    expect(checkedValues).not.toContain("value1"); // uncheck operation works!
  });
});
