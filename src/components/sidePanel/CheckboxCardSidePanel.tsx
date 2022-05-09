import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export interface CheckboxCardSidePanelProps {
  filterLabel: string;
  handleCheckedValues: (items: string[]) => void;
  optionValues: string[];
  checkedItems: string[];
}

/**
 * This components renders a check box card on the basis of data provided
 * and updates the filters.
 * @param props required for rendering.
 * @returns
 */
export const CheckboxCardSidePanel = (props: CheckboxCardSidePanelProps) => {
  const themeContext = useContext(ThemeContext);
  const _checkedItems = [...props.checkedItems]; // To avoid modifying the state
  const { filterLabel, optionValues, handleCheckedValues } = props;

  /**
   * Handles the checkbox 'checked' event and modfies the selected value collection.
   */
  const handleCheckboxEvent = (isChecked: boolean, checkedValue: string) => {
    const idx = _checkedItems.indexOf(checkedValue);
    if (isChecked && idx === -1) {
      _checkedItems.push(checkedValue);
    } else if (isChecked == false && idx !== -1) {
      _checkedItems.splice(idx, 1);
    }
    handleCheckedValues(_checkedItems);
  };

  const cardTheme = {
    background: themeContext.theme.background,
    color: themeContext.theme.foreground,
    border: "2px solid " + themeContext.theme.foreground,
  };

  return (
    <div
      className="card mb-2 rounded-3"
      style={cardTheme}
      data-testid="checkbox-panel"
    >
      <div className="card-body">
        <h5 className="class-title">{filterLabel}</h5>
        <div className="row form-check card-text">
          {optionValues.map((ov) => {
            return (
              <label key={ov}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ov}
                  checked={_checkedItems.indexOf(ov) >= 0}
                  onChange={(e) => handleCheckboxEvent(e.target.checked, ov)}
                />
                {ov}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
